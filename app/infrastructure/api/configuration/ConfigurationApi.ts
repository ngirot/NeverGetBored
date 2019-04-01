import AppConfiguration from "./AppConfiguration"
import * as fs from "fs"

const electron = require('electron')
const app = electron.remote.app

export default class ConfigurationApi {

    constructor() {
        console.log('Configuration file: ' + this.configurationFile())
    }

    private readonly encoding = 'UTF-8'

    public save(appConfiguration: AppConfiguration) {
        fs.writeFileSync(this.configurationFile(), JSON.stringify(appConfiguration), {encoding: this.encoding})
        console.log('Configuration saved', appConfiguration)
    }

    public load(): AppConfiguration {
        const configFile = this.configurationFile()

        if (fs.existsSync(configFile)) {
            return JSON.parse(fs.readFileSync(configFile, {encoding: this.encoding}))
        } else {
            return new AppConfiguration()
        }
    }

    private configurationFile(): string {
        return app.getPath('userData') + '/configuration.json'
    }
}