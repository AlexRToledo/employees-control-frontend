import React from 'react';
import {
    Link
} from "react-router-dom";
import AuthService from '../../services/auth/AuthService';
import Storage from '../../helpers/Storage';
import IComponent from '../../core/IComponent/IComponent';

class RegisterComponent extends IComponent{
    constructor() {
        super();
        this.service = new AuthService();
        this.store = new Storage();
        this.state = {
            password: '',
            passwordConfirm: '',
            username: '',            
            email: '',            
            typeNotify: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(e) {
        try {
            e.preventDefault();
            if(e.target.checkValidity()) {
                const res = await this.service.Register({
                    ...this.state
                });
                if(res && !res.error) {
                    this.notify('Registro exitoso, sera contactado en breve, gracias por confiar en nosotros');
                    this.props.history.push('/login')
                } else {
                    this.notify('Error usuario o contrasenna incorrectos.')
                }
            } else {

            }
        } catch (err) {
            this.notify("Error no se puede establecer conexion.")
        }
    }

    render() {
        return (
            <section id={'register'} className={'uk-flex uk-flex-center uk-padding-small image-left'}>
                <div className={'uk-width-1-1@s uk-width-2-3@m'}>
                    <div className={'uk-flex uk-flex-column uk-flex-middle title'}>
                        <h2 className={'mt-5'}>LEXDAY</h2>
                        <p>La mejor forma de dirigir su despacho</p>
                    </div>
                </div>
                <div className={'uk-width-1-1@s uk-width-1-3@m form-content'}>
                    <h2 className={'uk-text-center'}>Registro</h2>
                    <form className={'uk-form-stacked'} onSubmit={this.onSubmit}>                        
                        <fieldset className="uk-fieldset">
                            <legend className="uk-legend">
                                Usuario
                            </legend>
                            <div className={'uk-margin'}>
                                <label className={'uk-form-label'}>Nombre</label>
                                <div className={'uk-form-controls'}>
                                    <input  id={'fullname'} className={'uk-input'} type='text' name="username" value={this.state.username} onChange={this.handleFields.bind(this)} required/>
                                </div>
                            </div>
                            <div className={'uk-margin'}>
                                <label className={'uk-form-label'}>Correo</label>
                                <div className={'uk-form-controls'}>
                                    <input  id={'email'} className={'uk-input'} type='email' name="email" value={this.state.email} onChange={this.handleFields.bind(this)} required/>
                                </div>
                            </div>
                            <div className={'uk-grid uk-margin'}>
                                <div className={'uk-width-1-2@s'}>
                                    <label className={'uk-form-label'}>Contrasenna</label>
                                    <div className={'uk-form-controls'}>
                                        <input id={'password'} className={'uk-input'} type='password' name="password" value={this.state.password} onChange={this.handleFields.bind(this)} required/>
                                    </div>
                                </div>
                                <div className={'uk-width-1-2@s'}>
                                    <label className={'uk-form-label'}>Confirmar Contrasenna</label>
                                    <div className={'uk-form-controls'}>
                                        <input id={'passwordConfirm'} className={'uk-input'} type='password' name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleFields.bind(this)} required/>
                                    </div>
                                </div>
                            </div>
                        </fieldset>                        
                        <div className={'uk-margin-small-top uk-flex uk-flex-column uk-text-center'}>
                            <button className={'uk-button uk-button-primary'} type='submit'>Registrarse</button>
                            <Link className={'uk-margin-small-left uk-padding-small'} to="/login">Ya tengo cuenta</Link>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default RegisterComponent;