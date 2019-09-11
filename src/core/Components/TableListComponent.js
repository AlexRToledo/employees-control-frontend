import  React, {Component} from 'react';

class TableListComponent extends Component{
    constructor() {
        super();
        this.state = {
            data: [],
            loading: true
        };
        this.handlerEdit = this.handlerEdit.bind(this);
        this.handlerView = this.handlerView.bind(this);
        this.handlerRemove = this.handlerRemove.bind(this);
    }

    componentWillReceiveProps(props) {
        const {data} = props;
        this.setState({data: data, loading: false});
    }

    handlerEdit(id) {
        this.props.onSetEditPage(id)
    }

    handlerRemove(id) {
        this.props.onRemove(id);
    }

    handlerView(id) {
        this.props.onSetViewPage(id);
    }

    showElementTableHead() {
        let aux = [];
        for(let key of this.props.data_keys) {
            aux.push(<th key={key.label}>{key.label}</th>)
        }
        aux.push(<th key={'headactions'}></th>);
        return (aux);
    }

    showElementTableBody(element) {
        const aux = [];
        for(let key of this.props.data_keys) {
            if(key.date) {
                aux.push(
                    <td key={key.field}>{new Date(element[key.field]).toLocaleDateString()}</td>
                )
            } else if (typeof element[key.field] === "boolean") {
                if (element[key.field] === true) {
                    aux.push(
                        <td key={key.field}>{key.options[true]}</td>
                    )
                } else {
                    aux.push(
                        <td key={key.field}>{key.options[false]}</td>
                    )
                }
            }
            else {
                aux.push(
                    <td key={key.field}>{element[key.field]}</td>
                )
            }
        }
        return(aux);
    }

    showElementMenuNavActions(element) {
        return(
            <div className={'table-actions'}>
                <ul className="uk-iconnav">
                    {this.props.onSetViewPage !== undefined &&
                        <li key={1}><a href="#" className={'uk-icon-button'} uk-icon="icon: file-text" uk-tooltip="Ver" onClick={() => this.handlerView(element.id)}></a></li>
                    }
                    {this.props.onSetEditPage !== undefined &&
                        <li key={2}><a href="#" className={'uk-icon-button'} uk-icon="icon: file-edit" uk-tooltip="Editar" onClick={() => this.handlerEdit(element.id)}></a></li>
                    }
                    {this.props.onRemove !== undefined &&
                        <li key={3}><a href="#" className={'uk-icon-button'} uk-icon="icon: trash" uk-tooltip="Elimiar" onClick={() => this.handlerRemove(element.id)}></a></li>
                    }
                </ul>
            </div>
        )
    }

    showElemtMenuDropActions(element) {
        return(
            <div className={'table-actions'}>
                <a type="button"><span className={'uk-icon'} uk-icon="menu"></span></a>
                <div className={'uk-dropdown'} uk-dropdown="pos: right-center">
                    <ul className="uk-nav uk-dropdown-nav">
                        {this.props.onSetViewPage !== undefined &&
                            <li><a href="#" onClick={() => this.handlerView(element.id)}><span className={'uk-icon'} uk-icon="file-text"></span> View</a></li>
                        }
                        {this.props.onSetEditPage !== undefined &&
                            <li><a href="#" onClick={() => this.handlerEdit(element.id)}><span className={'uk-icon'} uk-icon="file-edit"></span> Edit</a></li>
                        }
                        {this.props.onRemove !== undefined &&
                            <li><a href="#" onClick={() => this.handlerRemove(element.id)}><span className={'uk-icon'} uk-icon="trash"></span> Remove</a></li>
                        }                                            
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={'uk-flex uk-flex-center uk-flex-wrap uk-grid'} uk-height-match={"target: > div > .uk-card"} style={{overflow: 'overlay'}}>
                { this.state.loading === true ? (
                    <div className={'uk-flex uk-flex-column uk-flex-middle'}>
                        <div uk-spinner="ratio: 4.5"></div>
                        Cargando
                    </div>
                ) : (
                  this.state.data && this.state.data.length > 0 ? (
                      <div className={'uk-card uk-card-default uk-card-body uk-margin uk-margin-left'} style={{width: '100%'}}>
                          <table className={`uk-table uk-table-responsive ${this.props.table_config}  uk-table-divider`}>
                              <thead>
                              <tr>
                                  {this.showElementTableHead()}
                              </tr>
                              </thead>
                              <tbody>
                              {this.state.data.map((element, elementIndex) => {
                                      return <tr key={elementIndex}>
                                          {this.showElementTableBody(element)}
                                          <td key={'actions'}>
                                              {this.props.card_menu === 'drop' ? (
                                                  this.showElemtMenuDropActions(element)
                                              ) : (
                                                  this.showElementMenuNavActions(element)
                                              )}
                                          </td>
                                      </tr>
                                  }
                              )}
                              </tbody>
                          </table>
                      </div>
                    ) : (
                        <h2>No hay resultados.</h2>
                    )
                )}
            </div>
        )
    }

}

export default TableListComponent;