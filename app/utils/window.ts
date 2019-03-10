const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

export default function createOauthWindow() {
    return new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            nodeIntegration: false, // We recommend disabling nodeIntegration for security.
            contextIsolation: true // We recommend enabling contextIsolation for security.
        },
    });
}