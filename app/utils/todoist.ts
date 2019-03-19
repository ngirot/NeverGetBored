import {Provider} from "../reducers/Provider";
import moment = require("moment");
import Token from "../reducers/Token";
import TodoistApi from "./api/todoist/TodoistApi";
import Item from "./api/todoist/Item";
import Entertainment from "../reducers/Entertainment";

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
        .map((item: any) => new Entertainment(Provider.TODOIST, item.id, item.content));
}