import * as React from 'react'
import {emptyConnect} from "../../../utils"
import Entertainment from "../../../../../domain/store/state/Entertainment"

export interface OwnProps {
    entertainment: Entertainment
}

class DefaultTile extends React.Component<OwnProps> {
    render(): JSX.Element {
        const e = this.props.entertainment
        return (
            <div data-role="tile" data-size="wide" className={"d-flex flex-justify-center flex-align-center"}>
                <p>{e.title}</p>
            </div>
        )
    }
}

export default emptyConnect(DefaultTile)