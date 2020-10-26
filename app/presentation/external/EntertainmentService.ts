import {DispatchFunction} from "../../domain/actions/helpers"
import ProviderState from "../../domain/store/state/ProviderState"
import Entertainment from "../../domain/store/state/Entertainment"

export default interface EntertainmentService {
    reload(dispatch: DispatchFunction, providerStates: ProviderState[], youtubeApiKey: string | null): void

    remove(dispatch: DispatchFunction, entertainment: Entertainment): void
}