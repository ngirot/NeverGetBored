import AppConfiguration from "./AppConfiguration"
import * as fs from "fs"

const electron = require('electron')
const app = electron.remote.app

export default class ConfigurationApi {

    private readonly encoding: string

    private readonly defaultConfiguration: AppConfiguration

    constructor() {
        this.encoding = 'UTF-8'
        console.log('Configuration file: ' + this.configurationFile())
        this.defaultConfiguration = new AppConfiguration(2, false, [], null)
    }

    public save(appConfiguration: AppConfiguration): void {
        fs.writeFileSync(this.configurationFile(), JSON.stringify(appConfiguration), {encoding: this.encoding})
        console.log('Configuration saved', appConfiguration)
    }

    public load(): AppConfiguration {
        const configFile = this.configurationFile()

        if (fs.existsSync(configFile)) {
            let configuration: AppConfiguration = JSON.parse(fs.readFileSync(configFile, {encoding: this.encoding}))

            if (configuration.version === 1) {
                configuration = new AppConfiguration(2, this.defaultConfiguration.darkMode, configuration.providers, null)
            }

            if (configuration.version === 2) {
                configuration = new AppConfiguration(3, configuration.darkMode, configuration.providers, null)
            }

            return configuration
        } else {
            return this.defaultConfiguration
        }
    }

    private configurationFile(): string {
        return app.getPath('userData') + '/configuration.json'
    }
}