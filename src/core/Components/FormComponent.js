import  React from 'react';
import IComponent from "../IComponent/IComponent";

class FormComponent extends IComponent{
    constructor() {
        super();
    }

    render() {
        return(
            <section>
                {this.props.nocard === false ? (
                    <form className={'uk-form-stacked'} onSubmit={this.props.handlerSubmit}>
                        {this.props.children}
                    </form>
                ) : (
                    <div className={'uk-card uk-card-default uk-card-body'}>
                        <form className={'uk-form-stacked'} onSubmit={this.props.handlerSubmit}>
                            {this.props.children}
                        </form>
                    </div>
                )}
            </section>
        )
    }

}

export default FormComponent;