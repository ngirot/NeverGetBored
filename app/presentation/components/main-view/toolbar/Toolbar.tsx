import * as React from 'react'
import {emptyConnect} from "../../utils"
import {Provider} from "../../../../domain/store/state/Provider"
import ConnectButton from "./buttons/ConnectButton"
import ReloadButton from "./buttons/ReloadButton"
import ConfigButton from "./buttons/ConfigButton"

const styles = require('./Toolbar.scss')

interface Props {
}

class Toolbar extends React.Component<Props> {

    render(): JSX.Element {
        return (
            <div className={"row"}>
                <div className={"cell-6 offset-3"}>
                    <ConnectButton serviceName="Twitch" iconPath={'presentation/resources/logos/twitch.svg'}
                                   type={Provider.TWITCH}/>
                    <ConnectButton serviceName="Todoist" iconPath={'presentation/resources/logos/todoist.svg'}
                                   type={Provider.TODOIST}/>
                    <ConnectButton serviceName={"Feedly"} iconPath={'presentation/resources/logos/feedly.svg'}
                                   type={Provider.FEEDLY}/>
                    <ConnectButton serviceName={"Spotify"} iconPath={'presentation/resources/logos/spotify.svg'}
                                   type={Provider.SPOTIFY}/>
                    <ConnectButton serviceName={"Github"} iconPath={'presentation/resources/logos/github.svg'}
                                   type={Provider.GITHUB}/>
                </div>
                <div className={"cell-3 " + styles.actions}>
                    <ConfigButton/>
                    <ReloadButton/>
                </div>
            </div>
        )
    }
}

export default emptyConnect(Toolbar)