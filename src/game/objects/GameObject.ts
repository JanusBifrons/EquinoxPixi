import Matter, { Body, Vector } from "matter-js";
import { EGameObjectType } from "./GameObjectTypes";
import { Container, Graphics } from "pixi.js";
import { Component } from "./components/Component";
import { Colour } from "@/components/Colour";
import { Stats } from "./Stats";
import { Event } from "@/components/Event";

export interface IColours {
    primaryColour: Colour;
    secondaryColour: Colour;
    outlineColour: Colour;
}

export class GameObject {
    ///
    /// PRIVATE
    ///
    private _body: Matter.Body;
    private _type: EGameObjectType;
    private _position: Vector;
    private _container: Container;
    private _isAlive: boolean = true;

    ///
    /// PUBLIC
    ///
    public colours: IColours = { primaryColour: Colour.Grey, secondaryColour: Colour.White, outlineColour: Colour.Black }
    public stats: Stats = new Stats();

    ///
    /// EVENTS
    ///
    public destroyed: Event = new Event();

    constructor(position: Vector, type: EGameObjectType) {
        this._position = position;
        this._type = type;

        this._body = Body.create({
            frictionAir: 0,
        });

        this._container = new Container();
    }

    ///
    /// PRIVATE
    ///

    private drawSelf(): void {
        for (const part of this._body.parts.slice(1)) { // Ignore the first part as it's the main body
            const graphics = new Graphics();

            graphics.position = Vector.neg(this._position);
            graphics.beginFill(this.colours.primaryColour.toString())
            graphics.lineStyle(10, this.colours.outlineColour.toString());

            for (let i = 0; i < part.vertices.length; i++) {
                const vert = part.vertices[i];

                if (i == 0) {
                    graphics.moveTo(vert.x, vert.y);
                }
                else {
                    graphics.lineTo(vert.x, vert.y);
                }
            }

            graphics.closePath();
            graphics.endFill();

            this._container.addChild(graphics);
        }
    }

    ///
    /// PUBLIC
    ///

    public update(): void {
        this._container.position = this._body.position;
        this._container.rotation = this._body.angle;
    }

    public draw(container: Container, colours: IColours = this.colours): void {
        const graphics = new Graphics();
        graphics.beginFill(colours.primaryColour.toString());
        graphics.lineStyle(5, colours.outlineColour.toString());

        for (let i = 0; i < this.body.vertices.length; i++) {
            const vert = this.body.vertices[i];

            if (i == 0) {
                graphics.moveTo(vert.x, vert.y);
            }
            else {
                graphics.lineTo(vert.x, vert.y);
            }
        }

        graphics.closePath();
        graphics.endFill();

        container.addChild(graphics);
    }

    public setChildren(...components: Component[]): void {
        const bodys = components.map(c => c.body);
        this.setBody(bodys);

        components.forEach((c) => {
            const container = new Container();
            container.position = Vector.neg(this._position);

            c.draw(container, this.colours);

            this._container.addChild(container);
        });
    }

    public setBody(parts: Body[], draw: boolean = false): void {
        Body.setParts(this._body, parts);
        Body.setPosition(this.body, this._position);

        if (draw) {
            this.drawSelf();
        }
    }

    public addGraphics(graphics: Graphics): void {
        this._container.addChild(graphics);
    }


    public hit(damage: number): void {
        console.log("Stats before");
        console.log(this.stats.toString());

        if (this.stats.applyDamage(damage)) {
            this.destroy();
        }

        console.log("Stats after");
        console.log(this.stats.toString());
    }

    public destroy(): void {
        if (this._isAlive) {
            this.destroyed.raise(this);

            this._isAlive = false;
        }
    }

    ///
    /// PROPERTIES
    ///

    public get isAlive(): boolean {
        return this._isAlive;
    }

    public get id(): number {
        return this.body.id;
    }

    public get type(): EGameObjectType {
        return this._type;
    }

    public get position(): Vector {
        return this._body?.position;
    }

    public get angle(): number {
        return this._body.angle;
    }

    public get body(): Matter.Body {
        return this._body;
    }

    public get speed(): number {
        return this._body.speed;
    }

    public get x(): number {
        return this._body.position.x;
    }

    public get y(): number {
        return this._body.position.y;
    }

    public get container(): Container {
        return this._container;
    }
}