import {DispatchFunction} from "../../actions/helpers"
import ProviderState from "../../store/state/ProviderState"
import {reloadAll} from "../../actions/entertainment/load"
import EntertainmentService from "../../../presentation/external/EntertainmentService"
import Entertainment from "../../store/state/Entertainment"
import {removeContent} from "../../actions/entertainment/remove"

export default class EntertainmentDispatcher implements EntertainmentService {

    reload(dispatch: DispatchFunction, providerStates: ProviderState[]): void {
        reloadAll(providerStates)(dispatch)
    }

    remove(dispatch: DispatchFunction, entertainment: Entertainment): void {
        removeContent(entertainment)(dispatch)
    }
}