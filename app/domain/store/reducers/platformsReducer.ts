import {actionLoadedConfiguration} from "../../actions/configuration/loading"
import {actionConnectionToProviderFailed, actionConnectToProvider} from "../../actions/platform/connect"
import {IAction} from "../../actions/helpers"
import {actionLoadedEntertainments, actionLoadingEntertainments} from "../../actions/entertainment/load"
import {actionRemovedEntertainment} from "../../actions/entertainment/remove"
import Entertainment from "../state/Entertainment"
import PlatformState from "../state/PlatformState"
import ProviderState from "../state/ProviderState"

export default function platformsReducer(state: PlatformState = new PlatformState([], [], false), action: IAction) {
    if (actionConnectToProvider.test(action)) {
        const listWithoutProvider = state.providers.filter(p => p.provider !== action.payload.provider)
        listWithoutProvider.push(new ProviderState(action.payload.provider, false, action.payload.token))

        return new PlatformState(state.entertainments, listWithoutProvider, false)
    }

    if (actionConnectionToProviderFailed.test(action)) {
        const listWithoutProvider = state.providers.filter(p => p.provider !== action.payload)
        listWithoutProvider.push(new ProviderState(action.payload, true))

        return new PlatformState(state.entertainments, listWithoutProvider, false)
    }

    if (actionLoadedEntertainments.test(action)) {
        return new PlatformState(action.payload.entertainments, state.providers, false)
    }

    if (actionRemovedEntertainment.test(action)) {
        const remove = action.payload
        const newList = state.entertainments.filter((e: Entertainment) => !(e.id === remove.id && e.provider === remove.provider))
        return new PlatformState(newList, state.providers, false)
    }

    if (actionLoadedConfiguration.test(action)) {
        return new PlatformState(state.entertainments, action.payload, false)
    }

    if (actionLoadingEntertainments.test(action)) {
        return new PlatformState(state.entertainments, state.providers, true)
    }

    return state
}