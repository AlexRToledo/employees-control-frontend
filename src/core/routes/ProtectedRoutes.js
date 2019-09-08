import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Storage from '../../helpers/Storage';
const store = new Storage();

class ProtectedRoutes extends React.Component{

    AuthVerify() {
        try {
            const expire = new Date(Number(store.GetExpire('expire')));
            const now = new Date();

            if(store.GetToken() !== "" && store.GetUser() !== "" && expire > now) {
                return true
            }
            return false;
        } catch (err) {
            return null;
        }
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
                    if (this.AuthVerify()) {
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

export default ProtectedRoutes;