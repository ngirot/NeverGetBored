import Token from "../../../reducers/Token";
import SyncResult from "./SyncResult";
import Item from "./Item";
import OauthCodeConfiguration from "../oauth/OauthCodeConfiguration";
import HttpApi from "../http/HttpApi";
import OauthApi from "../oauth/OauthApi";

export default class TodoistApi {

    private readonly baseUrl = 'https://todoist.com';

    generateTokenTodoist(): Promise<Token> {
        const oauthConf: OauthCodeConfiguration = {
            codeUrl: this.baseUrl + '/oauth/authorize',
            tokenUrl: this.baseUrl + '/oauth/access_token',
            redirectUrl: 'http://localhost',
            clientId: 'db3bc2e9c84941d1b7d8ef510055c4e7',
            secretId: '0d0bb3b20ee743a184a305d24000fbad',
            scope: 'data:read'
        };

        return new OauthApi().generateTokenWithCode(oauthConf);
    }

    entertainmentsTodoist(token: Token): Promise<Item[]> {
        const http = new HttpApi(this.baseUrl);

        const syncPath = '/api/v7/sync?token=' + token.currentToken + '&sync_token=*&resource_types=[%22all%22]';
        return new Promise((resolve, reject) => {
            // The first call always fail, so I make it fail fast at least...
            http.get(syncPath, {read_timeout: 100, open_timeout: 100})
                .then((syncResult: SyncResult) => {
                    resolve(syncResult.items);
                })
                .catch(() => {
                    http.get(syncPath)
                        .then((syncResult: SyncResult) => {
                            resolve(syncResult.items);
                        })
                        .catch(reject);
                });

        });
    }
}