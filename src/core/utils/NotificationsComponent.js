import React, { Component } from 'react';
import {MDCSnackbar} from '@material/snackbar';
class NotificationsComponent extends Component{

    constructor() {
        super();
        this.state = {
          typeNotify: false
        };
        this.Show = this.Show.bind(this)
    }

    async componentWillReceiveProps(newProps) {
        if(newProps.typeNotify !== this.props.typeNotify) {
            console.log(newProps.typeNotify !== this.props.typeNotify);
            this.setState({typeNotify: newProps.typeNotify});
        }
    }

    Show(message, action = 'X') {
        try {
            const snackbar =  new MDCSnackbar(document.querySelector('.mdc-snackbar'));
            if(snackbar) {
                snackbar.labelText = message;

                snackbar.open()
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return(
            <div>
                <div className="mdc-snackbar">
                    <div className="mdc-snackbar__surface">
                        <div className="mdc-snackbar__label"
                             role="status"
                             aria-live="polite">
                        </div>
                        <div className="mdc-snackbar__actions">
                            { this.state.typeNotify !== false &&
                                <button className={'mdc-button mdc-snackbar__action button'} uk-spinner></button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default NotificationsComponent;