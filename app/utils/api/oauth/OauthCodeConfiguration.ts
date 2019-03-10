export default class OauthCodeConfiguration {
    public readonly codeUrl: string;
    public readonly tokenUrl: string;
    public readonly redirectUrl: string;
    public readonly clientId: string;
    public readonly secretId: string;
    public readonly scope: string;
    public readonly grantType?: string;

    constructor(codeUrl: string, tokenUrl: string, redirectUrl: string, clientId: string, secretId: string, scope: string, grantType?: string) {
        this.codeUrl = codeUrl;
        this.tokenUrl = tokenUrl;
        this.redirectUrl = redirectUrl;
        this.clientId = clientId;
        this.secretId = secretId;
        this.scope = scope;
        this.grantType = grantType;
    }
}