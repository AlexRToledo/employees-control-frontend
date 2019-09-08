import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Storage from '../../helpers/Storage';
const store = new Storage();

class PublicRoutes extends React.Component{
    constructor() {
        super();
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props=> {
                    if (store.AuthVerify() === false) {
                        if(props.location.pathname === '/register') {
                            return <Component {...props} />
                        } else {
                            return <Redirect to={{
                                pathname: '/login',
                                state: {
                                    from: props.location
                                }
                            }}/>
                        }
                    } else {
                        if(store.GetRedirectRoute()) {
                            if(store.GetRedirectRoute() === '/') {
                                return <Redirect to={{
                                    pathname: '/login',
                                    state: {
                                        from: props.location
                                    }
                                }}/>
                            } else {
                                return <Redirect to={{
                                    pathname: store.GetRedirectRoute(),
                                    state: {
                                        from: props.location
                                    }
                                }}/>
                            }
                        } else {
                            return <Redirect to={{
                                pathname: '/dashboard',
                                state: {
                                    from: props.location
                                }
                            }}/>
                        }
                    }
                }}
            />
        );
    }
}

export default PublicRoutes;