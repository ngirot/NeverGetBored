import {actionCreator} from "./helpers";
import {ProviderState} from "../reducers/platforms";
import {loadProviders} from "../utils/config";

export const loadedConfiguration = actionCreator<ProviderState[]>('LOADED_CONFIGURATION');

export function loadConfiguration(): Function {
    return (dispatch: Function) => {
        dispatch(loadedConfiguration(loadProviders()));
    };
}