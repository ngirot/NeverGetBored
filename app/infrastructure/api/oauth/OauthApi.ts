import uuid = require("uuid")
import moment = require("moment")
import OauthCodeConfiguration from "./OauthCodeConfiguration"
import OauthTokenConfiguration from "./OauthTokenConfiguration"
import OauthResponseToken from "./OauthResponseToken"
import Token from "../../../domain/store/state/Token"
import * as path from "path"

const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
const {OAuth2Provider} = require("electron-oauth-helper")
const needle = require('needle')

export default class OauthApi {

    public generateTokenWithToken(configuration: OauthTokenConfiguration): Promise<Token> {
        const window = this.createOauthWindow()

        const config = {
            client_id: configuration.clientId,
            client_secret: configuration.clientSecret,
            authorize_url: configuration.tokenUrl,
            response_type: "token",
            redirect_uri: configuration.redirectUrl,
            scope: configuration.scope
        }

        const provider = new OAuth2Provider(config)

        return provider.perform(window)
            .then((token: OauthResponseToken) => {
                    console.log('Token : ', token)
                    window.destroy()
                    return new Token(token.access_token)
                }
            )
    }

    refresh(configuration: OauthCodeConfiguration, token: Token): Promise<Token> {
        const payload = {
            refresh_token: token.refreshToken,
            client_id: configuration.clientId,
            client_secret: configuration.secretId,
            grant_type: 'refresh_token'
        }

        return needle('post', configuration.tokenUrl, payload)
            .then((resp: any) => {
                return resp.body
            })
            .then((resp: OauthResponseToken) => {
                const expiration = moment().add(resp.expires_in, 'seconds')
                return new Token(resp.access_token, token.refreshToken, expiration.toDate())
            })
    }

    generateTokenWithCode(configuration: OauthCodeConfiguration): Promise<Token> {
        const self = this
        const window = this.createOauthWindow()

        const state = uuid()

        return new Promise((resolve, reject) => {
            window.webContents.addListener('will-redirect', (event: Event, urlAsString: string) => {
                if (urlAsString.startsWith(configuration.redirectUrl)) {
                    const url = new URL(urlAsString)
                    const code = url.searchParams.get('code')
                    const returnedState = url.searchParams.get('state')
                    console.log('Code = ' + code)

                    if (returnedState !== state) {
                        reject('Security issue, states are not equals : expected ' + state + ' but was ' + returnedState)
                    }

                    const tokenUrl = configuration.tokenUrl + "?"
                        + "client_id=" + configuration.clientId
                        + "&client_secret=" + configuration.secretId
                        + "&code=" + code
                        + "&redirect_uri=" + configuration.redirectUrl
                        + (configuration.grantType ? "&grant_type=" + configuration.grantType : '')

                    self.postTokenUrl(tokenUrl)
                        .then((resp: OauthResponseToken) => {
                            window.destroy()
                            if (resp.expires_in) {
                                const expiration = moment().add(resp.expires_in, 'seconds')
                                resolve(new Token(resp.access_token, resp.refresh_token, expiration.toDate()))
                            } else {
                                resolve(new Token(resp.access_token))
                            }
                        })
                        .catch((err: any) => {
                            window.destroy()
                            reject(err)
                        })
                }
            })

            const baseUrl = configuration.codeUrl + '?'
                + '&client_id=' + configuration.clientId
                + '&state=' + state
                + '&scope=' + configuration.scope
                + "&redirect_uri=" + configuration.redirectUrl
                + "&response_type=code"

            window.loadURL(baseUrl)
        })
    }

    private postTokenUrl(url: string): Promise<OauthResponseToken> {
        return new Promise((resolve, reject) => {
            needle('post', url)
                .then((response: any) => {
                    if (response.statusCode === 200) {
                        resolve(response.body)
                    } else {
                        reject(response.body.message)
                    }

                })
                .catch((err: any) => reject(err))
        })
    }

    /* tslint:disable */
    private createOauthWindow() {
        return new BrowserWindow({
            icon: path.join(__dirname, '/logo.png'),
            width: 600,
            height: 800,
            webPreferences: {
                nodeIntegration: false, // We recommend disabling nodeIntegration for security.
                contextIsolation: true // We recommend enabling contextIsolation for security.
            },
        })
    }
}