'use client'

import { hasValue } from "@/app/util";
import { Game } from "@/game/Game";
import React, { ReactNode, RefObject } from "react";
import UI from "./UI/UI";
import { UIEventArgs } from "@/game/Args";

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
            <div className="relative">
                <canvas ref={this._canvas} className="flex" />
                <UI uiEvent={(e: UIEventArgs) => {
                    this._game.onUIEvent(e);
                }}></UI>
            </div>
        )
    }
}