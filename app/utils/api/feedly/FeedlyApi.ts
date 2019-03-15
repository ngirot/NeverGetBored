import Token from "../../Token";
import OauthCodeConfiguration from "../oauth/OauthCodeConfiguration";
import {generateTokenWithCode} from "../oauth/OauthApi";
import Profile from "./Profile";
import Contents from "./Contents";
import Item from "./Item";
import HttpApi from "../http/HttpApi";
import Marker from "./Marker";
import Options from "../http/Options";

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

        return generateTokenWithCode(oauthConf);
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