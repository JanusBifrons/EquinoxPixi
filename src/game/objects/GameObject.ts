import Matter, { Bodies, Body, Collision, Composite, ICollisionCallback, ICollisionFilter, Vector } from "matter-js";
import { EGameObjectType } from "./GameObjectTypes";

export class GameObject {
    ///
    /// PRIVATE
    ///
    private _body: Matter.Body;
    private _type: EGameObjectType;
    private _position: Vector;

    ///
    /// PROTECTED
    ///
    protected _strokeStyle: string;
    protected _fillStyle: string;
    protected _lineWidth: number = 10;


    constructor(position: Vector, type: EGameObjectType) {
        this._position = position;
        this._type = type;

        this._body = Body.create({
            frictionAir: 0,
            render: {
                lineWidth: this._lineWidth,
                strokeStyle: this._strokeStyle,
                fillStyle: this._fillStyle,
            },
        });
    }

    ///
    /// PUBLIC
    ///

    public update(): void {

    }

    ///
    /// PRIVATE
    ///

    // private getCollisionFilter(): ICollisionFilter {
    //     switch (this._type) {

    //     }



    //     return {
    //         category: this._type
    //     };
    // }

    ///
    /// PUBLIC
    ///

    public setParts(parts: Body[]): void {
        Body.setParts(this._body, parts);

        Body.setPosition(this.body, this._position);
    }

    public setBody(body: Body): void {
        Body.setParts(this._body, [
            body
        ]);

        Body.setPosition(this.body, this._position);
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
}