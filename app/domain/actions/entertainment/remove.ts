import {actionCreator, DispatcherFunction, DispatchFunction} from "../helpers";
import Entertainment from "../../store/state/Entertainment";

export const actionRemovedEntertainment = actionCreator<Entertainment>('REMOVED_ENTERTAINMENT');

export function removeContent(entertainment: Entertainment): DispatcherFunction {
    return (dispatch: DispatchFunction) => {
        dispatch(actionRemovedEntertainment(entertainment));
    };
}
