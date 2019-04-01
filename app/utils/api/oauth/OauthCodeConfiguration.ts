export default class OauthCodeConfiguration {
    public readonly codeUrl: string
    public readonly tokenUrl: string
    public readonly redirectUrl: string
    public readonly clientId: string
    public readonly secretId: string
    public readonly scope: string
    public readonly grantType?: string
}