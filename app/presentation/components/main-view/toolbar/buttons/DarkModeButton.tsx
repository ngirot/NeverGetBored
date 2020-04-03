import * as React from "react"
import * as Redux from "redux"
import {connect} from "react-redux"
import {AppState} from "../../../../../domain/store/reducers"
import inject, {Injectable} from "../../../../../Injector"

interface StateProps {
    darkMode: boolean
}

interface DispatchProps {
    onChangeMode: (darkMode: boolean) => void
}

type Props = StateProps & DispatchProps

class DarkModeButton extends React.Component<Props> {
    render(): JSX.Element {
        return (
            <button className={"button info square rounded"}
                    onClick={() => this.props.onChangeMode(!this.props.darkMode)}>
                {this.icon(this.props.darkMode)}
            </button>
        )
    }

    private icon(darkMode: boolean): JSX.Element {
        if (darkMode) {
            return <i className={"fa fa-sun"}/>
        } else {
            return <i className={"fa fa-moon"}/>
        }
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        darkMode: state.configuration.darkMode,
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    const entertainmentService = inject(Injectable.APP_CONFIGURATION_SERVICE)
    return {
        onChangeMode: (darkMode: boolean) => {
            entertainmentService.change(dispatch, darkMode)
        }
    }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(DarkModeButton)