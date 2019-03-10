import createOauthWindow from "./window";
import {Entertainment} from "../reducers/platforms";
import {Provider} from "./Provider";
import uuid = require("uuid");
import Token from "./Token";
import moment = require("moment");

const needle = require('needle');

const clientId = 'boutroue';
const clientSecret = 'FE012EGICU4ZOBDRBEOVAJA1JZYH';

export function generateTokenFeedly(): Promise<Token> {

    const redirectUrl = 'http://localhost';

    const window = createOauthWindow();

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
                        const expiration = moment().add(resp.body.expires_in, 'seconds');
                        const token = new Token(resp.body.access_token, resp.body.refresh_token, expiration.toDate());
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
        window.loadURL(baseUrl);
    });
}

export function entertainmentsFeedly(token: Token): Promise<Entertainment[]> {
    const options = {headers: {'Authorization': 'OAuth ' + token.currentToken}};

    return new Promise((resolve, reject) => {

        needle('get', 'https://cloud.feedly.com/v3/profile', options).then((response: any) => {
            const userId = response.body.id;

            needle('get', 'https://cloud.feedly.com/v3/streams/contents?streamId=' +
                'user/' + userId + '/category/global.all' +
                '&unreadOnly=true'
                , options).then((response: any) => {
                const entertainments = response.body.items
                    .map((item: any) => {
                        return new Entertainment(Provider.FEEDLY, item.id, item.title, item.origin.title, item.origin.htmlUrl, item.visual.url);
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