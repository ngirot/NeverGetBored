import {actionCreator, DispatchFunction} from "../../actions/helpers"
import ApplicationConfigurationService from "../../../presentation/external/ApplicationConfigurationService"
import inject, {Injectable} from "../../../Injector"

export const actionChangeDarkMode = actionCreator<boolean>('CHANGE_DARK_MODE')

export default class ApplicationConfigurationDispatcher implements ApplicationConfigurationService {

    change(dispatch: DispatchFunction, darkMode: boolean): void {
        const configuration = inject(Injectable.CONFIGURATION)
        configuration.changeDarkMode(darkMode)

        dispatch(actionChangeDarkMode(darkMode))
    }

}