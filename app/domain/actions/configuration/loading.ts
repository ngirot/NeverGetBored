import {actionCreator, IActionWithPayload} from "../helpers"
import ProviderState from "../../store/state/ProviderState"
import inject, {Injectable} from "../../../Injector"

export const actionLoadedConfiguration = actionCreator<ProviderState[]>('LOADED_CONFIGURATION')

export function loadConfiguration(): IActionWithPayload<ProviderState[]> {
    const configuration = inject(Injectable.CONFIGURATION)
    return actionLoadedConfiguration(configuration.loadProviders())
}