import { IPointData } from "pixi.js";

export class Vector implements IPointData {

    constructor(public x: number, public y: number) {
    }

    ///
    /// STATIC
    ///

    static DirectionFromRotation(rotation: number, magnitude: number = 1) {
        return new Vector(Math.cos(rotation) * magnitude, Math.sin(rotation) * magnitude);
    }

    static get Zero(): Vector {
        return new Vector(0, 0);
    }

    static Magnitude(cVector: Vector): number {
        return Math.sqrt(cVector.x * cVector.x + cVector.y * cVector.y);
    }

    static Distance(cVectorA: Vector, cVectorB: Vector): number {
        return Vector.Magnitude(new Vector(cVectorB.x - cVectorA.x, cVectorB.y - cVectorA.y));
    }

    static Unit(cVector: Vector): Vector {
        let nLength = Vector.Magnitude(cVector);

        let nX: number = cVector.x / nLength;
        let nY: number = cVector.y / nLength;

        return new Vector(nX, nY);
    }

    static DirectionTo(cVectorFrom: Vector, cVectorTo: Vector): number {
        var nX = cVectorTo.x - cVectorFrom.x;
        var nY = cVectorTo.y - cVectorFrom.y;

        return Math.atan2(nY, nX);
    }

    ///
    /// PUBLIC
    ///

    public add(cVector: Vector): Vector {
        return new Vector(this.x + cVector.x, this.y + cVector.y);
    }

    public subtract(cVector: Vector): Vector {
        return new Vector(this.x - cVector.x, this.y - cVector.y);
    }

    public multiply(nMultiple: number): Vector {
        return new Vector(this.x * nMultiple, this.y * nMultiple);
    }

    public equals(cVector: Vector): boolean {
        if (cVector.x == this.x && cVector.y == this.y)
            return true;

        return false;
    }

    public reverse(): Vector {
        return this.multiply(-1);
    }

    public limit(nLimit: number) {
        if (this.x >= nLimit)
            this.x = nLimit;

        if (this.x <= -nLimit)
            this.x = -nLimit;

        if (this.y >= nLimit)
            this.y = nLimit;

        if (this.y <= -nLimit)
            this.y = -nLimit;
    }

    public toArray(): [number, number] {
        return [this.x, this.y];
    }

    ///
    /// PROPERTIES
    ///

    public get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public get length(): number {
        return Math.atan2(this.y, this.x);
    }
}