import {DispatchFunction} from "../../domain/actions/helpers"

export default interface ConfigurationService {
    load(dispatch: DispatchFunction): void
}