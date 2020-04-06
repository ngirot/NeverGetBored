import NotificationSubject from "./NotificationSubject"

export default class Notification {
    public id: string
    public url: string
    public unread: boolean
    public subject: NotificationSubject
    public updated_at: string
}