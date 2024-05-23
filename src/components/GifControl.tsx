import { Component, createRef } from 'preact';
import { parseGIF, decompressFrames, ParsedFrame, Frame } from 'gifuct-js';

interface GifControlProps {
    src: string;
    playAutomatically?: boolean;
    frameDelay?: number; // Delay in milliseconds
    transitionDelay?: number; // Delay before starting the transition in milliseconds
    transitionDuration?: number; // Duration of the transition in milliseconds
    idleOpacity?: number; // Opacity when idle
    activeOpacity?: number; // Opacity when active
    idleTimeout?: number; // Time in milliseconds before becoming idle
}

interface GifControlState {
    frames: ImageData[];
    currentFrameIndex: number;
    targetFrameIndex: number | null;
    opacity: number;
}

class GifControl extends Component<GifControlProps, GifControlState> {
    private canvasRef = createRef<HTMLCanvasElement>();
    private ctx: CanvasRenderingContext2D | null = null;
    private frameCount = 0;
    private animationFrameId: number | null = null;
    private timeoutId: number | null = null;
    private idleTimeoutId: number | null = null;

    static defaultProps = {
        playAutomatically: false,
        frameDelay: 100, // Default to 100 milliseconds per frame
        transitionDelay: 100, // Default to 1 second delay before transition
        transitionDuration: 500, // Default to 0.5 second transition duration
        idleOpacity: 0.2, // Opacity when idle
        activeOpacity: 1, // Opacity when active
        idleTimeout: 500, // Time in milliseconds before becoming idle
    };

    constructor(props: GifControlProps) {
        super(props);
        this.state = {
            frames: [],
            currentFrameIndex: 0,
            targetFrameIndex: null,
            opacity: this.props.idleOpacity!,
        };
    }

    componentDidMount() {
        this.ctx = this.canvasRef.current?.getContext('2d') || null;
        this.loadGif(this.props.src);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('resize', this.handleResize);
        this.setCanvasSize();

        if (this.props.playAutomatically) {
            this.startAnimation();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('resize', this.handleResize);
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
        }
        if (this.idleTimeoutId !== null) {
            clearTimeout(this.idleTimeoutId);
        }
    }

    setCanvasSize = () => {
        if (this.canvasRef.current) {
            this.canvasRef.current.width = window.innerWidth;
            this.canvasRef.current.height = window.innerHeight;
        }
    };

    handleResize = () => {
        this.setCanvasSize();
        this.drawFrame(this.state.currentFrameIndex);
    };

    loadGif = async (src: string) => {
        const response = await fetch(src);
        const buffer = await response.arrayBuffer();
        const gif = new Uint8Array(buffer);
        const gifFrames = this.parseGif(gif);
        this.setState({ frames: gifFrames }, () => {
            this.frameCount = gifFrames.length;
            this.drawFrame(0);
        });
    };

    parseGif = (gif: Uint8Array): ImageData[] => {
        const parsedGif = parseGIF(gif);
        const frames = decompressFrames(parsedGif, true).map((f: ParsedFrame<Frame>) => {
            const imageData = new ImageData(new Uint8ClampedArray(f.patch), f.dims.width, f.dims.height);
            return imageData;
        });
        return frames;
    };

    drawFrame = (index: number) => {
        if (this.state.frames.length > 0 && this.ctx) {
            const frame = this.state.frames[Math.floor(index) % this.frameCount];
            this.ctx.clearRect(0, 0, this.canvasRef.current!.width, this.canvasRef.current!.height);
            // Center the frame on the canvas
            const x = (this.canvasRef.current!.width - frame.width) / 2;
            const y = (this.canvasRef.current!.height - frame.height) / 2;
            this.ctx.putImageData(frame, x, y);
        }
    };

    handleMouseMove = (evt: MouseEvent) => {
        if (!this.props.playAutomatically) {
            const mouseX = evt.clientX;
            const mouseY = evt.clientY;
            const rect = this.canvasRef.current?.getBoundingClientRect();
            if (rect) {
                const relativeX = mouseX - rect.left;
                const relativeY = mouseY - rect.top;
                const frameIndexX = Math.floor((relativeX / window.innerWidth) * this.frameCount);
                const frameIndexY = Math.floor((relativeY / window.innerHeight) * this.frameCount);
                const targetFrameIndex = (frameIndexX + frameIndexY) % this.frameCount; // Combine both modifiers and use modulus to ensure it's within bounds

                if (this.state.targetFrameIndex !== targetFrameIndex) {
                    this.setState({ targetFrameIndex });
                    if (this.timeoutId) {
                        clearTimeout(this.timeoutId);
                    }
                    this.timeoutId = window.setTimeout(() => {
                        this.animateToFrame(targetFrameIndex);
                    }, this.props.transitionDelay);
                }

                // Reset opacity to active on mouse move
                if (this.state.opacity !== this.props.activeOpacity) {
                    this.setState({ opacity: this.props.activeOpacity! });
                }

                // Clear previous idle timeout
                if (this.idleTimeoutId) {
                    clearTimeout(this.idleTimeoutId);
                }
            }
        }
    };

    setIdle = () => {
        this.setState({ opacity: this.props.idleOpacity! });
    };

    animateToFrame = (targetFrameIndex: number) => {
        const { transitionDuration } = this.props;
        const startFrameIndex = this.state.currentFrameIndex;
        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsedTime = time - startTime;
            const progress = Math.min(elapsedTime / transitionDuration!, 1);
            const currentFrameIndex = startFrameIndex + (targetFrameIndex - startFrameIndex) * progress;

            this.drawFrame(currentFrameIndex);

            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(animate);
            } else {
                this.setState({ currentFrameIndex: targetFrameIndex });

                // Start idle timeout after transition completes
                this.idleTimeoutId = window.setTimeout(this.setIdle, this.props.idleTimeout);
            }
        };

        this.animationFrameId = requestAnimationFrame(animate);
    };

    startAnimation = () => {
        const animate = () => {
            if (this.state.frames.length > 0) {
                this.setState((prevState) => ({
                    currentFrameIndex: (prevState.currentFrameIndex + 1) % this.frameCount,
                }), () => {
                    this.drawFrame(this.state.currentFrameIndex);
                });
            }
            this.timeoutId = window.setTimeout(() => {
                this.animationFrameId = requestAnimationFrame(animate);
            }, this.props.frameDelay);
        };
        this.animationFrameId = requestAnimationFrame(animate);
    };

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    pointerEvents: 'none',
                    opacity: this.state.opacity,
                    transition: 'opacity 0.5s ease',
                }}
            ></canvas>
        );
    }
}

export default GifControl;
