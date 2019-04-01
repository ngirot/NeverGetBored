import ConfigurationFileAdapter from "./utils/ConfigurationFileAdapter"
import BrowserSystemAdapter from "./utils/BrowserSystemAdapter"
import FeedlyHttpAdapter from "./utils/FeedlyHttpAdapter"
import NotificationPopinAdapter from "./utils/NotificationPopinAdapter"
import TodoistHttpAdapter from "./utils/TodoistHttpAdapter"
import TwitchHttpAdapter from "./utils/TwitchHttpAdapter"

export enum Injectable {
    CONFIGURATION, BROWSER, FEEDLY, NOTIFICATION, TODOIST, TWITCH
}

export default function inject(injectable: Injectable): any {
    switch (injectable) {
        case Injectable.CONFIGURATION:
            return new ConfigurationFileAdapter()
        case Injectable.BROWSER:
            return new BrowserSystemAdapter()
        case Injectable.FEEDLY:
            return new FeedlyHttpAdapter()
        case Injectable.NOTIFICATION:
            return new NotificationPopinAdapter()
        case Injectable.TODOIST:
            return new TodoistHttpAdapter()
        case Injectable.TWITCH:
            return new TwitchHttpAdapter()
        default:
            throw new Error('Unable to get injectable for ' + injectable)
    }
}
