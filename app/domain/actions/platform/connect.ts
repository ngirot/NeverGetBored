import {actionCreator, DispatcherFunction, DispatchFunction} from "../helpers";
import {Provider} from "../../../reducers/Provider";
import ConnectionSuccessPayload from "./ConnectionSuccessPayload";
import Token from "../../../reducers/Token";
import {addToken} from "../../../utils/config";
import {errorMessage} from "../../../utils/notification";
import {generateTokenTwitch} from "../../../utils/twitch";
import {generateTokenTodoist} from "../../../utils/todoist";
import {generateTokenFeedly} from "../../../utils/feedly";

export const actionConnectToProvider = actionCreator<ConnectionSuccessPayload>('CONNECT_TO_PROVIDER');
export const actionConnectionToProviderFailed = actionCreator<Provider>('CONNECT_TO_PROVIDER_FAILED');

export function connectToProvider(provider: Provider): DispatcherFunction {
    console.log('Try to connect to ' + provider);
    return (dispatch: DispatchFunction) => {
        connectFunction(provider)()
            .then(((token: Token) => {
                console.log('Token generated', token);
                dispatch(actionConnectToProvider(new ConnectionSuccessPayload(provider, token)));
                addToken(provider, token);
            }))
            .catch((err) => {
                console.log('Unable to connect to provider: ' + provider, err);
                errorMessage("Unable to connect to " + provider, err);
                dispatch(actionConnectionToProviderFailed(provider));
            });
    };
}

function connectFunction(provider: Provider): () => Promise<Token> {
    switch (provider) {
        case Provider.TWITCH:
            return generateTokenTwitch;
        case Provider.TODOIST:
            return generateTokenTodoist;
        case Provider.FEEDLY:
            return generateTokenFeedly;
        default:
            return () => {
                return new Promise((resolve, reject) => {
                    reject('Provider unknown');
                });
            };
    }
}