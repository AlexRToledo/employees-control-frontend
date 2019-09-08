import React, { Component } from 'react';
import ModalComponent from "../../core/Components/ModalComponent";

class CardListComponent extends Component {
    constructor () {
        super();
        this.state = {
            data: [],
            loading: true,
            selected: ''
        };
        this.handlerEdit = this.handlerEdit.bind(this);
        this.handlerView = this.handlerView.bind(this);
        this.handlerRemove = this.handlerRemove.bind(this);
        this.handlerSelectedID = this.handlerSelectedID.bind(this);
    }

    componentWillReceiveProps(props) {
        const { data } = props;
        this.setState({ data: data, loading: false });
    }

    handlerEdit(id) {
        this.props.onSetEditPage(id)
    }

    handlerRemove() {
        const id = this.state.selected;
        this.setState({
            selected: ''
        });
        this.props.onRemove(id);
    }

    handlerSelectedID(id) {
        this.setState({
            selected: id
        })
    }

    handlerView(id) {
        this.props.onSetViewPage(id);
    }

    showElementTitleValue(element) {
        let aux = '';
        if (this.props.data_title.length > 1) {
            for (let t of this.props.data_title) {
                aux += ` ${element[ t.field ]}`
            }
        }
        if (this.props.data_title.length === 1) {
            aux = ` ${element[ this.props.data_title[ 0 ].field ]}`
        }
        return aux === '' ? (
            <h3 className="uk-card-title"></h3>
        ) : (
                <h3 className="uk-card-title">{ aux }</h3>
            );
    }

    showElementBodyValue(element) {
        const aux = [];
        for (const value in element) {
            for (let key of this.props.data_keys) {
                if (value === key.field) {
                    if (key.date) {
                        aux.push(
                            <div key={ value }><strong>{ key.label }</strong>: { new Date(element[ value ]).toLocaleDateString() }</div>
                        )
                    } else if (typeof element[ value ] === "boolean") {
                        if (element[ value ] === true) {
                            aux.push(
                                <div key={ value }><strong>{ key.label }</strong>: { key.options[ true ] }</div>
                            )
                        } else {
                            aux.push(
                                <div key={ value }><strong>{ key.label }</strong>: { key.options[ false ] }</div>
                            )
                        }
                    }
                    else {
                        aux.push(
                            <div key={ value }><strong>{ key.label }</strong>: { element[ value ] }</div>
                        )
                    }
                }
            }
        }
        return (aux);
    }

    showElementMenuNavActions(element) {
        return (
            <div className={ 'top-actions' }>
                <ul className="uk-iconnav">
                    { this.props.onSetViewPage !== undefined &&
                        this.props.viewCardClick === false &&
                            <li><a href="#" className={'uk-icon-button'} uk-icon="icon: file-text" uk-tooltip="Ver" onClick={ () => this.handlerView(element._id) }></a></li>
                    }
                    <li><a href="#" className={'uk-icon-button'} uk-icon="icon: file-edit" uk-tooltip="Editar" onClick={ () => this.handlerEdit(element._id) }></a></li>
                    <li><a href="#" className={'uk-icon-button'} uk-icon="icon: trash" uk-tooltip="Elimiar" uk-toggle="target: #confirm" onClick={ () => this.handlerSelectedID(element._id) }></a></li>
                </ul>
            </div>
        )
    }

    showElemtMenuDropActions(element) {
        return (
            <div className={ 'top-actions' }>
                <a type="button"><span className={ 'uk-icon' } uk-icon="menu"></span></a>
                <div className={ 'uk-dropdown' } uk-dropdown="pos: right-center">
                    <ul className="uk-nav uk-dropdown-nav">
                        { this.props.onSetViewPage !== undefined &&
                            this.props.viewCardClick === false &&
                                <li><a href="#" onClick={ () => this.handlerView(element._id) }><span className={ 'uk-icon' } uk-icon="file-text"></span> Ver</a></li>
                        }
                        <li><a href="#" onClick={ () => this.handlerEdit(element._id) }><span className={ 'uk-icon' } uk-icon="file-edit"></span> Editar</a></li>
                        <li><a href="#" uk-toggle="target: #confirm" onClick={ () => this.handlerSelectedID(element._id) }><span className={ 'uk-icon' } uk-icon="trash"></span> Eliminar</a></li>
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div id={'card-list'} className={ 'uk-flex uk-flex-center uk-flex-wrap uk-grid' } uk-height-match={ "target: > div > .uk-card" }>
                <ModalComponent title={ 'Esta seguro que desea realizar esta accion?' } modalID={ 'confirm' } actions={ true } handlerModalAction={ this.handlerRemove }></ModalComponent>
                { this.state.loading === true ? (
                    <div className={ 'uk-flex uk-flex-column uk-flex-middle' }>
                        <div uk-spinner="ratio: 4.5"></div>
                        Cargando
                    </div>
                ) : (
                        this.state.data && this.state.data.length > 0 ? (
                            this.state.data.map((element, elementIndex) => {
                               if (this.props.viewCardClick === true ) {
                                   return <div key={ elementIndex } className={ `${this.props.width}` }>
                                       { this.props.card_menu === 'drop' ? (
                                           this.showElemtMenuDropActions(element)
                                       ) : (
                                           this.showElementMenuNavActions(element)
                                       ) }
                                       <div className={ 'uk-card uk-card-default uk-card-small uk-card-body uk-margin-bottom' } onClick={ () => this.handlerView(element._id)}>
                                           { this.showElementTitleValue(element) }
                                           { this.showElementBodyValue(element) }
                                       </div>
                                   </div>
                               } else {
                                   return <div key={ elementIndex } className={ `${this.props.width}` }>
                                       { this.props.card_menu === 'drop' ? (
                                           this.showElemtMenuDropActions(element)
                                       ) : (
                                           this.showElementMenuNavActions(element)
                                       ) }
                                       <div className={ 'uk-card uk-card-default uk-card-small uk-card-body uk-margin-bottom' }>
                                           { this.showElementTitleValue(element) }
                                           { this.showElementBodyValue(element) }
                                       </div>
                                   </div>
                               }
                            })
                        ) : (
                                <h2>No hay resultados.</h2>
                            )
                    ) }
            </div>
        )
    }

}

export default CardListComponent;