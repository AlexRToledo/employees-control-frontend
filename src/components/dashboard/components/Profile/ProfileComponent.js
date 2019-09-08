import React from 'react';
import IComponent from "../../../../core/IComponent/IComponent";
import { CirclePicker } from 'react-color';
import Storage from '../../../../helpers/Storage';
import {ThemeContext} from '../../../../helpers/Context';

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
            <ThemeContext.Consumer>
                {({colors, setColors}) => (
                    <div id={'profile'}>
                        <h1 className={'title'} onClick={setColors}>Perfil</h1>
                        <div className={'uk-grid'}>
                            <div className={'uk-width-1-1@m uk-margin-bottom'}>
                                <h5>Plan Resumen</h5>                                
                            </div>                            
                            <div className={'uk-width-1-1@m uk-margin-top'}>
                                <h5>Colores Tema</h5>
                                <div className={'uk-grid uk-flex-wrap p-side-3'}>
                                    <div className={'uk-width-1-4@m'}>
                                        <h6>Color Menu Arriba</h6>
                                        <CirclePicker colors={["#fff", "#f44336", "#4caf50", "#2196f3", "#009688", "#9c27b0", "#ffc107", "grey"]}
                                                      color={ this.state.color }
                                                      onChange={ this.handleChangeTop }
                                                      onChangeComplete={setColors}>
                                        </CirclePicker>
                                    </div>
                                    <div className={'uk-width-1-4@m'}>
                                        <h6>Color Letras Menu Arriba</h6>
                                        <CirclePicker colors={["#fff", "#f44336", "#4caf50", "#2196f3", "#009688", "#9c27b0", "#ffc107", "grey"]}
                                                      color={ this.state.color }
                                                      onChange={ this.handleChangeTopFont }
                                                      onChangeComplete={setColors}>
                                        </CirclePicker>
                                    </div>
                                    <div className={'uk-width-1-4@m'}>
                                        <h6>Color Menu Lateral</h6>
                                        <CirclePicker colors={["#fff", "#f44336", "#4caf50", "#2196f3", "#009688", "#9c27b0", "#ffc107", "grey"]}
                                                      color={ this.state.color }
                                                      onChange={ this.handleChangeSide }
                                                      onChangeComplete={setColors}>
                                        </CirclePicker>
                                    </div>
                                    <div className={'uk-width-1-4@m'}>
                                        <h6>Color Letras Menu Lateral</h6>
                                        <CirclePicker colors={["#fff", "#f44336", "#4caf50", "#2196f3", "#009688", "#9c27b0", "#ffc107", "grey"]}
                                                      color={ this.state.color }
                                                      onChange={ this.handleChangeSideFont }
                                                      onChangeComplete={setColors}>
                                        </CirclePicker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default ProfileComponent;