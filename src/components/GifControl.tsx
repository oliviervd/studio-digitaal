import { Component, createRef } from 'preact';
import { parseGIF, decompressFrames, ParsedFrame, Frame } from 'gifuct-js';

interface GifControlProps {
    src: string;
    playAutomatically?: boolean;
    frameDelay?: number; // Delay in milliseconds
}

interface GifControlState {
    frames: ImageData[];
    currentFrameIndex: number;
}

class GifControl extends Component<GifControlProps, GifControlState> {
    private canvasRef = createRef<HTMLCanvasElement>();
    private ctx: CanvasRenderingContext2D | null = null;
    private frameCount = 0;
    private animationFrameId: number | null = null;
    private timeoutId: number | null = null;

    static defaultProps = {
        playAutomatically: false,
        frameDelay: 50, // Default to 100 milliseconds per frame
    };

    constructor(props: GifControlProps) {
        super(props);
        this.state = {
            frames: [],
            currentFrameIndex: 0,
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
            const frame = this.state.frames[Math.floor(index)];
            this.ctx.clearRect(0, 0, this.canvasRef.current!.width, this.canvasRef.current!.height);
            // Center the frame on the canvas
            const x = 0 ;
            const y = 0 ;
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
                const frameIndex = (frameIndexX + frameIndexY) % this.frameCount; // Combine both modifiers
                this.setState({ currentFrameIndex: frameIndex }, () => {
                    this.drawFrame(frameIndex);
                });
            }
        }
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
                className={"landing-gif"}
            ></canvas>
        );
    }
}

export default GifControl;
