import OauthCodeConfiguration from "../oauth/OauthCodeConfiguration"
import Token from "../../../domain/store/state/Token"
import OauthApi from "../oauth/OauthApi"
import HttpApi from "../http/HttpApi"
import Options from "../http/Options"
import Notification from "./Notification"

export default class GithubApi {

    private readonly baseUrl: string = 'https://api.github.com'

    private readonly oauthConf: OauthCodeConfiguration

    constructor() {
        this.oauthConf = {
            codeUrl: 'https://github.com/login/oauth/authorize',
            tokenUrl: 'https://github.com/login/oauth/access_token',
            redirectUrl: 'http://localhost',
            clientId: '892dd83ccd71e1f7cf71',
            secretId: '273fb4ae1f23631045c2ec3ad4281809bf63172e',
            scope: 'notifications'
        }
    }

    public generateToken(): Promise<Token> {
        return new OauthApi().generateTokenWithCode(this.oauthConf)
    }

    public loadNotifications(token: Token): Promise<Notification[]> {
        const options: Options = {headers: {Authorization: 'token ' + token.currentToken}}

        const http = new HttpApi(this.baseUrl, options)

        return http.get('/notifications')
            .then(x => {
                console.log('x', x)
                return x
            })
            .then((notifications: Notification[]) => notifications.filter((notification: Notification) => notification.unread))
    }
}