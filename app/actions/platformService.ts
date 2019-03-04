import {entertainmentsTwitch, generateTokenTwitch} from "../utils/twitch";
import {connect, loaded, loading} from "./platform";

function loadEntertainments(dispatch: Function, token: string) {
    dispatch(loading())
    entertainmentsTwitch(token).then((e) => {
        console.log('Streams', e);
        dispatch(loaded(e));
    });
}

export function connectToTwitch(): Function {
    console.log('Try to connect to Twitch');
    return (dispatch: Function) => {
        generateTokenTwitch().then((token => {
            console.log('Token generated', token);
            dispatch(connect(token));
            loadEntertainments(dispatch, token);
        }));
    };
}

export function reloadAll(token: string): Function {
    return (dispatch: Function) => {
        loadEntertainments(dispatch, token);
    };
}