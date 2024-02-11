import { Colour } from "@/components/Colour";
import { Container, Graphics } from "pixi.js";
import { Stats } from "../objects/Stats";

export class StatBar {
    private _container: Container;

    constructor() {
        this._container = new Container();
        this._container.position.x = window.innerWidth / 2;
        this._container.position.y = window.innerWidth / 2;
    }

    public update(stats: Stats): void {
        this._container.children.forEach(c => c.destroy());
        this._container.removeChildren();

        this._container.addChild(this.drawStatBar(stats.shieldPercent, 80, Colour.Blue));
        this._container.addChild(this.drawStatBar(stats.armourPercent, 60, Colour.Grey));
        this._container.addChild(this.drawStatBar(stats.hull, 40, Colour.Green));
        this._container.addChild(this.drawStatBar(20, 20, Colour.Random))
    }

    private drawStatBar(percent: number, radius: number, colour: Colour): Graphics {
        const graphics = new Graphics();

        // Border
        graphics.lineStyle(23, 'white');
        graphics.beginFill('white');
        graphics.arc(0, 0, radius, Math.PI, Math.PI * 2);
        graphics.endFill();
        graphics.closePath();

        // Background
        graphics.lineStyle(20, 'white');
        graphics.beginFill('black');
        graphics.arc(0, 0, radius, Math.PI, Math.PI * 2);
        graphics.endFill();
        graphics.closePath();

        // Stat
        graphics.lineStyle(20, 'white');
        graphics.beginFill(colour.toString());
        graphics.arc(0, 0, radius, Math.PI, Math.PI + (Math.PI * (percent / 100)));
        graphics.endFill();
        graphics.closePath();

        return graphics;
    }

    ///
    /// PROPERTIES
    ///

    public get container(): Container {
        return this._container;
    }
}