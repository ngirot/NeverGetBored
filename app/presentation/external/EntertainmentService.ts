import {DispatchFunction} from "../../domain/actions/helpers"
import ProviderState from "../../domain/store/state/ProviderState"
import Entertainment from "../../domain/store/state/Entertainment"

export default interface EntertainmentService {
    reload(dispatch: DispatchFunction, providerStates: ProviderState[]): void

    remove(dispatch: DispatchFunction, entertainment: Entertainment): void
}