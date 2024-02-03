import { Colour } from "@/components/Colour";
import { colors } from "@mui/material";
import { render } from "react-dom";

export class UI {
    private _div: HTMLDivElement;
    private _canvas: HTMLCanvasElement;
    private _renderingContext: CanvasRenderingContext2D;

    constructor(renderingContext: CanvasRenderingContext2D) {
        this._renderingContext = renderingContext;

        console.log(this._renderingContext);
    }

    public render(): void {

        this.drawStatBar(80, 80, Colour.Blue);
        this.drawStatBar(20, 60, Colour.Grey);
        this.drawStatBar(20, 40, Colour.Green);
        this.drawStatBar(20, 20, Colour.Random);
    }

    private drawStatBar(percent: number, radius: number, colour: Colour): void {
        var _x = this._renderingContext.canvas.width / 2;
        var _y = this._renderingContext.canvas.height - 30;

        this._renderingContext.lineWidth = 23;
        this._renderingContext.strokeStyle = 'white';

        // Border
        this._renderingContext.beginPath();
        this._renderingContext.arc(_x, _y, radius, Math.PI, Math.PI * 2);
        this._renderingContext.stroke();
        this._renderingContext.closePath();

        this._renderingContext.lineWidth = 20;
        this._renderingContext.strokeStyle = 'black';

        // Background
        this._renderingContext.beginPath();
        this._renderingContext.arc(_x, _y, radius, Math.PI, Math.PI * 2);
        this._renderingContext.stroke();
        this._renderingContext.closePath();

        // Stat
        this._renderingContext.lineWidth = 20;
        this._renderingContext.strokeStyle = colour.toString();
        this._renderingContext.beginPath();
        this._renderingContext.arc(_x, _y, radius, Math.PI, Math.PI + (Math.PI * (percent / 100)));
        this._renderingContext.stroke();
        this._renderingContext.closePath();
    }
}