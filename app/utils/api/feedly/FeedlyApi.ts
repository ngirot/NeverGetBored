import Token from "../../Token";
import OauthCodeConfiguration from "../oauth/OauthCodeConfiguration";
import {generateTokenWithCode} from "../oauth/OauthApi";
import Profile from "./Profile";
import Contents from "./Contents";
import Item from "./Item";

const needle = require('needle');

export default class FeedlyApi {

    private readonly baseUrl = 'https://cloud.feedly.com';

    generateTokenFeedly(): Promise<Token> {
        const oauthConf = new OauthCodeConfiguration(
            this.baseUrl + '/v3/auth/auth',
            this.baseUrl + '/v3/auth/token',
            'http://localhost',
            'boutroue',
            'FE012EGICU4ZOBDRBEOVAJA1JZYH',
            this.baseUrl + '/subscriptions',
            'authorization_code');

        return new Promise((resolve, reject) => {
            generateTokenWithCode(oauthConf)
                .then(resolve)
                .catch(reject);
        });
    }

    entertainmentsFeedly(token: Token): Promise<Item[]> {
        const options = {headers: {'Authorization': 'OAuth ' + token.currentToken}};

        return new Promise((resolve, reject) => {
            const profileUrl = this.baseUrl + '/v3/profile';

            needle('get', profileUrl, options)
                .then((response: any) => response.body as Profile)
                .then((profile: Profile) => {
                    const contentUrl = this.baseUrl + '/v3/streams/contents'
                        + '?streamId='
                        + 'user/' + profile.id + '/category/global.all'
                        + '&unreadOnly=true';

                    needle('get', contentUrl, options)
                        .then((response: any) => response.body as Contents)
                        .then((contents: Contents) => resolve(contents.items))
                        .catch(() => {
                            reject('Unable to load entertainments from Feedly');
                        });
                }).catch(() => {
                reject('Unable to load user informations from Feedly');
            });
        });
    }
}