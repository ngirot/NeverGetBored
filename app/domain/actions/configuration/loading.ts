import {actionCreator, DispatcherFunction, DispatchFunction} from "../helpers";
import ProviderState from "../../../reducers/ProviderState";
import {loadProviders} from "../../../utils/config";

export const actionLoadedConfiguration = actionCreator<ProviderState[]>('LOADED_CONFIGURATION');

export function loadConfiguration(): DispatcherFunction {
    return (dispatch: DispatchFunction) => {
        dispatch(actionLoadedConfiguration(loadProviders()));
    };
}