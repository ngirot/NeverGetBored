import Token from "../../../reducers/Token";
import StreamResult from "./StreamResult";
import Stream from "./Stream";
import OauthTokenConfiguration from "../oauth/OauthTokenConfiguration";
import OauthApi from "../oauth/OauthApi";

const api = require('twitch-api-v5');

export default class TwitchApi {

    private readonly clientId: string;

    constructor(clientId: string) {
        this.clientId = clientId;
        api.clientID = clientId;
    }

    public generateTokenTwitch(): Promise<Token> {
        let configuration: OauthTokenConfiguration = {
            clientId: this.clientId,
            clientSecret: "t71vqgy5y4gmjimrfpr2yr2lixcumx",
            tokenUrl: "https://id.twitch.tv/oauth2/authorize",
            redirectUrl: "http://localhost",
            scope: 'openid'
        };

        return new OauthApi().generateTokenWithToken(configuration);
    }

    public entertainmentsTwitch(token: Token): Promise<Stream[]> {
        return new Promise((resolve, reject) => {

            const streamCallback = (error: any, streamResult: StreamResult) => {
                if (error) {
                    console.log('Unable to load streams from Twitch', error);
                    reject('Unable to load streams from Twitch');
                }
                resolve(streamResult.streams);
            };

            api.streams.followed({auth: token.currentToken, stream_type: 'live'}, streamCallback);
        });
    }
}