import moment = require("moment")

export default class Token {
    public readonly currentToken: string
    public readonly refreshToken?: string
    public readonly expiration?: Date

    constructor(currentToken: string, refreshToken?: string, expiration?: Date) {
        this.currentToken = currentToken
        this.refreshToken = refreshToken
        this.expiration = expiration
    }

    public isExpired(): boolean {
        if (!this.expiration) {
            return false
        }
        return moment(this.expiration) <= moment(new Date())
    }
}