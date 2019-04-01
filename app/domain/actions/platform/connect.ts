import {actionCreator, DispatcherFunction, DispatchFunction} from "../helpers";
import ConnectionSuccessPayload from "./ConnectionSuccessPayload";
import Token from "../../store/state/Token";
import {Provider} from "../../store/state/Provider";
import {Configuration} from "../external/Configuration";
import inject, {Injectable} from "../../../Injector";
import {Notifi} from "../external/Notifi";
import {Twitch} from "../external/Twitch";
import {Todoist} from "../external/Todoist";
import {Feedly} from "../external/Feedly";

export const actionConnectToProvider = actionCreator<ConnectionSuccessPayload>('CONNECT_TO_PROVIDER');
export const actionConnectionToProviderFailed = actionCreator<Provider>('CONNECT_TO_PROVIDER_FAILED');

export function connectToProvider(provider: Provider): DispatcherFunction {
    const configuration: Configuration = inject(Injectable.CONFIGURATION);
    console.log('Try to connect to ' + provider);
    return (dispatch: DispatchFunction) => {
        connectFunction(provider)()
            .then(((token: Token) => {
                console.log('Token generated', token);
                dispatch(actionConnectToProvider(new ConnectionSuccessPayload(provider, token)));
                configuration.addToken(provider, token);
            }))
            .catch((err) => {
                console.log('Unable to connect to provider: ' + provider, err);
                const notification: Notifi = inject(Injectable.NOTIFICATION);
                notification.errorMessage("Unable to connect to " + provider, err);
                dispatch(actionConnectionToProviderFailed(provider));
            });
    };
}

function connectFunction(provider: Provider): () => Promise<Token> {
    switch (provider) {
        case Provider.TWITCH:
            const twitch: Twitch = inject(Injectable.TWITCH);
            return twitch.generateTokenTwitch;
        case Provider.TODOIST:
            const todoist: Todoist = inject(Injectable.TODOIST);
            return todoist.generateTokenTodoist;
        case Provider.FEEDLY:
            const feedly: Feedly = inject(Injectable.FEEDLY);
            return feedly.generateTokenFeedly;
        default:
            return () => {
                return new Promise((resolve, reject) => {
                    reject('Provider unknown');
                });
            };
    }
}