import moment = require("moment")
import TodoistApi from "./api/todoist/TodoistApi"
import Item from "./api/todoist/Item"
import Entertainment from "../domain/store/state/Entertainment"
import Token from "../domain/store/state/Token"
import {Provider} from "../domain/store/state/Provider"
import {EntertainmentType} from "../domain/store/state/EntertainmentType"
import {Todoist} from "../domain/external/Todoist"

export default class TodoistHttpAdapter implements Todoist {

    private readonly api = new TodoistApi()

    public generateTokenTodoist = (): Promise<Token> => {
        return new TodoistApi().generateTokenTodoist()
    }

    public entertainmentsTodoist = (token: Token): Promise<Entertainment[]> => {
        return this.api.entertainmentsTodoist(token)
            .then(this.convertSyncToEntertainments)
    }

    private convertSyncToEntertainments = (items: Item[]): Entertainment[] => {
        const end = moment().endOf('day')

        return items
            .filter((item: any) => {
                const dueDate = item.due_date_utc
                return dueDate !== null && moment(dueDate) < end
            })
            .map((item: any) => new Entertainment(Provider.TODOIST, EntertainmentType.TASK, item.id, item.content))
    }
}