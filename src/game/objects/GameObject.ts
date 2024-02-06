import Matter, { Body, Vector } from "matter-js";
import { EGameObjectType } from "./GameObjectTypes";
import { Container, Graphics } from "pixi.js";
import { hasValue } from "@/app/util";
import { Component } from "./components/Component";

export class GameObject {
    ///
    /// PRIVATE
    ///
    private _body: Matter.Body;
    private _type: EGameObjectType;
    private _position: Vector;
    private _container: Container;

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

    private populateContainer(): void {
        for (const part of this._body.parts.slice(1)) { // Ignore the first part as it's the main body
            const graphics = new Graphics();

            graphics.position = Vector.neg(this._position);
            graphics.beginFill('red');
            graphics.lineStyle(10, 'white');

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

    ///
    /// PUBLIC
    ///

    public setComponents(...components: Component[]): void {
        const bodys = components.map(c => c.body);
        this.setParts(bodys, true);

        components.forEach((c) => {
            const container = new Container();
            container.position = Vector.neg(this._position);

            c.draw(container);


            this._container.addChild(container);
        });
    }

    public setParts(parts: Body[], draw: boolean = false): void {
        Body.setParts(this._body, parts);
        Body.setPosition(this.body, this._position);

        // if (draw) {
        //this.populateContainer();
        // }
    }

    public addGraphics(graphics: Graphics): void {
        this._container.addChild(graphics);
    }

    ///
    /// PROPERTIES
    ///

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