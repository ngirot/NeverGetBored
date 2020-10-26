import {actionCreator, actionCreatorVoid, DispatchFunction} from "../../actions/helpers"
import ApplicationConfigurationService from "../../../presentation/external/ApplicationConfigurationService"
import inject, {Injectable} from "../../../Injector"

export const actionChangeDarkMode = actionCreator<boolean>('CHANGE_DARK_MODE')
export const actionToggleConfiguration = actionCreatorVoid('TOGGLE_CONFIGURATION_POPUP')
export const actionChangeYouTubeApiKey = actionCreator<string | null>('CHANGE_YOUTUBE_API_KEY')

export default class ApplicationConfigurationDispatcher implements ApplicationConfigurationService {

    change(dispatch: DispatchFunction, darkMode: boolean): void {
        const configuration = inject(Injectable.CONFIGURATION)
        configuration.changeDarkMode(darkMode)

        dispatch(actionChangeDarkMode(darkMode))
    }

    changeYouTubeApiKey(dispatch: DispatchFunction, apiKey: string | null): void {
        const configuration = inject(Injectable.CONFIGURATION)
        configuration.changeYouTubeApiKey(apiKey)

        dispatch(actionChangeYouTubeApiKey(apiKey))
    }

    toggleConfiguration(dispatch: DispatchFunction): void {
        dispatch(actionToggleConfiguration())
    }
}