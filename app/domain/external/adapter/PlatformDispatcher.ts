import PlatformService from "../../../presentation/external/PlatformService"
import {actionCreator, DispatchFunction} from "../../actions/helpers"
import {Provider} from "../../store/state/Provider"
import {connectToProvider} from "../../actions/platform/connect"
import ConnectionSuccessPayload from "../../actions/platform/ConnectionSuccessPayload"

export const actionConnectToProvider = actionCreator<ConnectionSuccessPayload>('CONNECT_TO_PROVIDER')
export const actionConnectionToProviderFailed = actionCreator<Provider>('CONNECT_TO_PROVIDER_FAILED')

export class PlatformDispatcher implements PlatformService {
    connect(dispatch: DispatchFunction, provider: Provider): void {
        connectToProvider(provider)
            .then((token) => {
                const payload = new ConnectionSuccessPayload(provider, token)
                const action = actionConnectToProvider(payload)
                dispatch(action)
            })
            .catch((provider) => {
                const action = actionConnectionToProviderFailed(provider)
                dispatch(action)
            })
    }

}