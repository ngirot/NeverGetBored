import {entertainments, generateToken} from "../utils/twitch";
import {connect, load} from "./platform";

export function connectToTwitch(): Function {
    console.log('Try to connect to Twitch');
    return (dispatch: Function) => {
        generateToken().then((token => {
            console.log('Token generated', token);
            dispatch(connect(token));
            entertainments(token).then((e) => {
                console.log('Streams', e);
                dispatch(load(e));
            });
        }));
    };
}