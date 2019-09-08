import React from 'react';
import IComponent from "../IComponent/IComponent";

class ModalComponent extends IComponent {
    constructor() {
        super();
        this.handlerAction = this.handlerAction.bind(this);
    }

    handlerAction() {
        this.props.handlerModalAction()
    }

    render() {
        return (
            <div id={this.props.modalID} uk-modal={'true'} esc-close={this.props.esc ? 'true' : 'false'} bg-close={this.props.bg ? 'true' : 'false'}>
                <div className="uk-modal-dialog uk-modal-body">
                    <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                    {this.props.title && (
                        <h2 className="uk-modal-title">{this.props.title}</h2>
                    )}
                    {this.props.children}
                    {this.props.actions && (
                        <p className="uk-text-right">
                            <button className="uk-button uk-button-primary uk-margin-small-right uk-modal-close" type="button" onClick={() => this.handlerAction()}>Aceptar</button>
                            <button className="uk-button uk-button-default uk-modal-close" type="button">Cancelar</button>
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

export default ModalComponent;