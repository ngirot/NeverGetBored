import * as React from 'react'
import {emptyFunction} from "../../../utils"
import Entertainment from "../../../../../domain/store/state/Entertainment"
import {Browser} from "../../../../../domain/external/port/Browser"
import {OwnsProps} from "./FeedlyTile"
import inject, {Injectable} from "../../../../../Injector"
import * as Redux from "redux"
import {connect} from "react-redux"

const styles = require('./GithubTile.scss')

export interface OwnProps {
    entertainment: Entertainment
}

export interface StateProps {
}

interface DispatchProps {
    open: (browser: Browser, entertainment: Entertainment) => void
}

type Props = StateProps & OwnsProps & DispatchProps

class GithubTile extends React.Component<Props> {

    private browser: Browser = inject(Injectable.BROWSER)

    render(): JSX.Element {
        const e = this.props.entertainment
        return (
            <div data-role="tile" data-size="wide" className={"d-flex flex-justify-center flex-align-center " + styles.tile}
                 onClick={() => this.props.open(this.browser, e)}>
                <img className={"tile-logo " + styles.logo} src={'presentation/resources/logos/github.svg'} alt={"Github logo"}/>
                <p>{e.title}</p>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>): DispatchProps {
    return {
        open: (browser: Browser, entertainment: Entertainment) => {
            browser.openEntertainmentUrl(entertainment)
        }
    }
}

export default connect<StateProps, DispatchProps>(emptyFunction, mapDispatchToProps)(GithubTile)