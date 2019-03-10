import {Provider} from "./Provider";
import moment = require("moment");
import {Entertainment} from "../reducers/platforms";
import Token from "./Token";
import OauthCodeConfiguration from "./api/oauth/OauthCodeConfiguration";
import {generateTokenWithCode} from "./api/oauth/OauthApi";

const needle = require('needle');

export function generateTokenTodoist(): Promise<Token> {
    const oauthConf = new OauthCodeConfiguration(
        'https://todoist.com/oauth/authorize',
        'https://todoist.com/oauth/access_token',
        'http://localhost',
        'db3bc2e9c84941d1b7d8ef510055c4e7',
        '0d0bb3b20ee743a184a305d24000fbad',
        'data:read');

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

export function entertainmentsTodoist(token: Token): Promise<Entertainment[]> {
    const url = 'https://todoist.com/api/v7/sync?token=' + token.currentToken + '&sync_token=*&resource_types=[%22all%22]';

    return new Promise((resolve, reject) => {
        // The first call always fail, so I make it fail fast at least...
        needle('get', url, {read_timeout: 100, open_timeout: 100}).then((r: any) => {
            resolve(syncToEntertainments(r));
        }).catch((err: any) => {
            console.log('Retry todoist sync');
            needle('get', url).then((r: any) => {
                resolve(syncToEntertainments(r));
            });
        });
    });
}

function syncToEntertainments(response: any): Entertainment[] {
    const end = moment().endOf('day');

    return response.body.items
        .filter((item: any) => {
            const dueDate = item.due_date_utc;
            let ok = dueDate !== null && moment(dueDate) < end;
            return ok;
        })
        .map((item: any) => new Entertainment(Provider.TODOIST, item.id, item.content));
}