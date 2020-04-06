import ConfigurationFileAdapter from "./infrastructure/ConfigurationFileAdapter"
import BrowserSystemAdapter from "./infrastructure/BrowserSystemAdapter"
import FeedlyHttpAdapter from "./infrastructure/FeedlyHttpAdapter"
import NotificationPopinAdapter from "./infrastructure/NotificationPopinAdapter"
import TodoistHttpAdapter from "./infrastructure/TodoistHttpAdapter"
import TwitchHttpAdapter from "./infrastructure/TwitchHttpAdapter"
import EntertainmentDispatcher from "./domain/external/adapter/EntertainmentDispatcher"
import {PlatformDispatcher} from "./domain/external/adapter/PlatformDispatcher"
import {Configuration} from "./domain/external/port/Configuration"
import {Browser} from "./domain/external/port/Browser"
import {Feedly} from "./domain/external/port/Feedly"
import {Notifi} from "./domain/external/port/Notifi"
import {Todoist} from "./domain/external/port/Todoist"
import {Twitch} from "./domain/external/port/Twitch"
import EntertainmentService from "./presentation/external/EntertainmentService"
import PlatformService from "./presentation/external/PlatformService"
import ConfigurationService from "./presentation/external/ConfigurationService"
import ConfigurationDispatcher from "./domain/external/adapter/ConfigurationDispatcher"
import ApplicationConfigurationDispatcher from "./domain/external/adapter/ApplicationConfigurationDispatcher"
import SpotifyHttpAdapter from "./infrastructure/SpotifyHttpAdapter"
import ApplicationConfigurationService from "./presentation/external/ApplicationConfigurationService"
import {Spotify} from "./domain/external/port/Spotify"
import {Github} from "./domain/external/port/Github"
import GithubHttpAdapter from "./infrastructure/GithubHttpAdapter"

export enum Injectable {
    CONFIGURATION, BROWSER, FEEDLY, NOTIFICATION, TODOIST, TWITCH, SPOTIFY, GITHUB,
    ENTERTAINMENT_SERVICE, PLATFORM_SERVICE, CONFIGURATION_SERVICE, APP_CONFIGURATION_SERVICE
}

function inject(injectable: Injectable.CONFIGURATION): Configuration
function inject(injectable: Injectable.BROWSER): Browser
function inject(injectable: Injectable.FEEDLY): Feedly
function inject(injectable: Injectable.NOTIFICATION): Notifi
function inject(injectable: Injectable.TODOIST): Todoist
function inject(injectable: Injectable.TWITCH): Twitch
function inject(injectable: Injectable.SPOTIFY): Spotify
function inject(injectable: Injectable.GITHUB): Github
function inject(injectable: Injectable.ENTERTAINMENT_SERVICE): EntertainmentService
function inject(injectable: Injectable.PLATFORM_SERVICE): PlatformService
function inject(injectable: Injectable.CONFIGURATION_SERVICE): ConfigurationService
function inject(injectable: Injectable.APP_CONFIGURATION_SERVICE): ApplicationConfigurationService
function inject(injectable: Injectable): any {
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
        case Injectable.SPOTIFY:
            return new SpotifyHttpAdapter()
        case Injectable.GITHUB:
            return new GithubHttpAdapter()
        case Injectable.ENTERTAINMENT_SERVICE:
            return new EntertainmentDispatcher()
        case Injectable.PLATFORM_SERVICE:
            return new PlatformDispatcher()
        case Injectable.CONFIGURATION_SERVICE:
            return new ConfigurationDispatcher()
        case Injectable.APP_CONFIGURATION_SERVICE:
            return new ApplicationConfigurationDispatcher()
        default:
            throw new Error('Unable to get injectable for ' + injectable)
    }
}

export default inject
