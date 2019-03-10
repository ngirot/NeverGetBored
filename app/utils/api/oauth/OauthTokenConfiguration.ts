export default class OauthTokenConfiguration {
    public readonly clientId: string;
    public readonly clientSecret: string;
    public readonly tokenUrl: string;
    public readonly redirectUrl: string;
    public readonly scope: string;

    constructor(clientId: string, clientSecret: string, tokenUrl: string, redirectUrl: string, scope: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.tokenUrl = tokenUrl;
        this.redirectUrl = redirectUrl;
        this.scope = scope;
    }
}