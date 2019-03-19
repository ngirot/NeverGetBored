import {actionCreator} from "./helpers";
import {loadProviders} from "../utils/config";
import ProviderState from "../reducers/ProviderState";

export const loadedConfiguration = actionCreator<ProviderState[]>('LOADED_CONFIGURATION');

export function loadConfiguration(): Function {
    return (dispatch: Function) => {
        dispatch(loadedConfiguration(loadProviders()));
    };
}