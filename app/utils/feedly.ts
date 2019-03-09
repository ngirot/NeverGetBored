import createWindow from "./window";
import {Entertainment} from "../reducers/platforms";
import {Provider} from "./Provider";
import uuid = require("uuid");

const needle = require('needle');

const clientId = 'boutroue';
const clientSecret = 'FE012EGICU4ZOBDRBEOVAJA1JZYH';

export function generateTokenFeedly(): Promise<string> {

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

                const tokenUrl = "https://cloud.feedly.com/v3/auth/token?"
                    + "client_id=" + clientId
                    + "&client_secret=" + clientSecret
                    + "&code=" + code
                    + "&redirect_uri=" + redirectUrl
                    + "&grant_type=authorization_code";

                needle('post', tokenUrl)
                    .then(function (resp: any) {
                        const token = resp.body.access_token;
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

        let baseUrl = 'https://cloud.feedly.com/v3/auth/auth?'
            + '&client_id=' + clientId
            + '&state=' + randomState
            + '&scope=https://cloud.feedly.com/subscriptions'
            + "&redirect_uri=" + redirectUrl
            + "&response_type=code";
        console.log('baseUrl = ' + baseUrl);
        window.loadURL(baseUrl);
    });
}

export function entertainmentsFeedly(token: string): Promise<Entertainment[]> {
    const options = {headers: {'Authorization': 'OAuth ' + token}};

    return new Promise((resolve, reject) => {

        needle('get', 'https://cloud.feedly.com/v3/profile', options).then((response: any) => {
            const userId = response.body.id;

            needle('get', 'https://cloud.feedly.com/v3/streams/contents?streamId=' +
                'user/' + userId + '/category/global.all' +
                '&unreadOnly=true'
                , options).then((response: any) => {
                const entertainments = response.body.items
                    .map((item: any) => {
                        const previewUrl = item.thumbnail && item.thumbnail.length > 0 ? item.thumbnail[0] : null;
                        return new Entertainment(Provider.FEEDLY, item.id, item.title, item.author, item.origin.htmlUrl, previewUrl);
                    });
                resolve(entertainments);
            }).catch(() => {
                reject('Unable to load entertainments from Feedly');
            });
        }).catch(() => {
            reject('Unable to load user informations from Feedly');
        });
    });
}