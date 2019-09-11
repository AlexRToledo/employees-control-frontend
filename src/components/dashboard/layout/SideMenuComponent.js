import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IComponent from '../../../core/IComponent/IComponent';

class SideMenuComponent extends IComponent{
    constructor(props) {
        super(props);        
        this.state = {
            active: null,
            routes: [
                // {to: '/dashboard', name: 'Inicio', icon: 'icon: home; ratio: 2', access: {isAdmin: true, isSuper: true, isUser: true}},
                {to: '/dashboard/controls', name: 'Control', icon: 'icon: calendar; ratio: 1.5', access: {isadmin: 'both'}},                
                {to: '/dashboard/users', name: 'Users', icon: 'icon: users; ratio: 1.5', access: {isadmin: true}},
                {to: '/dashboard/profile', name: 'Profile', icon: 'icon: user; ratio: 1.5', access: {isadmin: 'both'}},
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
                                if(element.access[this.props.user.perm]) {
                                    return <li key={index}>
                                        <Link className={'uk-nav-item ' + (this.verifyActive(index) ? 'uk-active' : '')} to={element.to} onClick={() => this.handlerActive(index)}>
                                            <span className={'uk-margin-right'} uk-icon={element.icon}></span>
                                            {element.name}
                                        </Link>
                                    </li>
                                } else if(element.access.isadmin === 'both') {
                                    return <li key={index}>
                                        <Link className={'uk-nav-item ' + (this.verifyActive(index) ? 'uk-active' : '')} to={element.to} onClick={() => this.handlerActive(index)}>
                                            <span className={'uk-margin-right'} uk-icon={element.icon}></span>
                                            {element.name}
                                        </Link>
                                    </li>
                                }
                                else {
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

function mapStateToProps(state) {    
    const {user} = state.auth
    return {
        user
    }
}

export default connect(mapStateToProps)(SideMenuComponent);