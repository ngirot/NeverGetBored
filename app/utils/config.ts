import Token from "./Token";

const electron = require('electron');
const app = electron.remote.app;

import * as fs from "fs";

const encoding = 'UTF-8';

export class TokenConfiguration {
    token: Token;
    provider: string;
}

export class Configuration {
    tokens: TokenConfiguration[] = [];
}

export function save(configuration: Configuration) {
    fs.writeFileSync(configurationFile(), JSON.stringify(configuration), {encoding});
}

export function load(): Configuration {
    const configFile = configurationFile();
    if (fs.existsSync(configFile)) {
        return JSON.parse(fs.readFileSync(configurationFile(), {encoding}));
    } else {
        return new Configuration();
    }
}

function configurationFile(): string {
    return app.getPath('userData') + '/tokens.json';
}