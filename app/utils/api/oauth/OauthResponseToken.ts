export default class OauthResponseToken {
    public readonly access_token: string;
    public readonly refresh_token?: string;
    public readonly expires_in?: number;
}