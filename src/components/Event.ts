export class Event {
    ///
    /// LOCAL
    ///
    private handlers: any[];

    constructor() {
        this.handlers = [];
    }

    ///
    /// PUBLIC
    ///

    public addHandler(callBack: (sender: any, args?: any) => void) {
        this.handlers.push(callBack);
    }

    public raise(sender: any, args?: any) {
        for (let i = 0; i < this.handlers.length; i++) {
            this.handlers[i](sender, args);
        }
    }
}