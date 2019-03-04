import {IAction} from "../actions/helpers";
import {connect, loaded, loading} from '../actions/platform';
import {Provider} from "../utils/Provider";

export class ProviderState {
    public readonly provider: Provider;
    public readonly token?: string;
    public readonly loading: boolean;

    public constructor(provider: Provider, loading: boolean, token?: string) {
        this.provider = provider;
        this.loading = loading;
        this.token = token;
    }
}

export class Entertainment {
    public readonly id: string;
    public readonly title: string;
    public readonly user: string;
    public readonly url: string;
    public readonly previewUrl?: string;

    public constructor(id: string, title: string, user: string, url: string, previewUrl?: string) {
        this.id = id;
        this.title = title;
        this.user = user;
        this.url = url;
        this.previewUrl = previewUrl;
    }
}

export class PlatformState {

    public readonly providers: ProviderState[];
    public readonly entertainments: Entertainment[];

    constructor(entertainments: Entertainment[], providers: ProviderState[]) {
        this.providers = providers;
        this.entertainments = entertainments;
    }
}

export default function platform(state: PlatformState = new PlatformState([], []), action: IAction) {
    if (connect.test(action)) {
        const listWithoutProvider = state.providers.filter(p => p.provider !== action.payload.provider);
        listWithoutProvider.push(new ProviderState(action.payload.provider, false, action.payload.token));
        return new PlatformState(state.entertainments, listWithoutProvider);
    }

    if (loaded.test(action)) {
        const newList = state.providers.map(p => {
            if (p.provider === action.payload.provider) {
                return new ProviderState(p.provider, false, p.token);
            } else {
                return p;
            }
        });
        return new PlatformState(action.payload.entertainments, newList);
    }

    if (loading.test(action)) {
        const newList = state.providers.map(p => {
            if (p.provider === action.payload) {
                return new ProviderState(p.provider, true, p.token);
            } else {
                return p;
            }
        });
        return new PlatformState(state.entertainments, newList);
    }

    return state;
}