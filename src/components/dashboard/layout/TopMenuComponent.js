import React from 'react';
import {connect} from 'react-redux';

import { LOGOUT } from '../../../store/actions/user.actions';

import IComponent from '../../../core/IComponent/IComponent'
import Storage from '../../../helpers/Storage';

class TopMenuComponent extends IComponent{
    constructor(props) {
        super(props);
        this.store = new Storage();        
    }

    handleLogout() {
        const { dispatch } = this.props;
        dispatch(LOGOUT({}));    
    }

    render() {
        return (
            <nav id={'topmenu'} className={'uk-navbar uk-navbar-container'} >
                <div className={'uk-navbar-right uk-flex-right'}>
                    <ul className="uk-navbar-nav">                                
                        <li className="uk-active"><a className={'uk-margin-left'} onClick={() => this.handleLogout()} uk-tooltip="title: Salir; pos: bottom"><span uk-icon="icon: sign-out"></span></a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default connect()(TopMenuComponent);