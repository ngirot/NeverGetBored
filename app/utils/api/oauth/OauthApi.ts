import uuid = require("uuid");
import moment = require("moment");
import Token from "../../Token";
import createOauthWindow from "../../window";
import OauthCodeConfiguration from "./OauthCodeConfiguration";
import OauthTokenConfiguration from "./OauthTokenConfiguration";
import {postTokenUrl} from "../http/HttpApi";
import HttpResponseToken from "../http/HttpResponseToken";

const {OAuth2Provider} = require("electron-oauth-helper");

export function generateTokenWithToken(configuration: OauthTokenConfiguration): Promise<Token> {
    const window = createOauthWindow();

    const config = {
        client_id: configuration.clientId,
        client_secret: configuration.clientSecret,
        authorize_url: configuration.tokenUrl,
        response_type: "token",
        redirect_uri: configuration.redirectUrl,
        scope: configuration.scope
    };

    const provider = new OAuth2Provider(config);

    return provider.perform(window)
        .then((token: HttpResponseToken) => {
                console.log('Token : ', token);
                window.destroy();
                return new Token(token.access_token);
            }
        );
}

export function generateTokenWithCode(configuration: OauthCodeConfiguration): Promise<Token> {

    const window = createOauthWindow();

    const state = uuid();

    return new Promise((resolve, reject) => {

        window.webContents.addListener('will-redirect', function (event: Event, urlAsString: string) {
            if (urlAsString.startsWith(configuration.redirectUrl)) {
                const url = new URL(urlAsString);
                const code = url.searchParams.get('code');
                const returnedState = url.searchParams.get('state');
                console.log('Code = ' + code);

                if (returnedState !== state) {
                    reject('Security issue, states are not equals : expected ' + state + ' but was ' + returnedState);
                }

                const tokenUrl = configuration.tokenUrl + "?"
                    + "client_id=" + configuration.clientId
                    + "&client_secret=" + configuration.secretId
                    + "&code=" + code
                    + "&redirect_uri=" + configuration.redirectUrl
                    + (configuration.grantType ? "&grant_type=" + configuration.grantType : '');

                postTokenUrl(tokenUrl)
                    .then(function (resp: HttpResponseToken) {
                        window.destroy();
                        if (resp.expires_in) {
                            const expiration = moment().add(resp.expires_in, 'seconds');
                            resolve(new Token(resp.access_token, resp.refresh_token, expiration.toDate()));
                        } else {
                            resolve(new Token(resp.access_token));
                        }
                    })
                    .catch(function (err: any) {
                        console.error('e => ', err);
                        window.destroy();
                        reject(err);
                    });
            }
        });

        const baseUrl = configuration.codeUrl + '?'
            + '&client_id=' + configuration.clientId
            + '&state=' + state
            + '&scope=' + configuration.scope
            + "&redirect_uri=" + configuration.redirectUrl
            + "&response_type=code";
        window.loadURL(baseUrl);
    });
}