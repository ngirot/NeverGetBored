import createOauthWindow from "./window";
import {Provider} from "./Provider";
import {Entertainment} from "../reducers/platforms";
import Token from "./Token";

const {OAuth2Provider} = require("electron-oauth-helper");
const api = require('twitch-api-v5');

api.clientID = 'uviersrira44oauqh1n6bdw8h0f0jw';

export function generateTokenTwitch(): Promise<Token> {
    const window = createOauthWindow();

    const config = {
        client_id: api.clientID,
        client_secret: "t71vqgy5y4gmjimrfpr2yr2lixcumx",
        authorize_url: "https://id.twitch.tv/oauth2/authorize",
        response_type: "token",
        redirect_uri: "http://localhost",
        scope: 'openid'
    };

    const provider = new OAuth2Provider(config);

    return provider.perform(window)
        .then((token: any) => {
                console.log('Token : ', token);
                window.destroy();
                return new Token(token.access_token);
            }
        )
        .catch((error: any) => console.error(error));
}

export function entertainmentsTwitch(token: Token): Promise<Entertainment[]> {
    return new Promise((resolve, reject) => {
        const map = (error: any, api: any) => {
            if (error) {
                console.log('error', error);
                reject('Unable to load streams from Twitch');
            }
            const streams: any[] = api.streams;
            const result = streams.map((stream: any) => {
                return new Entertainment(Provider.TWITCH, stream._id, stream.channel.status,
                    stream.channel.display_name, stream.channel.url,
                    stream.preview.medium);
            });
            resolve(result);
        };
        console.log('token => ', token);
        api.streams.followed({auth: token.currentToken, stream_type: 'live'}, map);
    });
}