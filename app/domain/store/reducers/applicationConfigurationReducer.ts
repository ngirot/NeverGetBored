import {IAction} from "../../actions/helpers"
import AppConfigurationState from "../state/AppConfigurationState"
import {actionChangeDarkMode} from "../../external/adapter/ApplicationConfigurationDispatcher"
import {actionLoadedConfiguration} from "../../external/adapter/ConfigurationDispatcher"

export default function applicationConfigurationReducer(state: AppConfigurationState = new AppConfigurationState(false),
                                                        action: IAction): AppConfigurationState {
    if (actionChangeDarkMode.test(action)) {
        return new AppConfigurationState(action.payload)
    }

    if (actionLoadedConfiguration.test(action)) {
        return new AppConfigurationState(action.payload.darkMode)
    }

    return state
}