import React from 'react';
import { Link } from 'react-router-dom';
import IComponent from '../../../core/IComponent/IComponent';
import Storage from '../../../helpers/Storage';

class SideMenuComponent extends IComponent{
    constructor() {
        super();
        this.store = new Storage();
        this.state = {
            active: null,
            routes: [
                // {to: '/dashboard', name: 'Inicio', icon: 'icon: home; ratio: 2', access: {isAdmin: true, isSuper: true, isUser: true}},
                {to: '/dashboard/calendar', name: 'Calendario', icon: 'icon: calendar; ratio: 1.5', access: {isadmin: true}},                
                {to: '/dashboard/users', name: 'Usuarios', icon: 'icon: users; ratio: 1.5', access: {isadmin: true}},
                {to: '/dashboard/profile', name: 'Perfil', icon: 'icon: user; ratio: 1.5', access: {isadmin: true}},
            ]
        };
    }

    handlerActive(index) {
        this.setState({active: index});
    }

    verifyActive(index) {
        return this.state.active === index;
    }

    render() {
        return (            
            <section id={'side-menu'} className={'uk-width-1-5@m'}>
                <div className={'menu'}>
                    <h2 className={'title'}>LEXDAY</h2>
                    <ul className={'uk-nav'}>
                        {this.state.routes.map((element, index) =>
                            {
                                if(element.access[this.store.GetUser().perm] === true) {
                                    return <li key={index}>
                                        <Link className={'uk-nav-item ' + (this.verifyActive(index) ? 'uk-active' : '')} to={element.to} onClick={() => this.handlerActive(index)}>
                                            <span className={'uk-margin-right'} uk-icon={element.icon}></span>
                                            {element.name}
                                        </Link>
                                    </li>
                                } else {
                                    return <div key={'aaa'}></div>
                                }
                            }
                        )}
                    </ul>
                </div>
            </section>
        );
    }
}

export default SideMenuComponent;