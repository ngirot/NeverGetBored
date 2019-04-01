import {actionCreator, DispatcherFunction, DispatchFunction} from "../helpers"
import EntertainmentLoadedPayload from "./EntertainmentLoadedPayload"
import EntertainmentLoaded from "./EntertainmentLoadedPayload"
import {actionConnectToProvider} from "../platform/connect"
import ConnectionSuccessPayload from "../platform/ConnectionSuccessPayload"
import RefreshToken from "../../store/state/RefreshToken"
import Entertainment from "../../store/state/Entertainment"
import Token from "../../store/state/Token"
import ProviderState from "../../store/state/ProviderState"
import {Provider} from "../../store/state/Provider"
import {Configuration} from "../../external/Configuration"
import inject, {Injectable} from "../../../Injector"
import {Notifi} from "../../external/Notifi"
import {Twitch} from "../../external/Twitch"
import {Todoist} from "../../external/Todoist"
import {Feedly} from "../../external/Feedly"

export const actionLoadingEntertainments = actionCreator<Provider>('LOADING_ENTERTAINMENT_FROM_PROVIDER')
export const actionLoadedEntertainments = actionCreator<EntertainmentLoadedPayload>('LOADED_ENTERTAINMENT_FROM_PROVIDER')

export function reloadAll(providerStates: ProviderState[]): DispatcherFunction {
    return (dispatch: DispatchFunction) => {
        providerStates.forEach(ps => {
            if (ps.token) {
                loadEntertainments(ps.provider, dispatch, loadFunction(ps.provider), ps.token)
            }
        })
    }
}

function loadFunction(provider: Provider): (token: Token) => Promise<Entertainment[]> {
    switch (provider) {
        case Provider.TWITCH:
            const twitch: Twitch = inject(Injectable.TWITCH)
            return twitch.entertainmentsTwitch
        case Provider.TODOIST:
            const todoist: Todoist = inject(Injectable.TODOIST)
            return todoist.entertainmentsTodoist
        case Provider.FEEDLY:
            const feedly: Feedly = inject(Injectable.FEEDLY)
            return feedly.entertainmentsFeedly
        default:
            return () => {
                return new Promise((resolve, reject) => {
                    reject('Provider unknown')
                })
            }
    }
}

function loadEntertainments(provider: Provider, dispatch: Function, loadingFunction: (token: Token) => Promise<Entertainment[]>, token: Token) {
    dispatch(actionLoadingEntertainments(provider))
    refreshTokenFunction(provider)(token)
        .then((refresh: RefreshToken) => {
            if (refresh.refreshed) {
                console.log('Save refreshed token', refresh.token)
                const configuration: Configuration = inject(Injectable.CONFIGURATION)
                configuration.addToken(provider, refresh.token)
                dispatch(actionConnectToProvider(new ConnectionSuccessPayload(provider, refresh.token)))
            }
            return refresh.token
        })
        .then(loadingFunction)
        .then((e) => {
            console.log('Streams', e)
            dispatch(actionLoadedEntertainments(new EntertainmentLoaded(provider, e)))
        })
        .catch((err) => {
            const notification: Notifi = inject(Injectable.NOTIFICATION)
            notification.errorMessage("Failed to load entertainments for " + provider, err)
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
        default:
            return (token: Token) => Promise.resolve({refreshed: false, token: token})
    }

}