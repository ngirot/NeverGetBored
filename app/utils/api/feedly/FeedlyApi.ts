import Token from "../../Token";
import OauthCodeConfiguration from "../oauth/OauthCodeConfiguration";
import Profile from "./Profile";
import Contents from "./Contents";
import Item from "./Item";
import HttpApi from "../http/HttpApi";
import Marker from "./Marker";
import Options from "../http/Options";
import OauthApi from "../oauth/OauthApi";

export default class FeedlyApi {

    private readonly baseUrl = 'https://cloud.feedly.com';

    generateTokenFeedly(): Promise<Token> {
        const oauthConf: OauthCodeConfiguration = {
            codeUrl: this.baseUrl + '/v3/auth/auth',
            tokenUrl: this.baseUrl + '/v3/auth/token',
            redirectUrl: 'http://localhost',
            clientId: 'boutroue',
            secretId: 'FE012EGICU4ZOBDRBEOVAJA1JZYH',
            scope: this.baseUrl + '/subscriptions',
            grantType: 'authorization_code'
        };

        return new OauthApi().generateTokenWithCode(oauthConf);
    }

    entertainmentsFeedly(token: Token): Promise<Item[]> {
        const http = new HttpApi(this.baseUrl, this.buildOptions(token));

        return http.get('/v3/profile')
            .then((profile: Profile) => http.get(this.buildContentPath(profile.id)))
            .then((contents: Contents) => contents.items);
    }

    markAsRead(id: string, token: Token): Promise<boolean> {
        const http = new HttpApi(this.baseUrl, this.buildOptions(token));

        const marker: Marker = {action: 'markAsRead', type: 'entries', entryIds: [id]};

        return http.post('/v3/markers', marker)
            .then(() => true)
            .catch(() => false);
    }

    private buildContentPath(profileId: string): string {
        return '/v3/streams/contents'
            + '?streamId=user/' + profileId + '/category/global.all'
            + '&unreadOnly=true';
    }

    private buildOptions(token: Token): Options {
        return {headers: {Authorization: 'OAuth ' + token.currentToken, 'Content-Type': 'application/json'}};
    }
}