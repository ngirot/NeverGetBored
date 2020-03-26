import * as React from 'react'

import {connect} from "react-redux"
import * as Redux from "redux"
import EntertainmentList from "./entertainments/EntertainmentList"
import inject, {Injectable} from "../../../Injector"
import Background from "./backgrounds/Background"
import {emptyFunction} from "../utils"
import Toolbar from "./toolbar/Toolbar"

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
                    <Toolbar/>
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