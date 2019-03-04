import {entertainmentsTwitch, generateTokenTwitch} from "../utils/twitch";
import {generateTokenTodoist} from "../utils/todoist";
import {connect, ConnectionAction, EntertainmentLoaded, loaded, loading} from "./platform";
import {Provider} from "../utils/Provider";
import {Entertainment, ProviderState} from "../reducers/platforms";

export function connectToProvider(provider: Provider): Function {
    console.log('Try to connect to ' + provider);
    const c = connectFunction(provider);
    const l = loadFunction(provider);

    return (dispatch: Function) => {
        c().then((token => {
            console.log('Token generated', token);
            dispatch(connect(new ConnectionAction(provider, token)));
            loadEntertainments(provider, dispatch, l, token);
        }));
    };
}

export function reloadAll(providerStates: ProviderState[]): Function {
    return (dispatch: Function) => {
        providerStates.forEach(ps => {
            if (ps.token) {
                loadEntertainments(ps.provider, dispatch, loadFunction(ps.provider), ps.token);
            }
        });
    };
}

function connectFunction(provider: Provider): () => Promise<string> {
    switch (provider) {
        case Provider.TWITCH:
            return generateTokenTwitch;
        case Provider.TODOIST:
            return generateTokenTodoist;
    }

    return () => {
        return new Promise((resolve, reject) => {
            reject('Provider unknown');
        });
    };
}

function loadFunction(provider: Provider): (token: string) => Promise<Entertainment[]> {
    switch (provider) {
        case Provider.TWITCH:
            return entertainmentsTwitch;
    }

    return () => {
        return new Promise((resolve, reject) => {
            reject('Provider unknown');
        });
    };
}

function loadEntertainments(provider: Provider, dispatch: Function, loadingFunction: (token: string) => Promise<Entertainment[]>, token: string) {
    dispatch(loading(provider));
    loadingFunction(token).then((e) => {
        console.log('Streams', e);
        dispatch(loaded(new EntertainmentLoaded(provider, e)));
    });
}
