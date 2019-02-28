import generateToken from "../utils/twitch";
import {connect} from "./platform";

export function connectToTwitch(): Function {
    console.log('Try to connect to Twitch');
    return (dispatch: Function) => {
        generateToken().then((token => {
            console.log('Token generated : ' + token);
            dispatch(connect(token));
        }));
    };
}