'use client'

import { hasValue } from "@/app/util";
import { Game } from "@/game/Game";
import React, { ReactNode, RefObject } from "react";

export class Equinox extends React.Component {

    private _canvas: RefObject<HTMLCanvasElement>;
    private _game: Game;

    constructor(props) {
        super(props);

        this._canvas = React.createRef();
    }

    public componentDidMount(): void {
        if (!hasValue(this._game)) {
            this._game = new Game(this._canvas.current);
        }
    }

    public render(): ReactNode {
        return (
            <canvas ref={this._canvas} className="flex" />
        )
    }
}