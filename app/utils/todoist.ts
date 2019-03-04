import uuid = require("uuid");
import createWindow from "./window";

const needle = require('needle');

export function generateTokenTodoist(): Promise<string> {
    const clientId = 'db3bc2e9c84941d1b7d8ef510055c4e7';
    const redirectUrl = 'http://localhost';

    const window = createWindow();

    const randomState = uuid();
    return new Promise((resolve, reject) => {
        window.webContents.addListener('will-redirect', function (event: Event, urlAsString: string) {
            if (urlAsString.startsWith(redirectUrl)) {
                const url = new URL(urlAsString);
                const code = url.searchParams.get('code');
                const returnState = url.searchParams.get('state');
                console.log('Code = ' + code);

                if (returnState !== randomState) {
                    reject('Security issue, state are not equals');
                }

                const tokenUrl = "https://todoist.com/oauth/access_token?"
                    + "client_id=" + clientId
                    + "&client_secret=0d0bb3b20ee743a184a305d24000fbad"
                    + "&code=" + code
                    + "&redirect_uri=" + redirectUrl;

                needle('post', tokenUrl)
                    .then(function (resp: any) {
                        const token = resp.body.access_token;
                        console.log('token => ' + token);
                        window.destroy();
                        resolve(token);
                    })
                    .catch(function (err: any) {
                        console.error('e => ', err);
                        window.destroy();
                        reject(err);
                    });
            }
        });

        window.loadURL('https://todoist.com/oauth/authorize?client_id=' + clientId + '&state=' + randomState + '&scope=data:read');
    });
}