import {IAction} from "../../actions/helpers"
import AppConfigurationState from "../state/AppConfigurationState"
import {actionChangeDarkMode} from "../../external/adapter/ApplicationConfigurationDispatcher"

export default function applicationConfigurationReducer(state: AppConfigurationState = new AppConfigurationState(false),
                                                        action: IAction): AppConfigurationState {
    if (actionChangeDarkMode.test(action)) {
        return new AppConfigurationState(action.payload)
    }

    return state
}