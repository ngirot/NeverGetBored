import moment = require("moment");
import TodoistApi from "./api/todoist/TodoistApi";
import Item from "./api/todoist/Item";
import Entertainment from "../domain/store/state/Entertainment";
import Token from "../domain/store/state/Token";
import {Provider} from "../domain/store/state/Provider";
import {EntertainmentType} from "../domain/store/state/EntertainmentType";

export function generateTokenTodoist(): Promise<Token> {
    return new TodoistApi().generateTokenTodoist();
}

export function entertainmentsTodoist(token: Token): Promise<Entertainment[]> {
    return new TodoistApi().entertainmentsTodoist(token)
        .then(convertSyncToEntertainments);
}

function convertSyncToEntertainments(items: Item[]): Entertainment[] {
    const end = moment().endOf('day');

    return items
        .filter((item: any) => {
            const dueDate = item.due_date_utc;
            return dueDate !== null && moment(dueDate) < end;
        })
        .map((item: any) => new Entertainment(Provider.TODOIST, EntertainmentType.TASK, item.id, item.content));
}