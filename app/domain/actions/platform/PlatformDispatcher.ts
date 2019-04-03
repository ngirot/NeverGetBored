import PlatformService from "../../../presentation/external/PlatformService"
import {DispatchFunction} from "../helpers"
import {Provider} from "../../store/state/Provider"
import {connectToProvider} from "./connect"

export class PlatformDispatcher implements PlatformService {
    connect(dispatch: DispatchFunction, provider: Provider): void {
        connectToProvider(provider)(dispatch)
    }

}