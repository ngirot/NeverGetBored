import uuid = require("uuid")
import moment = require("moment")
import OauthCodeConfiguration from "./OauthCodeConfiguration"
import OauthResponseToken from "./OauthResponseToken"
import Token from "../../../domain/store/state/Token"
import * as path from "path"
import {remote} from 'electron'

const needle = require('needle')

export default class OauthApi {

    refresh(configuration: OauthCodeConfiguration, token: Token): Promise<Token> {
        const payload = {
            refresh_token: token.refreshToken,
            client_id: configuration.clientId,
            client_secret: configuration.secretId,
            grant_type: 'refresh_token'
        }

        return needle('post', configuration.tokenUrl, payload)
            .then((resp: any) => resp.body as OauthResponseToken)
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

            const catchTokenFromUrlFunction = (urlAsString: string): void => {
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

                        if (resp.access_token == null) {
                            console.log('No access token in payload', resp)
                            reject('No access token provided')
                        }

                        if (!resp.access_token) {
                            console.log('Token generation failed', resp)
                            reject('Unable to get an access token')
                        }

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

            window.webContents.addListener('did-redirect-navigation', () => {
                window.webContents.executeJavaScript(`new Promise(function(resolve) {resolve(document.head.innerHTML)})`)
                    .then((headTag: string) => {
                        this.extractRedirectUrlFromHead(headTag, catchTokenFromUrlFunction)
                    })
            })

            window.webContents.addListener('will-redirect', (event: Event, urlAsString: string) => {
                if (urlAsString.startsWith(configuration.redirectUrl)) {
                    catchTokenFromUrlFunction(urlAsString)
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
            const options = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            needle('post', url, {}, options)
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
        return new remote.BrowserWindow({
            icon: path.join(__dirname, '/logo.png'),
            width: 600,
            height: 800,
            webPreferences: {
                nodeIntegration: false, // We recommend disabling nodeIntegration for security.
                contextIsolation: true // We recommend enabling contextIsolation for security.
            },
        })
    }

    private extractUrlFromContentAttribut(attributeValue: string): string {
        const urlPosition = attributeValue.toUpperCase().indexOf('URL=')
        const separatorLength = 'URL='.length
        return attributeValue.substr(urlPosition + separatorLength)
    }

    private extractRedirectUrlFromHead(headTagContent: string, callback: (url: string) => void): void {
        const dom = new DOMParser().parseFromString(headTagContent, "text/html")
        const refreshHeader = dom.querySelector('meta[http-equiv="refresh"]')
        if (refreshHeader) {
            const contentAttribute = refreshHeader.attributes.getNamedItem('content')
            if (contentAttribute && contentAttribute.value) {
                const url = this.extractUrlFromContentAttribut(contentAttribute.value)
                callback(url)
            }
        }
    }

}