import {actionCreator, DispatcherFunction, DispatchFunction} from "../helpers"
import ProviderState from "../../store/state/ProviderState"
import inject, {Injectable} from "../../../Injector"

export const actionLoadedConfiguration = actionCreator<ProviderState[]>('LOADED_CONFIGURATION')

export function loadConfiguration(): DispatcherFunction {
    const configuration = inject(Injectable.CONFIGURATION)
    return (dispatch: DispatchFunction) => {
        dispatch(actionLoadedConfiguration(configuration.loadProviders()))
    }
}