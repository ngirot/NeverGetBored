import {IAction} from "../actions/helpers";
import {connect, loaded, loading} from '../actions/platform';
import {Provider} from "../utils/Provider";
import {Configuration, save, TokenConfiguration} from "../utils/config";
import {loadedConfiguration} from "../actions/configuration";

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
    public readonly provider: Provider;
    public readonly id: string;
    public readonly title: string;
    public readonly user?: string;
    public readonly url?: string;
    public readonly previewUrl?: string;

    public constructor(provider: Provider, id: string, title: string, user?: string, url?: string, previewUrl?: string) {
        this.provider = provider;
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

        save(convert(listWithoutProvider));

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
        const newEntertainments = state.entertainments.filter(e => e.provider !== action.payload.provider);
        newEntertainments.push(...action.payload.entertainments);
        return new PlatformState(newEntertainments, newList);
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

    if (loadedConfiguration.test(action)) {
        const providerState = action.payload.tokens.map(conf =>
            new ProviderState(Provider[conf.provider as keyof typeof Provider], false, conf.token));
        return new PlatformState(state.entertainments, providerState);
    }

    return state;
}

function convert(state: ProviderState[]) {
    const tokens = state
        .filter(p => p.token)
        .map(p => {
            let tokenConfiguration = new TokenConfiguration();
            tokenConfiguration.provider = Provider[p.provider];
            tokenConfiguration.token = '' + p.token;
            return tokenConfiguration;

        });

    const conf = new Configuration();
    conf.tokens = tokens;

    return conf;
}