import {actionCreator} from "./helpers";
import {Configuration, load} from "../utils/config";

export const loadedConfiguration = actionCreator<Configuration>('LOADED_CONFIGURATION');

export function loadConfiguration(): Function {
    return (dispatch: Function) => {
        dispatch(loadedConfiguration(load()));
    };
}