import {Entertainment} from "../reducers/platforms";
import {Provider} from "./Provider";
import Token from "./Token";
import OauthCodeConfiguration from "./api/oauth/OauthCodeConfiguration";
import {generateTokenWithCode} from "./api/oauth/OauthApi";

const needle = require('needle');

export function generateTokenFeedly(): Promise<Token> {
    const oauthConf = new OauthCodeConfiguration(
        'https://cloud.feedly.com/v3/auth/auth',
        'https://cloud.feedly.com/v3/auth/token',
        'http://localhost',
        'boutroue',
        'FE012EGICU4ZOBDRBEOVAJA1JZYH',
        'https://cloud.feedly.com/subscriptions',
        'authorization_code');

    return new Promise((resolve, reject) => {
        generateTokenWithCode(oauthConf)
            .then((token: Token) => {
                resolve(token);
            })
            .catch((err: any) => {
                reject(err);
            });
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