import {actionCreator, DispatcherFunction, DispatchFunction} from "../helpers"
import ProviderState from "../../store/state/ProviderState"
import inject, {Injectable} from "../../../Injector"
import {Configuration} from "../external/Configuration"

export const actionLoadedConfiguration = actionCreator<ProviderState[]>('LOADED_CONFIGURATION')

export function loadConfiguration(): DispatcherFunction {
    const configuration: Configuration = inject(Injectable.CONFIGURATION)
    return (dispatch: DispatchFunction) => {
        dispatch(actionLoadedConfiguration(configuration.loadProviders()))
    }
}