import * as React from 'react'
import * as Redux from 'redux'

import {connect} from "react-redux"
import Token from "../../../../../domain/store/state/Token"
import {AppState} from "../../../../../domain/store/reducers"
import {Provider} from "../../../../../domain/store/state/Provider"
import inject, {Injectable} from "../../../../../Injector"

const styles = require('./ConnectButton.scss')

export interface OwnProps {
    serviceName: string
    iconPath: string
    type: Provider
}

interface StateProps {
    connected: boolean
    error: boolean
    token?: Token
}

interface DispatchProps {
    onConnect: (token?: Token) => void
}

type Props = StateProps & DispatchProps & OwnProps

class ConnectButton extends React.Component<Props> {
    render(): JSX.Element {
        return (
            <button onClick={() => this.props.onConnect(this.props.token)}
                    className={"rounded image-button " + this.style()}>
                <img alt={'logo of ' + this.props.serviceName} src={this.props.iconPath}
                     className={styles.providericon}/>
                <span className={"caption"}>
                    {this.props.serviceName}
                </span>
            </button>
        )
    }

    private style(): string {
        if (this.props.connected) {
            return "success"
        }

        if (this.props.error) {
            return "alert"
        }

        return "light " + styles.notconnected
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    const providerState = state.platform.providers.find(p => p.provider === ownProps.type)

    if (providerState) {
        return {
            connected: providerState.token !== undefined,
            error: providerState.error,
            token: providerState.token,
        }
    } else {
        return {
            connected: false,
            error: false,
            token: undefined,
        }
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps {
    const platformService = inject(Injectable.PLATFORM_SERVICE)
    return {
        onConnect: (token?: Token) => {
            if (!token) {
                platformService.connect(dispatch, ownProps.type)
            }
        }
    }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ConnectButton)