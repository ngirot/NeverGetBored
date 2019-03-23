import {actionCreator} from "./helpers";
import {Provider} from "../reducers/Provider";
import Token from "../reducers/Token";
import Entertainment from "../reducers/Entertainment";

export class ConnectionAction {
    public readonly provider: Provider;
    public readonly token: Token;

    constructor(provider: Provider, token: Token) {
        this.provider = provider;
        this.token = token;
    }
}

export class EntertainmentLoaded {
    public readonly provider: Provider;
    public readonly entertainments: Entertainment[];

    constructor(provider: Provider, entertainments: Entertainment[]) {
        this.provider = provider;
        this.entertainments = entertainments;
    }
}

export const connect = actionCreator<ConnectionAction>('CONNECT_TO_PROVIDER');
export const connectFailed = actionCreator<Provider>('CONNECT_TO_PROVIDER_FAILED');
export const loading = actionCreator<Provider>('LOADING_ENTERTAINMENT_FROM_PROVIDER');
export const loaded = actionCreator<EntertainmentLoaded>('LOADED_ENTERTAINMENT_FROM_PROVIDER');
export const removedEntertainment = actionCreator<Entertainment>('REMOVED_ENTERTAINMENT');
