import {Entertainment} from "../reducers/platforms";

const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

const {OAuth2Provider} = require("electron-oauth-helper");
const api = require('twitch-api-v5');

api.clientID = 'uviersrira44oauqh1n6bdw8h0f0jw';

export function generateToken(): Promise<string> {
    const window = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            nodeIntegration: false, // We recommend disabling nodeIntegration for security.
            contextIsolation: true // We recommend enabling contextIsolation for security.
        },
    });

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
                return token.access_token;
            }
        )
        .catch((error: any) => console.error(error));
}

export function entertainments(token: string): Promise<Entertainment[]> {
    return new Promise((resolve, reject) => {
        const map = (error: any, api: any) => {
            const streams: any[] = api.streams;
            const result = streams.map((stream: any) => {
                return new Entertainment(stream._id, stream.channel.status,
                    stream.channel.display_name, stream.channel.url,
                    stream.preview.medium);
            });
            resolve(result);
        }
        api.streams.followed({auth: token, stream_type: 'live'}, map);
    });
}