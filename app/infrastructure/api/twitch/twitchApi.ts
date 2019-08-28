import StreamResult from "./StreamResult"
import Stream from "./Stream"
import OauthApi from "../oauth/OauthApi"
import Token from "../../../domain/store/state/Token"
import OauthCodeConfiguration from "../oauth/OauthCodeConfiguration"

const api = require('twitch-api-v5')

export default class TwitchApi {

    private readonly oauthConf: OauthCodeConfiguration

    constructor(clientId: string) {
        api.clientID = clientId

        this.oauthConf = {
            codeUrl: 'https://id.twitch.tv/oauth2/authorize',
            tokenUrl: 'https://id.twitch.tv/oauth2/token',
            redirectUrl: 'http://localhost',
            clientId: clientId,
            secretId: 'rit3ytgutf1571hevdgwno68ohsshv',
            scope: 'openid',
            grantType: 'authorization_code'
        }
    }

    public generateTokenTwitch(): Promise<Token> {
        return new OauthApi().generateTokenWithCode(this.oauthConf)
    }

    refreshToken(token: Token): Promise<Token> {
        return new OauthApi().refresh(this.oauthConf, token)
    }

    public entertainmentsTwitch(token: Token): Promise<Stream[]> {
        return new Promise((resolve, reject) => {

            const streamCallback = (error: any, streamResult: StreamResult) => {
                if (error) {
                    console.log('Unable to load streams from Twitch', error)
                    reject('Unable to load streams from Twitch')
                }
                if (streamResult.message) {
                    console.log('Unable to call Twitch', streamResult.message)
                    reject('Unable to call Twitch: ' + streamResult.message)
                }
                resolve(streamResult.streams)
            }

            api.streams.followed({auth: token.currentToken, stream_type: 'live'}, streamCallback)
        })
    }
}