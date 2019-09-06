import DueDate from "./DueDate"

export default class Item {
    public readonly id: string
    public readonly due: DueDate
    public readonly content: string
}