import Noty = require("noty")
import {Notifi} from "../domain/external/port/Notifi"

export default class NotificationPopinAdapter implements Notifi {
    public errorMessage = (message: string, stack: string): void => {
        new Noty({
            type: 'error',
            theme: 'relax',
            text: '<span class="notification-header">' + message + '</span><br/><span class="notification-body">' + stack + '</span>',
            closeWith: ['button', 'click']
        }).show()
    }
}
