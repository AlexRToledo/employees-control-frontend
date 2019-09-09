import React from 'react';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Storage from '../../helpers/Storage';
const store = new Storage();

class ProtectedRoutes extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        store.SetRedirectRoute(this.props.location.pathname)
    }

    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={props=> {
                    if (this.props.auth) {
                        return <Component {...props}/>
                    } else {
                        return <Redirect to={{
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }}/>
                    }
                }}
            />
        );
    }
}

function mapStateToProps(state) {
    const {auth} = state.auth
    return {
        auth
    }
}

export default connect(mapStateToProps)(ProtectedRoutes);