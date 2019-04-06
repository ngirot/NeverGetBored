import {DispatchFunction} from "../../actions/helpers"
import {loadConfiguration} from "../../actions/configuration/loading"
import ConfigurationService from "../../../presentation/external/ConfigurationService"

export default class ConfigurationDispatcher implements ConfigurationService {
    load(dispatch: DispatchFunction): void {
        dispatch(loadConfiguration())
    }
}