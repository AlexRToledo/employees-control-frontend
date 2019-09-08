import React from 'react';
import { Link } from 'react-router-dom';
import IComponent from '../../../core/IComponent/IComponent'
import Storage from '../../../helpers/Storage';
import {ThemeContext} from '../../../helpers/Context';

class TopMenuComponent extends IComponent{
    constructor(props) {
        super(props);
        this.store = new Storage();        
        this.state = {
            count: 0
        };
    }

    async componentDidMount() {
        try {
            const res = await this.service.GetCount();
            if(res && !res.error) {
                this.setState({count: res.data.total})
            }
        } catch (err) {
            console.log(err)
        }
    }

    handleLogout() {
        this.store.Logout();
        window.location.href = '/';
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({colors}) => (
                    <nav id={'topmenu'} className={'uk-navbar uk-navbar-container'} style={{background: colors.top}} >
                        <div className={'uk-navbar-right uk-flex-right'}>
                            <ul className="uk-navbar-nav">
                                {this.store.GetUser().perm !== 'isSuper' &&
                                <li className="uk-active"><Link to={'/dashboard/calendar'} className={'uk-margin-left'} uk-tooltip="title: Notificaciones; pos: bottom"><span style={{color: colors.tfont}} uk-icon="icon: bell"></span><span className="uk-badge notify">{this.state.count}</span></Link></li>
                                }
                                <li className="uk-active"><a className={'uk-margin-left'} onClick={() => this.handleLogout()} uk-tooltip="title: Salir; pos: bottom"><span style={{color: colors.tfont}} uk-icon="icon: sign-out"></span></a></li>
                            </ul>
                        </div>
                    </nav>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default TopMenuComponent;