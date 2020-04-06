import Token from "../../store/state/Token"
import {Provider} from "../../store/state/Provider"
import inject, {Injectable} from "../../../Injector"
import RefreshToken from "../../store/state/RefreshToken"
import {Feedly} from "../../external/port/Feedly"
import {Configuration} from "../../external/port/Configuration"
import ProviderState from "../../store/state/ProviderState"
import RefreshResult from "./RefreshResult"
import {Twitch} from "../../external/port/Twitch"

export function connectToProvider(provider: Provider): Promise<Token> {
    const configuration = inject(Injectable.CONFIGURATION)
    console.log('Try to connect to ' + provider)
    return connectFunction(provider)()
        .then((token: Token) => {
            console.log('Token generated', token)
            configuration.addToken(provider, token)
            return token
        })
        .catch((err) => {
            console.log('Unable to connect to provider: ' + provider, err)
            const notification = inject(Injectable.NOTIFICATION)
            notification.errorMessage("Unable to connect to " + provider, err)
            throw provider
        })
}

export function refreshProviders(providers: ProviderState[]): Promise<RefreshResult[]> {
    const configuration: Configuration = inject(Injectable.CONFIGURATION)

    const refreshed = providers.map((providerState) => {
        if (providerState.token) {
            return refreshTokenFunction(providerState.provider)(providerState.token).then((refresh: RefreshToken): RefreshResult[] => {
                if (refresh.refreshed) {
                    console.log('Save refreshed token', refresh.token)
                    configuration.addToken(providerState.provider, refresh.token)
                }
                return [{token: refresh.token, refreshed: refresh.refreshed, provider: providerState.provider}]
            })
        } else {
            return Promise.resolve([])
        }
    })

    return Promise.all(refreshed)
        .then((result) => {
            return result.reduce((acc, val) => acc.concat(val), [])
        })
}

function refreshTokenFunction(provider: Provider): (token: Token) => Promise<RefreshToken> {
    const buildRefreshFunction = (f: (token: Token) => Promise<RefreshToken>): ((token: Token) => Promise<RefreshToken>) => {
        return (token: Token): Promise<RefreshToken> => {
            if (token.isExpired()) {
                return f(token)
            } else {
                return Promise.resolve({refreshed: false, token: token})
            }
        }
    }

    switch (provider) {
        case Provider.FEEDLY:
            const feedly: Feedly = inject(Injectable.FEEDLY)
            return buildRefreshFunction(feedly.refreshToken)
        case Provider.TWITCH:
            const twitch: Twitch = inject(Injectable.TWITCH)
            return buildRefreshFunction(twitch.refreshToken)
        default:
            return (token: Token) => Promise.resolve({refreshed: false, token: token})
    }
}

function connectFunction(provider: Provider): () => Promise<Token> {
    switch (provider) {
        case Provider.TWITCH:
            const twitch = inject(Injectable.TWITCH)
            return twitch.generateTokenTwitch
        case Provider.TODOIST:
            const todoist = inject(Injectable.TODOIST)
            return todoist.generateTokenTodoist
        case Provider.FEEDLY:
            const feedly = inject(Injectable.FEEDLY)
            return feedly.generateTokenFeedly
        case Provider.GITHUB:
            const github = inject(Injectable.GITHUB)
            return github.generateTokenGithub
        default:
            return () => {
                return new Promise((resolve, reject) => {
                    reject('Provider unknown')
                })
            }
    }
}