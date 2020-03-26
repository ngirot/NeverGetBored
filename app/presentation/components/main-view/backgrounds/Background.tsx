import * as React from "react"
import {emptyFunction} from "../../utils"
import {connect} from "react-redux"
import {AppState} from "../../../../domain/store/reducers"

interface StateProps {
    darkMode: boolean
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps

class Background extends React.Component<Props> {

    private readonly DARK_MODE_CLASS: string = 'dark'
    private readonly LIGHT_MODE_CLASS: string = 'light'

    render(): JSX.Element {
        document.body.classList.remove(this.DARK_MODE_CLASS, this.LIGHT_MODE_CLASS)
        document.body.classList.add(this.props.darkMode ? this.DARK_MODE_CLASS : this.LIGHT_MODE_CLASS)
        return (<span></span>)
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        darkMode: state.configuration.darkMode
    }
}

export default connect<StateProps>(mapStateToProps, emptyFunction)(Background)