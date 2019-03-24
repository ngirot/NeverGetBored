import {actionCreator, DispatcherFunction, DispatchFunction} from "../helpers";
import Entertainment from "../../../reducers/Entertainment";

export const actionRemovedEntertainment = actionCreator<Entertainment>('REMOVED_ENTERTAINMENT');

export function removeContent(entertainment: Entertainment): DispatcherFunction {
    return (dispatch: DispatchFunction) => {
        dispatch(actionRemovedEntertainment(entertainment));
    };
}
