import {Provider} from "../../domain/store/state/Provider"
import {DispatchFunction} from "../../domain/actions/helpers"

export default interface PlatformService {
    connect(dispatch: DispatchFunction, provider: Provider): void

}