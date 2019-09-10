import React from 'react';
import IComponent from "../IComponent/IComponent";

class SearchFormComponent extends IComponent {
    constructor() {
        super();
    }

    handlerSearch() {
        const new_state = {...this.state};
        this.props.setSearch(new_state)
    }

    render() {
        return (
            <form className={'uk-search uk-search-default' + this.state.inline ? 'uk-inline' : '' }>
                <p className={'title'}>
                    { this.props.title ? (
                        this.props.title
                    ) : (
                        'Search Filters'
                    )}
                </p>
                <div className={'uk-margin-bottom'}>
                    {this.props.keys.map((ele, key) => {
                        return  <div key={key} className="uk-margin">
                            {ele.options ? (
                                <select className="uk-select" name={ele.field} onChange={this.handleFields.bind(this)}>
                                    <option value={''} disabled={true} selected={true}>Select</option>
                                    {Object.keys(ele.options).map((key, i) =>
                                        <option key={i} value={key}>{ele.options[key]} </option>
                                    )}
                                </select>
                            ):(
                                <div className="uk-form-controls">
                                    <input className="uk-input uk-form-width-medium uk-form-small" id="form-stacked-text" type="text" name={ele.field} placeholder={ele.label} onChange={this.handleFields.bind(this)} required/>
                                </div>
                            )}
                        </div>
                    })}
                </div>
                <ul className={'uk-iconnav'}>
                    <li><a className={'uk-button uk-button-default'} onClick={() => this.handlerSearch()}><span uk-icon="icon: search"></span> Search</a></li>
                </ul>
            </form>
        )
    }
}

export default SearchFormComponent;