import {Provider} from "./Provider";
import {Entertainment} from "../reducers/platforms";
import Token from "./Token";
import OauthTokenConfiguration from "./api/oauth/OauthTokenConfiguration";
import {generateTokenWithToken} from "./api/oauth/OauthApi";

const api = require('twitch-api-v5');

api.clientID = 'uviersrira44oauqh1n6bdw8h0f0jw';

export function generateTokenTwitch(): Promise<Token> {
    let configuration = new OauthTokenConfiguration(
        api.clientID,
        "t71vqgy5y4gmjimrfpr2yr2lixcumx",
        "https://id.twitch.tv/oauth2/authorize",
        "http://localhost",
        'openid');

    return generateTokenWithToken(configuration);
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