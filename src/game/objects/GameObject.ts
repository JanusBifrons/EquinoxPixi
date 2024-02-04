import Matter, { Body, Vector } from "matter-js";
import { EGameObjectType } from "./GameObjectTypes";
import { Container, Graphics } from "pixi.js";

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
    /// PUBLIC
    ///

    public update(): void {
        this._container.position = this._body.position;
        this._container.rotation = this._body.angle;
    }

    ///
    /// PUBLIC
    ///

    public setParts(parts: Body[]): void {
        Body.setParts(this._body, parts);

        Body.setPosition(this.body, this._position);

        for (const part of parts) {
            const graphics = new Graphics();

            graphics.position = Vector.neg(this._position);
            graphics.beginFill('red');

            for (let i = 0; i < part.vertices.length; i++) {
                const vert = part.vertices[i];

                console.log(vert);

                if (i == 0) {
                    graphics.moveTo(vert.x, vert.y);
                }
                else {
                    graphics.lineTo(vert.x, vert.y);
                }
            }

            graphics.endFill();

            this._container.addChild(graphics);
        }
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