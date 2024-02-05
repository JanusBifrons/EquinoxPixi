'use client'

import { hasValue } from "@/app/util";
import { Game } from "@/game/Game";
import React, { ReactNode, RefObject } from "react";

export class Debug extends React.Component {

    private _canvasA: RefObject<HTMLCanvasElement>;
    private _canvasB: RefObject<HTMLCanvasElement>;
    private _gameA: Game;
    private _gameB: Game;

    constructor(props) {
        super(props);

        this._canvasA = React.createRef();
        this._canvasB = React.createRef();
    }

    public componentDidMount(): void {
        if (!hasValue(this._gameA)) {
            this._gameA = new Game(this._canvasA.current);
        }

        if (!hasValue(this._gameB)) {
            this._gameB = new Game(this._canvasB.current);
        }
    }

    public render(): ReactNode {
        return (
            <div className="flex">
                <canvas ref={this._canvasA} className="flex-1" />
                <canvas ref={this._canvasB} className="flex-1" />
            </div>

        )
    }
}