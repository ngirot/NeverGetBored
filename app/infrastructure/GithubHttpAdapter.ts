import moment = require("moment")
import {Github} from "../domain/external/port/Github"
import Token from "../domain/store/state/Token"
import Entertainment from "../domain/store/state/Entertainment"
import GithubApi from "./api/github/GithubApi"
import Notification from "./api/github/Notification"
import {EntertainmentType} from "../domain/store/state/EntertainmentType"
import {Provider} from "../domain/store/state/Provider"

export default class GithubHttpAdapter implements Github {

    private readonly notificationUrl: string = 'https://github.com/notifications/'

    public generateTokenGithub = (): Promise<Token> => {
        return new GithubApi().generateToken()
    }

    public entertainmentsGithub = (token: Token): Promise<Entertainment[]> => {
        return new GithubApi().loadNotifications(token)
            .then(notifications => notifications.map(this.convert))
    }

    private convert = (notification: Notification): Entertainment => {
        return new Entertainment(Provider.GITHUB, EntertainmentType.TASK, notification.id, this.asOrder(notification.updated_at),
            notification.subject.title, undefined, this.notificationUrl)
    }

    private asOrder = (dateAsString: string): number => {
        return moment(dateAsString).toDate().getTime()
    }

}