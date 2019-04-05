import PlatformService from "../../../presentation/external/PlatformService"
import {DispatchFunction} from "../../actions/helpers"
import {Provider} from "../../store/state/Provider"
import {connectToProvider} from "../../actions/platform/connect"

export class PlatformDispatcher implements PlatformService {
    connect(dispatch: DispatchFunction, provider: Provider): void {
        connectToProvider(provider)
            .then(dispatch)
            .catch(dispatch)
    }

}