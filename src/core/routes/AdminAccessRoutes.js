import React from 'react';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Storage from '../../helpers/Storage';
const store = new Storage();

class AccessRoutes extends React.Component {
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
                    if (this.props.user.perm === 'isadmin') {
                        return <Component {...props}/>
                    } else {
                        return <Redirect to={{
                            pathname: "/dashboard/forbidden",
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
    const {user} = state.auth
    return {
        user
    }
}

export default connect(mapStateToProps)(AccessRoutes);