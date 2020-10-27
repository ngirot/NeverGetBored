import * as React from "react"
import * as Redux from "redux"
import {connect} from "react-redux"
import inject, {Injectable} from "../../../../../Injector"
import {emptyFunction} from "../../../utils"

interface DispatchProps {
    toggleConfiguration: () => void
}

type Props = DispatchProps

class ReloadButton extends React.Component<Props> {
    render(): JSX.Element {
        return (
            <button className={"button info rounded"}
                    onClick={() => this.props.toggleConfiguration()}>
                <i className={"fa fa-cog"}/>
            </button>
        )
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    const configurationService = inject(Injectable.APP_CONFIGURATION_SERVICE)

    return {
        toggleConfiguration: () => {
            configurationService.toggleConfiguration(dispatch)
        }
    }
}

export default connect<void, DispatchProps>(emptyFunction, mapDispatchToProps)(ReloadButton)