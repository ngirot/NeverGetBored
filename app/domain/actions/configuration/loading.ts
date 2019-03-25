import {actionCreator, DispatcherFunction, DispatchFunction} from "../helpers";
import {loadProviders} from "../../../utils/config";
import ProviderState from "../../store/state/ProviderState";

export const actionLoadedConfiguration = actionCreator<ProviderState[]>('LOADED_CONFIGURATION');

export function loadConfiguration(): DispatcherFunction {
    return (dispatch: DispatchFunction) => {
        dispatch(actionLoadedConfiguration(loadProviders()));
    };
}