import {IAction} from "../../actions/helpers"
import {actionRemovedEntertainment} from "../../actions/entertainment/remove"
import Entertainment from "../state/Entertainment"
import PlatformState from "../state/PlatformState"
import ProviderState from "../state/ProviderState"
import {actionLoadedConfiguration} from "../../external/adapter/ConfigurationDispatcher"
import {actionConnectionToProviderFailed, actionConnectToProvider} from "../../external/adapter/PlatformDispatcher"
import {actionLoadedEntertainments, actionLoadingEntertainments} from "../../external/adapter/EntertainmentDispatcher"

export default function platformsReducer(state: PlatformState = new PlatformState([], [], false), action: IAction): PlatformState {
    if (actionConnectToProvider.test(action)) {
        const listWithoutProvider = state.providers.filter(p => p.provider !== action.payload.provider)
        listWithoutProvider.push(new ProviderState(action.payload.provider, false, action.payload.token))

        return new PlatformState(state.entertainments, listWithoutProvider, state.reloading)
    }

    if (actionConnectionToProviderFailed.test(action)) {
        const listWithoutProvider = state.providers.filter(p => p.provider !== action.payload)
        listWithoutProvider.push(new ProviderState(action.payload, true))

        return new PlatformState(state.entertainments, listWithoutProvider, state.reloading)
    }

    if (actionLoadedEntertainments.test(action)) {
        return new PlatformState(action.payload.entertainments, state.providers, false)
    }

    if (actionRemovedEntertainment.test(action)) {
        const remove = action.payload
        const newList = state.entertainments.filter((e: Entertainment) => !(e.id === remove.id && e.provider === remove.provider))
        return new PlatformState(newList, state.providers, state.reloading)
    }

    if (actionLoadedConfiguration.test(action)) {
        return new PlatformState(state.entertainments, action.payload.providers, state.reloading)
    }

    if (actionLoadingEntertainments.test(action)) {
        return new PlatformState(state.entertainments, state.providers, true)
    }

    return state
}