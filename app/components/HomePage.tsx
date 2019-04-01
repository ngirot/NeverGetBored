import * as React from 'react'
import {RouteComponentProps} from 'react-router'
import MainView from "./main-view/MainView"

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
    render() {
        return (
            <MainView/>
        )
    }
}

export default (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>)
