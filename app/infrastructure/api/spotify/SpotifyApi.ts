import Token from "../../../domain/store/state/Token"
import OauthApi from "../oauth/OauthApi"
import OauthCodeConfiguration from "../oauth/OauthCodeConfiguration"
import Options from "../http/Options"
import HttpApi from "../http/HttpApi"
import Show from "./Show"
import Shows from "./Shows"
import ShowItem from "./ShowItem"

export default class SpotifyApi {

    private readonly oauthConf: OauthCodeConfiguration

    private readonly baseUrl: string = "https://api.spotify.com/v1"

    constructor() {
        this.oauthConf = {
            codeUrl: 'https://accounts.spotify.com/authorize',
            tokenUrl: 'https://accounts.spotify.com/api/token',
            redirectUrl: 'http://localhost',
            clientId: '55336a5e70514eab9bb0f2cbb41646f2',
            secretId: 'dda08c0665a94c47924ee4d944c66fa4',
            grantType: 'authorization_code',
            scope: 'user-read-playback-position,user-library-read'
        }
    }

    public generateTokenSpotify(): Promise<Token> {
        return new OauthApi().generateTokenWithCode(this.oauthConf)
    }

    refreshToken(token: Token): Promise<Token> {
        return new OauthApi().refresh(this.oauthConf, token)
    }

    public entertainmentsSpotify(token: Token): Promise<Show[]> {
        const http = new HttpApi(this.baseUrl, this.buildOptions(token))
        return http.get("/me/shows")
            .then((shows: Shows) => {
                return Promise.all(
                    shows.items
                        .map((item: ShowItem) => item.show.id)
                        .map((id: string) => http.get('/shows/' + id + '?market=from_token'))
                        .map((show: Promise<Show>) => show)
                )
            })
    }

    private buildOptions(token: Token): Options {
        return {
            headers: {
                Authorization: 'Bearer ' + token.currentToken,
            }
        }
    }
}