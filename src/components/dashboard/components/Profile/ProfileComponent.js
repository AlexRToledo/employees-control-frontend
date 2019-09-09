import React from 'react';
import IComponent from "../../../../core/IComponent/IComponent";
import { CirclePicker } from 'react-color';
import Storage from '../../../../helpers/Storage';

class ProfileComponent extends IComponent {
    constructor() {
        super();
        this.store = new Storage();
        this.state = {

        };
        this.handleChangeTop = this.handleChangeTop.bind(this);
        this.handleChangeSide = this.handleChangeSide.bind(this);
        this.handleChangeTopFont = this.handleChangeTopFont.bind(this);
        this.handleChangeSideFont = this.handleChangeSideFont.bind(this);
    }

    async componentDidMount() {
        try {
            
        } catch (err) {
            this.notify('Ha ocurrido un error.')
        }
    }

    handleChangeTop(color) {
        let theme = this.store.GetColors();
        theme.top = color.hex;
        this.store.SetColor(theme);
    }

    handleChangeSide(color) {
        let theme = this.store.GetColors();
        theme.side = color.hex;
        this.store.SetColor(theme);
    }

    handleChangeTopFont(color) {
        let theme = this.store.GetColors();
        theme.tfont = color.hex;
        this.store.SetColor(theme);
    }

    handleChangeSideFont(color) {
        let theme = this.store.GetColors();
        theme.sfont = color.hex;
        this.store.SetColor(theme);
    }

    render() {
        return (
            <div id={'profile'}>
                <h1 className={'title'}>Perfil</h1>
                <div className={'uk-grid'}>
                    <div className={'uk-width-1-1@m uk-margin-bottom'}>
                        <h5>Plan Resumen</h5>                                
                    </div>                                                    
                </div>
            </div>
        );
    }
}

export default ProfileComponent;