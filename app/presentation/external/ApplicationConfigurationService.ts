import {DispatchFunction} from "../../domain/actions/helpers"

export default interface ApplicationConfigurationService {

    change(dispatch: DispatchFunction, darkMode: boolean): void
}