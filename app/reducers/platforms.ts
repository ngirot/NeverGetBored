import {IAction} from "../actions/helpers";
import {connect, load} from '../actions/platform';

export class Entertainment {
    public readonly id: string;
    public readonly title: string;
    public readonly user: string;

    public constructor(id: string, title: string, user: string) {
        this.id = id;
        this.title = title;
        this.user = user;
    }
}

export class PlatformState {

    public readonly twitchToken?: string;

    public readonly entertainments: Entertainment[];

    constructor(entertainments: Entertainment[], twitchToken?: string, ) {
        this.twitchToken = twitchToken;
        this.entertainments = entertainments;
    }
}

export default function platform(state: PlatformState = new PlatformState([]), action: IAction) {
    if (connect.test(action)) {
        return new PlatformState(state.entertainments, action.payload);
    }
    if (load.test(action)) {
        return new PlatformState(action.payload, state.twitchToken);
    } else {
        return state;
    }
}