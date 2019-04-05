import {actionCreator, IActionWithPayload} from "../helpers"
import Entertainment from "../../store/state/Entertainment"

export const actionRemovedEntertainment = actionCreator<Entertainment>('REMOVED_ENTERTAINMENT')

export function removeContent(entertainment: Entertainment): IActionWithPayload<Entertainment> {
    return actionRemovedEntertainment(entertainment)
}
