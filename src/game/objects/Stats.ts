export class Stats {

    ///
    /// LOCAL
    ///

    /// GENERAL
    public torque: number;
    public accelleration: number;

    /// HEALTH
    private shieldRegenerationCap: number;
    private shieldRegen: number;
    private shieldCap: number;
    private armourCap: number;
    private armourRegen: number;
    private hullCap: number;
    private hullRegen: number;

    ///
    /// CURRENT
    ///
    public shields: number;
    public armour: number;
    public hull: number;

    constructor(shieldCap: number = 0, armourCap: number = 0, hullCap: number = 100) {
        // Set shields
        this.shieldRegenerationCap = 20000; // 1s
        this.shieldRegen = 20000;
        this.shieldCap = shieldCap;
        this.shields = this.shieldCap;

        // Set armour
        this.armourCap = armourCap;
        this.armour = this.armourCap;
        this.armourRegen = 0;

        // Set hull
        this.hullCap = hullCap;
        this.hull = this.hullCap;
        this.hullRegen = 2.5;
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
        this.shieldRegen = this.shieldRegenerationCap;

        // Check if hit is on shields	
        if (this.shields > 0) {
            // Impacts on shields
            this.shields -= damage;

            // Object lives on!
            return false;
        }

        if (this.armour > 0) {
            if (this.armour > damage) {
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
        if (this.shieldRegen > 0) {
            this.shieldRegen -= elapsed;
        }

        // Calculate how much to regen by this frame
        var hullRegenAmount = (this.hullRegen / 1000) * elapsed;
        var armourRegenAmount = (this.armourRegen / 1000) * elapsed;

        // Regen armour
        if (this.armour < this.armourCap) {
            this.armour += armourRegenAmount;
        }


        // Regen hull
        if (this.hull < this.hullCap) {
            this.hull += hullRegenAmount;
        }


        // Check if shields should regen
        if (this.shieldRegen <= 0 && this.shields < this.shieldCap) {
            // Regen shields
            this.shields += (this.shieldCap / 1000) * elapsed; // Regen in 1 second

            // Make sure shields dont overflow
            if (this.shields > this.shieldCap)
                this.shields = this.shieldCap;
        }

        // Just to be safe...
        if (this.shields < 0)
            this.shields = 0;

        // Just to be safe...
        if (this.shields > this.shieldCap)
            this.shields = this.shieldCap;

        // Just to be safe...
        if (this.armour < 0)
            this.armour = 0;

        // Just to be safe...
        if (this.armour > this.armourCap)
            this.armour = this.armourCap;

        // Just to be safe...
        if (this.hull < 0)
            this.hull = 0;

        // Just to be safe...
        if (this.hull > this.hullCap)
            this.hull = this.hullCap;
    }

    public toString(): string {
        return "Shields: " + this.shields + ", Armour: " + this.armour + ", Hull: " + this.hull;
    }

    ///
    /// PROPERTIES
    ///

    public get shieldPercent(): number {
        if (this.shields === 0)
            return 0;

        return (this.shields / this.shieldCap) * 100;
    }

    public get armourPercent(): number {
        if (this.armour === 0)
            return 0;

        return (this.armour / this.armourCap) * 100;
    }

    public get hullPercent(): number {
        if (this.hull === 0)
            return 0;

        return (this.hull / this.hullCap) * 100;
    }
}