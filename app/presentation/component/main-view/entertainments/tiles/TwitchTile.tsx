import * as React from 'react'

import {connect} from "react-redux"
import {emptyFunction} from "../../../utils"
import Entertainment from "../../../../../domain/store/state/Entertainment"
import {Browser} from "../../../../../domain/actions/external/Browser"
import inject, {Injectable} from "../../../../../Injector"

const styles = require('./TwitchTile.scss')

interface OwnsProps {
    entertainment: Entertainment
}

interface StateProps {
}

interface DispatchProps {
    open: (brower: Browser, entertainment: Entertainment) => void
}

type Props = StateProps & OwnsProps & DispatchProps

class TwitchTile extends React.Component<Props> {

    private readonly browser: Browser = inject(Injectable.BROWSER)

    render() {
        const e = this.props.entertainment
        return (
            <div data-role="tile" data-size="wide" className={styles.tile}
                 onClick={() => this.props.open(this.browser, e)}>
                <img className={"tile-logo"} src={'presentation/resources/logos/twitch.svg'} alt={"Twitch logo"}/>
                <span className={"branding-bar " + styles.streamname}>{e.title}</span>
                <span className={"badge-top " + styles.username}>{e.user}</span>
                <img alt={e.title} src={e.previewUrl} className={styles.thumbnail}/>
            </div>
        )
    }
}

function mapDispatchToProps(): DispatchProps {
    return {
        open: (browser: Browser, entertainment: Entertainment) => {
            browser.openEntertainmentUrl(entertainment)
        }
    }
}

export default connect<StateProps, DispatchProps>(emptyFunction, mapDispatchToProps)(TwitchTile)