import {actionCreator, DispatcherFunction, DispatchFunction} from "../helpers";
import EntertainmentLoadedPayload from "./EntertainmentLoadedPayload";
import {addToken} from "../../../utils/config";
import {actionConnectToProvider} from "../platform/connect";
import ConnectionSuccessPayload from "../platform/ConnectionSuccessPayload";
import {errorMessage} from "../../../utils/notification";
import {entertainmentsFeedly, refreshToken} from "../../../utils/feedly";
import EntertainmentLoaded from "./EntertainmentLoadedPayload";
import {entertainmentsTwitch} from "../../../utils/twitch";
import {entertainmentsTodoist} from "../../../utils/todoist";
import RefreshToken from "../../store/state/RefreshToken";
import Entertainment from "../../store/state/Entertainment";
import Token from "../../store/state/Token";
import ProviderState from "../../store/state/ProviderState";
import {Provider} from "../../store/state/Provider";

export const actionLoadingEntertainments = actionCreator<Provider>('LOADING_ENTERTAINMENT_FROM_PROVIDER');
export const actionLoadedEntertainments = actionCreator<EntertainmentLoadedPayload>('LOADED_ENTERTAINMENT_FROM_PROVIDER');

export function reloadAll(providerStates: ProviderState[]): DispatcherFunction {
    return (dispatch: DispatchFunction) => {
        providerStates.forEach(ps => {
            if (ps.token) {
                loadEntertainments(ps.provider, dispatch, loadFunction(ps.provider), ps.token);
            }
        });
    };
}

function loadFunction(provider: Provider): (token: Token) => Promise<Entertainment[]> {
    switch (provider) {
        case Provider.TWITCH:
            return entertainmentsTwitch;
        case Provider.TODOIST:
            return entertainmentsTodoist;
        case Provider.FEEDLY:
            return entertainmentsFeedly;
        default:
            return () => {
                return new Promise((resolve, reject) => {
                    reject('Provider unknown');
                });
            };
    }
}

function loadEntertainments(provider: Provider, dispatch: Function, loadingFunction: (token: Token) => Promise<Entertainment[]>, token: Token) {
    dispatch(actionLoadingEntertainments(provider));
    refreshTokenFunction(provider)(token)
        .then((refresh: RefreshToken) => {
            if (refresh.refreshed) {
                console.log('Save refreshed token', refresh.token);
                addToken(provider, refresh.token);
                dispatch(actionConnectToProvider(new ConnectionSuccessPayload(provider, refresh.token)));
            }
            return refresh.token;
        })
        .then(loadingFunction)
        .then((e) => {
            console.log('Streams', e);
            dispatch(actionLoadedEntertainments(new EntertainmentLoaded(provider, e)));
        })
        .catch((err) => {
            errorMessage("Failed to load entertainments for " + provider, err);
        });
}

function refreshTokenFunction(provider: Provider): (token: Token) => Promise<RefreshToken> {
    const buildRefreshFunction = (f: (token: Token) => Promise<RefreshToken>): ((token: Token) => Promise<RefreshToken>) => {
        return (token: Token): Promise<RefreshToken> => {
            if (token.isExpired()) {
                return f(token);
            } else {
                return Promise.resolve({refreshed: false, token: token});
            }
        };
    };

    switch (provider) {
        case Provider.FEEDLY:
            return buildRefreshFunction(refreshToken);
        default:
            return (token: Token) => Promise.resolve({refreshed: false, token: token});
    }

}