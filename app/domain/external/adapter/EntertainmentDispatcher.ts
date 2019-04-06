import {actionCreator, actionCreatorVoid, DispatchFunction} from "../../actions/helpers"
import ProviderState from "../../store/state/ProviderState"
import {reloadAll} from "../../actions/entertainment/load"
import EntertainmentService from "../../../presentation/external/EntertainmentService"
import Entertainment from "../../store/state/Entertainment"
import {removeContent} from "../../actions/entertainment/remove"
import {refreshProviders} from "../../actions/platform/connect"
import EntertainmentLoadedPayload from "../../actions/entertainment/EntertainmentLoadedPayload"
import ConnectionSuccessPayload from "../../actions/platform/ConnectionSuccessPayload"
import {actionConnectToProvider} from "./PlatformDispatcher"

export const actionLoadingEntertainments = actionCreatorVoid('LOADING_ENTERTAINMENT_FROM_PROVIDER')
export const actionLoadedEntertainments = actionCreator<EntertainmentLoadedPayload>('LOADED_ENTERTAINMENT_FROM_PROVIDER')

export default class EntertainmentDispatcher implements EntertainmentService {

    reload(dispatch: DispatchFunction, providerStates: ProviderState[]): void {
        dispatch(actionLoadingEntertainments())

        refreshProviders(providerStates).then((refreshedProviders) => {
            refreshedProviders
                .filter((p) => p.refreshed)
                .forEach((refresh) => {
                    console.log('REFRESHED', refresh)
                    const action = new ConnectionSuccessPayload(refresh.provider, refresh.token)
                    dispatch(actionConnectToProvider(action))
                })

            const refreshedStates = refreshedProviders.map((refresh) => {
                return new ProviderState(refresh.provider, false, refresh.token)
            })

            reloadAll(refreshedStates).then(dispatch)
        })
    }

    remove(dispatch: DispatchFunction, entertainment: Entertainment): void {
        dispatch(removeContent(entertainment))
    }
}