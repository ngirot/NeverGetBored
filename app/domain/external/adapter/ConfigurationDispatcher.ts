import {actionCreator, DispatchFunction} from "../../actions/helpers"
import {loadConfiguration} from "../../actions/configuration/loading"
import ConfigurationService from "../../../presentation/external/ConfigurationService"
import ProviderState from "../../store/state/ProviderState"

export const actionLoadedConfiguration = actionCreator<ProviderState[]>('LOADED_CONFIGURATION')

export default class ConfigurationDispatcher implements ConfigurationService {
    load(dispatch: DispatchFunction): void {
        const action = actionLoadedConfiguration(loadConfiguration())
        dispatch(action)
    }
}