import  React from 'react';
import IComponent from "../IComponent/IComponent";

class PaginationComponent extends IComponent{
    constructor() {
        super();
        this.handlerSetPage = this.handlerSetPage.bind(this);
        this.printPages = this.printPages.bind(this);
    }

    change(index){
        if(index > 0 && index <= this.pages) {
            this.range(index);
        }
    }

    async handlerSetPage(page) {
        this.props.setPage(page);
    }

    printPages(cut) {
        let aux = [];
        while (cut <= (this.props.page + 4) && cut <= this.props.pages) {
            let counter = cut;
            if (cut === this.props.page)
                aux.push(<li key={cut} className={'uk-active'}><a>{cut}</a></li>);
            else
                aux.push(<li key={cut}><a onClick={() => this.handlerSetPage(counter)}>{cut}</a></li>);
            if (cut === this.props.page + 4 && cut < this.props.pages)
                aux.push(<li key={cut} className={'uk-disabled'}><span>...</span></li>);
            cut++;
        }
        return (aux);
    }


    render() {
        let cut = (this.props.page > 5 ? this.props.page > 5 - 4 : 1);
        return (
            <div className={'uk-flex uk-flex-center'}>
                { this.props.pages > 0 &&
                    <ul className={'uk-pagination uk-flex-center uk-margin'}>
                        { this.props.page === 1 ? (
                            <li className={'uk-disabled'}><a href="#"><span className={"uk-margin-small-right uk-pagination-previous"}></span> Previous</a></li>
                        ) : (
                            <li><a onClick={() => this.handlerSetPage(1)}><span className={"uk-margin-small-right uk-pagination-previous"}></span> Previous</a></li>
                        )}
                        { cut !== 1 &&
                          <li className={'uk-disabled'}><span>...</span></li>
                        }
                        {this.printPages(cut)}
                        { this.props.page === this.props.pages ? (
                            <li className={'uk-disabled'}><a href="#">Next <span className={"uk-margin-small-left uk-pagination-next"}></span></a></li>
                        ) : (
                            <li><a onClick={() => this.handlerSetPage(this.props.pages)}>Next <span className={"uk-margin-small-left uk-pagination-next"}></span></a></li>
                        )}
                    </ul>
                }
            </div>
        )
    }

}

export default PaginationComponent;