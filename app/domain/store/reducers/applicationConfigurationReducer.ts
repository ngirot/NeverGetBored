import {IAction} from "../../actions/helpers"
import AppConfigurationState from "../state/AppConfigurationState"
import {
    actionChangeDarkMode,
    actionChangeYouTubeApiKey,
    actionToggleConfiguration
} from "../../external/adapter/ApplicationConfigurationDispatcher"
import {actionLoadedConfiguration} from "../../external/adapter/ConfigurationDispatcher"

export default function applicationConfigurationReducer(state: AppConfigurationState = new AppConfigurationState(false, false, null),
                                                        action: IAction): AppConfigurationState {
    if (actionChangeDarkMode.test(action)) {
        return new AppConfigurationState(action.payload, state.configurationOpen, state.youTubeApiKey)
    }
    if (actionChangeYouTubeApiKey.test(action)) {
        return new AppConfigurationState(state.darkMode, state.configurationOpen, action.payload)
    }

    if (actionLoadedConfiguration.test(action)) {
        return new AppConfigurationState(action.payload.darkMode, false, action.payload.youTubeApiKey)
    }

    if (actionToggleConfiguration.test(action)) {
        return new AppConfigurationState(state.darkMode, !state.configurationOpen, state.youTubeApiKey)
    }

    return state
}