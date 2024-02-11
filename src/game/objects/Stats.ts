export class Stats {

    ///
    /// LOCAL
    ///

    /// GENERAL
    public torque: number;
    public accelleration: number;

    /// HEALTH
    private _shieldRegenerationCap: number;
    private _shieldRegen: number;
    private _shieldCap: number;
    private _armourRegen: number;
    private _armourCap: number;
    private _hullRegen: number;
    private _hullCap: number;


    /// POWER
    private _powerRegen: number;
    private _powerCap: number;

    ///
    /// CURRENT
    ///
    public shields: number;
    public armour: number;
    public hull: number;
    public power: number;

    constructor(shieldCap: number = 0, armourCap: number = 0, hullCap: number = 100, powerCap: number = 100) {
        // Set shields
        this._shieldRegenerationCap = 20000; // 1s
        this._shieldRegen = 20000;
        this._shieldCap = shieldCap;
        this.shields = this._shieldCap;

        // Set armour
        this._armourCap = armourCap;
        this.armour = this._armourCap;
        this._armourRegen = 0;

        // Set hull
        this._hullCap = hullCap;
        this.hull = this._hullCap;
        this._hullRegen = 2.5;

        // Set power
        this._powerCap = 100;
        this.power = this._powerCap;
        this._powerRegen = 1;
    }

    ///
    /// PUBLIC
    ///

    public update(elapsed: number) {
        this.regenStats(elapsed);
    }

    public applyDamage(totalDamage: number): boolean {
        let damage = totalDamage;

        // Reset shield regen timer
        this._shieldRegen = this._shieldRegenerationCap;

        // Check if hit is on shields	
        if (this.shields > 0) {
            // Impacts on shields
            this.shields -= damage;

            // Object lives on!
            return false;
        }

        if (this.armour > 0) {
            if (this.armour >= damage) {
                // Impact on the armour
                this.armour -= damage;

                // No damage remaining
                damage -= totalDamage;
            }
            else {
                damage = totalDamage - this.armour;

                this.armour -= damage;
            }
        }

        if (this.hull > damage) {
            // Impact on the health
            this.hull -= damage;
        }
        else {
            // KA-BOOM!
            return true; // Object died!
        }

        return false;
    }

    ///
    /// PRIVATE
    ///

    private regenStats(elapsed: number) {
        // Count Down Shield Regen Timer
        if (this._shieldRegen > 0) {
            this._shieldRegen -= elapsed;
        }

        // Calculate how much to regen by this frame
        var hullRegenAmount = (this._hullRegen / 1000) * elapsed;
        var armourRegenAmount = (this._armourRegen / 1000) * elapsed;

        // Regen armour
        if (this.armour < this._armourCap) {
            this.armour += armourRegenAmount;
        }


        // Regen hull
        if (this.hull < this._hullCap) {
            this.hull += hullRegenAmount;
        }


        // Check if shields should regen
        if (this._shieldRegen <= 0 && this.shields < this._shieldCap) {
            // Regen shields
            this.shields += (this._shieldCap / 1000) * elapsed; // Regen in 1 second

            // Make sure shields dont overflow
            if (this.shields > this._shieldCap)
                this.shields = this._shieldCap;
        }

        // Just to be safe...
        if (this.shields < 0)
            this.shields = 0;

        // Just to be safe...
        if (this.shields > this._shieldCap)
            this.shields = this._shieldCap;

        // Just to be safe...
        if (this.armour < 0)
            this.armour = 0;

        // Just to be safe...
        if (this.armour > this._armourCap)
            this.armour = this._armourCap;

        // Just to be safe...
        if (this.hull < 0)
            this.hull = 0;

        // Just to be safe...
        if (this.hull > this._hullCap)
            this.hull = this._hullCap;
    }

    public toString(): string {
        return "Shields: " + this.shields + ", Armour: " + this.armour + ", Hull: " + this.hull;
    }

    ///
    /// PROPERTIES
    ///

    public get shieldPercent(): number {
        if (this.shields === 0) {
            return 0;
        }

        return (this.shields / this._shieldCap) * 100;
    }

    public get armourPercent(): number {
        if (this.armour === 0)
            return 0;

        return (this.armour / this._armourCap) * 100;
    }

    public get hullPercent(): number {
        if (this.hull === 0) {
            return 0;
        }


        return (this.hull / this._hullCap) * 100;
    }

    public get powerPercent(): number {
        if (this.power === 0) {
            return 0;
        }


        return (this.power / this._powerCap) * 100;
    }
}