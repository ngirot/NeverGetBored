import Noty = require("noty");

export function errorMessage(message: string, stack: string): void {
    new Noty({
        type: 'error',
        theme: 'relax',
        text: '<span class="notification-header">' + message + '</span><br/><span class="notification-body">' + stack + '</span>',
        closeWith: ['button', 'click']
    }).show();
}