import {entertainmentsTwitch, generateTokenTwitch} from "../utils/twitch";
import {entertainmentsTodoist, generateTokenTodoist} from "../utils/todoist";
import {
    connect,
    connectFailed,
    ConnectionAction,
    EntertainmentLoaded,
    loaded,
    loading,
    removedEntertainment
} from "./platform";
import {Provider} from "../reducers/Provider";
import {entertainmentsFeedly, generateTokenFeedly, refreshToken} from "../utils/feedly";
import Token from "../reducers/Token";
import {DispatcherFunction} from "./helpers";
import {addToken} from "../utils/config";
import Entertainment from "../reducers/Entertainment";
import ProviderState from "../reducers/ProviderState";
import RefreshToken from "../reducers/RefreshToken";

export function connectToProvider(provider: Provider): DispatcherFunction {
    console.log('Try to connect to ' + provider);
    return (dispatch: Function) => {
        connectFunction(provider)()
            .then(((token: Token) => {
                console.log('Token generated', token);
                dispatch(connect(new ConnectionAction(provider, token)));
                addToken(provider, token);
            }))
            .catch((err) => {
                console.log('Unable to connect to provider: ' + provider, err);
                dispatch(connectFailed(provider));
            });
    };
}

export function reloadAll(providerStates: ProviderState[]): DispatcherFunction {
    return (dispatch: Function) => {
        providerStates.forEach(ps => {
            if (ps.token) {
                loadEntertainments(ps.provider, dispatch, loadFunction(ps.provider), ps.token);
            }
        });
    };
}

function connectFunction(provider: Provider): () => Promise<Token> {
    switch (provider) {
        case Provider.TWITCH:
            return generateTokenTwitch;
        case Provider.TODOIST:
            return generateTokenTodoist;
        case Provider.FEEDLY:
            return generateTokenFeedly;
        default:
            return () => {
                return new Promise((resolve, reject) => {
                    reject('Provider unknown');
                });
            };
    }
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

function refreshTokenFunction(provider: Provider): (token: Token) => Promise<RefreshToken> {
    const buildRefreshFunction = (f: (token: Token) => Promise<RefreshToken>): ((token: Token) => Promise<RefreshToken>) => {
        return (token: Token): Promise<RefreshToken> => {
            if (token.isExpired()) {
                return f(token);
            } else {
                return Promise.resolve({refreshed: false, token: token});
            }
        };
    }

    switch (provider) {
        case Provider.FEEDLY:
            return buildRefreshFunction(refreshToken);
        default:
            return (token: Token) => Promise.resolve({refreshed: false, token: token});
    }

}

function loadEntertainments(provider: Provider, dispatch: Function, loadingFunction: (token: Token) => Promise<Entertainment[]>, token: Token) {
    dispatch(loading(provider));
    refreshTokenFunction(provider)(token)
        .then((refresh: RefreshToken) => {
            if (refresh.refreshed) {
                console.log('Save refreshed token', refresh.token);
                addToken(provider, refresh.token);
                dispatch(connect(new ConnectionAction(provider, refresh.token)));
            }
            return refresh.token;
        })
        .then(loadingFunction)
        .then((e) => {
            console.log('Streams', e);
            dispatch(loaded(new EntertainmentLoaded(provider, e)));
        });
}

export function removeContent(entertainment: Entertainment) {
    return (dispatch: Function) => {
        dispatch(removedEntertainment(entertainment));
    };
}
