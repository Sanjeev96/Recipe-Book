export class User { // created with class so we can use 'new' keyword
    constructor(
        public email: string,
        public id: string,
        private _token: string, // private so it cant be accessed from here
        private _tokenEXPdate: Date,
    ) {}

    // getter to check VALIDITY of value and so user
    // cant change value (unless a setter is used)
    get token() {
        if (!this._tokenEXPdate || this._tokenEXPdate < new Date())  {
            return null;
        } else {
            return this._token; // if with conditions then return value
        }
    }
}
