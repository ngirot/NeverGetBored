import * as React from 'react'

import {connect} from "react-redux"
import EntertainmentTile from "./tiles/EntertainmentTile"
import {emptyFunction} from "../../utils"
import Entertainment from "../../../../domain/store/state/Entertainment"
import {AppState} from "../../../../domain/store/reducers"

const styles = require('./EntertainmentList.scss')

interface StateProps {
    entertainments: Entertainment[]
}

type Props = StateProps

class EntertainmentList extends React.Component<Props> {
    render() {
        return (
            <div className={"tiles-grid " + styles.container}>
                {
                    this.props.entertainments
                        .sort(this.sorter)
                        .map(e => {
                            return <EntertainmentTile entertainment={e} key={e.id}/>
                        })
                }
            </div>
        )
    }

    private sorter = (a: Entertainment, b: Entertainment): number => {
        if (a.type !== b.type) {
            return a.type - b.type
        }

        if (a.provider !== b.provider) {
            return this.compareStrings(a.provider, b.provider)
        }

        return this.compareStrings(a.id, b.id)
    }

    private compareStrings = (a: string, b: string): number => {
        if (a === b) {
            return 0
        }

        return a > b ? -1 : 1
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        entertainments: state.platform.entertainments
    }
}

export default connect<StateProps>(mapStateToProps, emptyFunction)(EntertainmentList)