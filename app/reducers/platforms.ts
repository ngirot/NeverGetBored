import {IAction} from "../actions/helpers";
import {connect} from '../actions/platform';

export class PlatformState {

    public readonly twitchToken?: string;

    constructor(twitchToken?: string) {
        this.twitchToken = twitchToken;
    }
}

export default function platform(state: PlatformState = new PlatformState(), action: IAction) {
    if (connect.test(action)) {
        return new PlatformState(action.payload);
    } else {
        return state;
    }
}