const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

const {OAuth2Provider} = require("electron-oauth-helper");

export default function generateToken(): Promise<string> {
    const window = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            nodeIntegration: false, // We recommend disabling nodeIntegration for security.
            contextIsolation: true // We recommend enabling contextIsolation for security.
        },
    });

    const config = {
        client_id: "uviersrira44oauqh1n6bdw8h0f0jw",
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