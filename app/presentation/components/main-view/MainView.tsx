import * as React from 'react'

import {connect} from "react-redux"
import * as Redux from "redux"
import ConnectButton from "./providers/ConnectButton"
import ReloadButton from "./entertainments/ReloadButton"
import EntertainmentList from "./entertainments/EntertainmentList"
import {Provider} from "../../../domain/store/state/Provider"
import inject, {Injectable} from "../../../Injector"
import Background from "./backgrounds/Background"
import {emptyFunction} from "../utils"
import DarkModeButton from "./entertainments/DarkModeButton"

const styles = require('./MainView.scss')

interface StateProps {
}

interface DispatchProps {
    loadConf: () => void
}

type Props = StateProps & DispatchProps

class MainView extends React.Component<Props> {

    componentDidMount(): void {
        this.props.loadConf()
    }

    render(): JSX.Element {
        return (
            <div className={styles.container} data-tid="container">
                <Background/>
                <div className={styles.intro}>
                    <div className={"row"}>
                        <div className={"cell-8 offset-2"}>
                            <ConnectButton serviceName="Twitch" iconPath={'presentation/resources/logos/twitch.svg'}
                                           type={Provider.TWITCH}/>
                            <ConnectButton serviceName="Todoist" iconPath={'presentation/resources/logos/todoist.svg'}
                                           type={Provider.TODOIST}/>
                            <ConnectButton serviceName={"Feedly"} iconPath={'presentation/resources/logos/feedly.svg'}
                                           type={Provider.FEEDLY}/>
                        </div>
                        <div className={"cell-2 " + styles.actions}>
                            <DarkModeButton/>
                            <ReloadButton/>
                        </div>
                    </div>
                </div>
                <div className={styles.entertainments}>
                    <EntertainmentList/>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    const configuration = inject(Injectable.CONFIGURATION_SERVICE)
    return {
        loadConf: () => {
            configuration.load(dispatch)
        }
    }
}

export default connect<StateProps, DispatchProps>(emptyFunction, mapDispatchToProps)(MainView)