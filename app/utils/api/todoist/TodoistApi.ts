import Token from "../../Token";
import SyncResult from "./SyncResult";
import Item from "./Item";
import OauthCodeConfiguration from "../oauth/OauthCodeConfiguration";
import {generateTokenWithCode} from "../oauth/OauthApi";

const needle = require('needle');

export default class TodoistApi {

    private readonly baseUrl = 'https://todoist.com';

    generateTokenTodoist(): Promise<Token> {
        const oauthConf = new OauthCodeConfiguration(
            this.baseUrl + '/oauth/authorize',
            this.baseUrl + '/oauth/access_token',
            'http://localhost',
            'db3bc2e9c84941d1b7d8ef510055c4e7',
            '0d0bb3b20ee743a184a305d24000fbad',
            'data:read');

        return generateTokenWithCode(oauthConf);
    }

    entertainmentsTodoist(token: Token): Promise<Item[]> {
        const url = this.baseUrl + '/api/v7/sync?token=' + token.currentToken + '&sync_token=*&resource_types=[%22all%22]';

        return new Promise((resolve, reject) => {
            // The first call always fail, so I make it fail fast at least...
            needle('get', url, {read_timeout: 100, open_timeout: 100}).then((response: any) => {
                const syncResult = response.body as SyncResult;
                resolve(syncResult.items);
            }).catch(() => {
                needle('get', url).then((response: any) => {
                    const syncResult = response.body as SyncResult;
                    resolve(syncResult.items);
                });
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
}