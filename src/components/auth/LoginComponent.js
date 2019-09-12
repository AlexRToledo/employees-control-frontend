import React from 'react';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';

import { loginAction } from '../../store/ducks/auth';

import AuthService from '../../services/auth/AuthService';
import Storage from '../../helpers/Storage';
import IComponent from '../../core/IComponent/IComponent';

class LoginComponent extends IComponent {
    constructor(props) {
        super(props);
        this.service = new AuthService();
        this.store = new Storage();
        this.state = {
            email: '',
            password: '',
            typeNotify: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(e) {
        try {
            e.preventDefault();
            if(e.target.checkValidity()) {
                const res = await this.service.Login({email: this.state.email, password: this.state.password});
                if(res && !res.error) {                    
                    const { dispatch } = this.props;
                    dispatch(loginAction({
                        token: res.data.token,
                        user: res.data.user,
                    }));
                    this.notify('Bienvenido');
                    this.props.history.push('/cases');
                } else {
                    this.notify('Error usuario o contrasenna incorrectos.')
                }
            }
        } catch (err) {
            this.notify("Error no se puede establecer conexion.")
        }
    }

    render() {
        return (
            <section id={'login'} className={'uk-flex uk-flex-center uk-padding-small'}>
                <div className={'uk-width-1-1@s uk-width-1-4@m form-content'}>
                    <h2 className={'uk-text-center'}>Entrar</h2>
                    <form className={'uk-form-stacked'} onSubmit={this.onSubmit}>
                        <div className={'uk-margin'}>
                            <label className={'uk-form-label'}>Correo</label>
                            <div className={'uk-form-controls'}>
                                <input  id={'email'} className={'uk-input'} type='email' name="email" value={this.state.email} onChange={this.handleFields.bind(this)} required/>
                            </div>
                        </div>
                        <div className={'uk-margin'}>
                            <label className={'uk-form-label'}>Contrasenna</label>
                            <div className={'uk-form-controls'}>
                                <input id={'password'} className={'uk-input'} type='password' name="password" value={this.state.password} onChange={this.handleFields.bind(this)} required/>
                            </div>
                        </div>
                        <button className={'uk-button uk-button-primary'} type='submit'>Login</button>
                        {/* <Link className={'uk-margin-small-left'} to="/register">Necesito una cuenta?</Link> */}
                    </form>
                </div>
            </section>
        );
    }
}

export default connect()(LoginComponent);