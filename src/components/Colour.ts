export class Colour {
    constructor(public r: number = 255, public g: number = 255, public b: number = 255, public a: number = 255) {
    }

    ///
    /// STATIC
    ///

    static get White(): Colour {
        return new Colour(255, 255, 255);
    }

    static get Black(): Colour {
        return new Colour(0, 0, 0);
    }

    static get Grey(): Colour {
        return new Colour(100, 100, 100);
    }

    static get Red(): Colour {
        return new Colour(255, 0, 0);
    }

    static get Green(): Colour {
        return new Colour(0, 255, 0);
    }

    static get Blue(): Colour {
        return new Colour(0, 0, 255);
    }

    static get Random(): Colour {
        return new Colour(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    }

    ///
    /// PUBLIC
    ///

    public toString(): string {
        return "rgba(" + this.r.toString() + "," + this.g.toString() + "," + this.b.toString() + "," + this.a.toString();
    }
}