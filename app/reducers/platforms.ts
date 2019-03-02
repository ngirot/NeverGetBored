import {IAction} from "../actions/helpers";
import {connect, loaded, loading} from '../actions/platform';

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

    public readonly twitchToken?: string;

    public readonly twitchLoading: boolean;

    public readonly entertainments: Entertainment[];

    constructor(entertainments: Entertainment[], twitchLoading: boolean, twitchToken?: string) {
        this.twitchToken = twitchToken;
        this.entertainments = entertainments;
        this.twitchLoading = twitchLoading;
    }
}

export default function platform(state: PlatformState = new PlatformState([], false), action: IAction) {
    if (connect.test(action)) {
        console.log('>>>1 ', state);
        return new PlatformState(state.entertainments, state.twitchLoading, action.payload);
    }

    if (loaded.test(action)) {
        console.log('>>>2 ', action);
        return new PlatformState(action.payload, false, state.twitchToken);
    }

    if (loading.test(action)) {
        console.log('>>>3 ', state);
        return new PlatformState(state.entertainments, true, state.twitchToken);
    }

    return state;
}