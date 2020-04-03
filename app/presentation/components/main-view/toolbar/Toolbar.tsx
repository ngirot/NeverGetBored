import * as React from 'react'
import {emptyConnect} from "../../utils"
import {Provider} from "../../../../domain/store/state/Provider"
import ConnectButton from "./buttons/ConnectButton"
import DarkModeButton from "./buttons/DarkModeButton"
import ReloadButton from "./buttons/ReloadButton"

const styles = require('./Toolbar.scss')

interface StateProps {
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps

class Toolbar extends React.Component<Props> {

    render(): JSX.Element {
        return (
            <div className={"row"}>
                <div className={"cell-8 offset-2"}>
                    <ConnectButton serviceName="Twitch" iconPath={'presentation/resources/logos/twitch.svg'}
                                   type={Provider.TWITCH}/>
                    <ConnectButton serviceName="Todoist" iconPath={'presentation/resources/logos/todoist.svg'}
                                   type={Provider.TODOIST}/>
                    <ConnectButton serviceName={"Feedly"} iconPath={'presentation/resources/logos/feedly.svg'}
                                   type={Provider.FEEDLY}/>
                    <ConnectButton serviceName={"Spotify"} iconPath={'presentation/resources/logos/spotify.svg'}
                                   type={Provider.SPOTIFY}/>
                </div>
                <div className={"cell-2 " + styles.actions}>
                    <DarkModeButton/>
                    <ReloadButton/>
                </div>
            </div>
        )
    }
}

export default emptyConnect(Toolbar)