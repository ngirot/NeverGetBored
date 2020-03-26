import {actionCreator, DispatchFunction} from "../../actions/helpers"
import ApplicationConfigurationService from "../../../presentation/external/ApplicationConfigurationService"

export const actionChangeDarkMode = actionCreator<boolean>('CHANGE_DARK_MODE')

export default class ApplicationConfigurationDispatcher implements ApplicationConfigurationService {

    change(dispatch: DispatchFunction, darkMode: boolean): void {
        dispatch(actionChangeDarkMode(darkMode))
    }

}