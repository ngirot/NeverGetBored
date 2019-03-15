import {entertainmentsTwitch, generateTokenTwitch} from "../utils/twitch";
import {entertainmentsTodoist, generateTokenTodoist} from "../utils/todoist";
import {connect, ConnectionAction, EntertainmentLoaded, loaded, loading, removedEntertainment} from "./platform";
import {Provider} from "../utils/Provider";
import {Entertainment, ProviderState} from "../reducers/platforms";
import {entertainmentsFeedly, generateTokenFeedly} from "../utils/feedly";
import Token from "../utils/Token";
import {DispatcherFunction} from "./helpers";
import {addToken} from "../utils/config";

export function connectToProvider(provider: Provider): DispatcherFunction {
    console.log('Try to connect to ' + provider);
    const c = connectFunction(provider);
    const l = loadFunction(provider);

    return (dispatch: Function) => {
        c().then(((token: Token) => {
            console.log('Token generated', token);
            dispatch(connect(new ConnectionAction(provider, token)));
            addToken(provider, token);
            loadEntertainments(provider, dispatch, l, token);
        }));
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

function loadEntertainments(provider: Provider, dispatch: Function, loadingFunction: (token: Token) => Promise<Entertainment[]>, token: Token) {
    dispatch(loading(provider));
    loadingFunction(token).then((e) => {
        console.log('Streams', e);
        dispatch(loaded(new EntertainmentLoaded(provider, e)));
    });
}

export function removeContent(entertainment: Entertainment) {
    return (dispatch: Function) => {
        dispatch(removedEntertainment(entertainment));
    };
}
