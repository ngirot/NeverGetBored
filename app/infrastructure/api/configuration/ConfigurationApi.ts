import AppConfiguration from "./AppConfiguration"
import * as fs from "fs"

const electron = require('electron')
const app = electron.remote.app

export default class ConfigurationApi {

    private readonly encoding: string

    constructor() {
        this.encoding = 'UTF-8'
        console.log('Configuration file: ' + this.configurationFile())
    }

    public save(appConfiguration: AppConfiguration): void {
        fs.writeFileSync(this.configurationFile(), JSON.stringify(appConfiguration), {encoding: this.encoding})
        console.log('Configuration saved', appConfiguration)
    }

    public load(): AppConfiguration {
        const configFile = this.configurationFile()

        if (fs.existsSync(configFile)) {
            return JSON.parse(fs.readFileSync(configFile, {encoding: this.encoding}))
        } else {
            return new AppConfiguration(1, [])
        }
    }

    private configurationFile(): string {
        return app.getPath('userData') + '/configuration.json'
    }
}