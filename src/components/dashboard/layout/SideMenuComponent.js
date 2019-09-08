import React from 'react';
import { Link } from 'react-router-dom';
import IComponent from '../../../core/IComponent/IComponent';
import Storage from '../../../helpers/Storage';
import {ThemeContext} from '../../../helpers/Context';

class SideMenuComponent extends IComponent{
    constructor() {
        super();
        this.store = new Storage();
        this.state = {
            active: null,
            routes: [
                // {to: '/dashboard', name: 'Inicio', icon: 'icon: home; ratio: 2', access: {isAdmin: true, isSuper: true, isUser: true}},
                {to: '/dashboard/calendar', name: 'Calendario', icon: 'icon: calendar; ratio: 1.5', access: {isAdmin: true, isSuper: false, isUser: true}},
                {to: '/dashboard/cases', name: 'Expedientes', icon: 'icon: album; ratio: 1.5', access: {isAdmin: true, isSuper: false, isUser: true}},
                {to: '/dashboard/offices', name: 'Despachos', icon: 'icon: thumbnails; ratio: 1.5', access: {isAdmin: false, isSuper: true, isUser: false}},
                {to: '/dashboard/invoices', name: 'Facturas', icon: 'icon: file-text; ratio: 1.5', access: {isAdmin: true, isSuper: true, isUser: false}},
                {to: '/dashboard/tickets', name: 'Tickets', icon: 'icon: comment; ratio: 1.5', access: {isAdmin: true, isSuper: true, isUser: false}},
                {to: '/dashboard/users', name: 'Usuarios', icon: 'icon: users; ratio: 1.5', access: {isAdmin: true, isSuper: true, isUser: false}},
                {to: '/dashboard/profile', name: 'Perfil', icon: 'icon: user; ratio: 1.5', access: {isAdmin: true, isSuper: true, isUser: true}},
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
            <ThemeContext.Consumer>
                {({colors}) => (
                    <section id={'side-menu'} className={'uk-width-1-5@m'} style={{background: colors.side}}>
                        <div className={'menu'}>
                            <h2 className={'title'}>LEXDAY</h2>
                            <ul className={'uk-nav'}>
                                {this.state.routes.map((element, index) =>
                                   {
                                        if(element.access[this.store.GetUser().perm] === true) {
                                            return <li key={index}>
                                                <Link className={'uk-nav-item ' + (this.verifyActive(index) ? 'uk-active' : '')} to={element.to} onClick={() => this.handlerActive(index)} style={{color: colors.sfont}}>
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
                )}
            </ThemeContext.Consumer>

        );
    }
}

export default SideMenuComponent;