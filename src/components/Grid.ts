import { Vector } from "matter-js";

export class Grid {

    constructor() {

    }

    public drawGrid(canvasContext: CanvasRenderingContext2D, offset: Vector) {
        let nSize: number = 5000;
        let nGridSize: number = 10;
        let nSmallGridSize: number = 10;
        let nThick: number = 2;
        let nThin: number = 1;

        let nX: number = (Math.round(offset.x / nSize) * nSize) - (nSize * (nGridSize / 2));
        let nY: number = (Math.round(offset.y / nSize) * nSize) - (nSize * (nGridSize / 2));
        let nSmallX: number = 0;
        let nSmallY: number = 0;

        canvasContext.strokeStyle = 'darkgray';

        // Draw first two lines
        canvasContext.beginPath();
        canvasContext.lineWidth = nThick;
        canvasContext.moveTo(nX, nY);
        canvasContext.lineTo(nX + (nSize * nGridSize), nY);
        canvasContext.moveTo(nX, nY);
        canvasContext.lineTo(nX, nY + (nSize * nGridSize));
        canvasContext.stroke();

        for (var i = 0; i < nGridSize; i++) {
            nSmallX = nX;
            nSmallY = nY;

            for (var j = 0; j < nSmallGridSize; j++) {
                canvasContext.beginPath();
                canvasContext.lineWidth = nThin;
                canvasContext.moveTo(nSmallX, nSmallY);
                canvasContext.lineTo(nSmallX + (nSize * nGridSize), nSmallY);
                canvasContext.stroke();

                nSmallY += (nSize / nSmallGridSize);
            }

            nY += nSize;

            canvasContext.beginPath();
            canvasContext.lineWidth = nThick;
            canvasContext.moveTo(nX, nY);
            canvasContext.lineTo(nX + (nSize * nGridSize), nY);
            canvasContext.stroke();
        }

        nX = (Math.round(offset.x / nSize) * nSize) - (nSize * (nGridSize / 2));
        nY = (Math.round(offset.y / nSize) * nSize) - (nSize * (nGridSize / 2));

        for (var i = 0; i < nGridSize; i++) {
            nSmallX = nX;
            nSmallY = nY;

            for (var j = 0; j < nSmallGridSize; j++) {
                canvasContext.beginPath();
                canvasContext.lineWidth = nThin;
                canvasContext.moveTo(nSmallX, nSmallY);
                canvasContext.lineTo(nSmallX, nSmallY + (nSize * nGridSize));
                canvasContext.stroke();

                nSmallX += (nSize / nSmallGridSize);
            }

            nX += nSize;

            canvasContext.beginPath();
            canvasContext.lineWidth = nThick;
            canvasContext.moveTo(nX, nY);
            canvasContext.lineTo(nX, nY + (nSize * nGridSize));
            canvasContext.stroke();
        }
    }
}