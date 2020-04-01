import {actionCreator, DispatchFunction} from "../../actions/helpers"
import {loadConfiguration} from "../../actions/configuration/loading"
import ConfigurationService from "../../../presentation/external/ConfigurationService"
import LoadedConfiguration from "../../actions/configuration/LoadedConfiguration"

export const actionLoadedConfiguration = actionCreator<LoadedConfiguration>('LOADED_CONFIGURATION')

export default class ConfigurationDispatcher implements ConfigurationService {
    load(dispatch: DispatchFunction): void {
        const action = actionLoadedConfiguration(loadConfiguration())
        dispatch(action)
    }
}