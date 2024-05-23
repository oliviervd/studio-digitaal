import P5 from 'p5';
import {h, Component} from "preact";

class Pillar extends Component {
    componentDidMount() {
        this.canvas = new P5(this.sketch, this.wrapper)
        window.addEventListener('resize', this.handleResize)
    }
    componentWillUnmount() {
        this.canvas.remove()
        window.removeEventListener('resize', this.handleResize);
    }


    handleResize = () => {
        // resize canavas when the window is resized.
        const newHeight = window.innerHeight; // Set height to window height
        this.canvas.resizeCanvas(this.wrapper.offsetWidth, newHeight)
    }

    sketch = (p) => {
        var elementsX = 10;
        var elementsY = 100;
        let var1 = this.props.var1; // Store var1 as a local variable
        let color = p.color("orange")

        if (window.innerWidth <= 600) {
            color = p.color("#f9f1f1")
        }


        // p5.js setup function
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
        };

        // p5.js draw function
        p.draw = () => {
            p.background(255);

            p.fill(color);
            p.noStroke();

            p.textFont("IBMPlexMono-Bold");
            p.textAlign(p.CENTER, p.CENTER);

            p.textSize(30);


            for (let y = 0; y < elementsY + 1; y++) {
                for (let x=0; x < elementsX + 1; x++){

                    let posY = p.map(y, 0, elementsY, 0, p.height)
                    let magX = p.map(p.sin(p.radians(posY * var1 + p.frameCount)), -1, 1, -200, 200)
                    let posX = p.map(x, 0, elementsX, -magX, magX);

                    // create matrix
                    p.push();
                    p.translate(p.width/2 + posX, posY);
                    p.text("░",0, 0);
                    p.pop();
                }
            }
        }
        // Function to update var1 and trigger redraw
        p.updateVar1 = (newVar1) => {
            var1 = newVar1;
            p.redraw(); // Redraw the canvas
        };
    }

    componentDidUpdate(prevProps) {
        // If var1 prop has changed, trigger a redraw
        if (prevProps.var1 !== this.props.var1) {
            this.canvas.updateVar1(this.props.var1);
        }
    }

    render() {
        return (
            <div style={{ height: '100vh', overflowY: 'auto' }} ref={(wrapper) => (this.wrapper = wrapper)}></div>
        )
    }
}

export default Pillar;