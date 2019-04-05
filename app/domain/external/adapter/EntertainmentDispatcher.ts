import {DispatchFunction} from "../../actions/helpers"
import ProviderState from "../../store/state/ProviderState"
import {initReloading, reloadAll} from "../../actions/entertainment/load"
import EntertainmentService from "../../../presentation/external/EntertainmentService"
import Entertainment from "../../store/state/Entertainment"
import {removeContent} from "../../actions/entertainment/remove"
import {refreshProviders} from "../../actions/platform/connect"

export default class EntertainmentDispatcher implements EntertainmentService {

    reload(dispatch: DispatchFunction, providerStates: ProviderState[]): void {
        dispatch(initReloading())
        refreshProviders(providerStates).then((providerActions) => {
            providerActions.forEach(dispatch)

            const newStates = providerActions.map((action) => action.payload)
                .map((payload) => new ProviderState(payload.provider, false, payload.token))

            const oldStateStillValid = providerStates
                .filter((state) => newStates.map((s) => s.provider).indexOf(state.provider) === -1)

            reloadAll([...newStates, ...oldStateStillValid]).then(dispatch)
        })
    }

    remove(dispatch: DispatchFunction, entertainment: Entertainment): void {
        dispatch(removeContent(entertainment))
    }
}