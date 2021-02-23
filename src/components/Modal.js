import React from "react";

export default class Modal extends React.Component {

    constructor({ message, close }) {
        super();
        this.state = {
            message: message,
            isOpen: true,
            close: close
        }
    }

    close() {
        this.state.close();
    }

    render() {
        const style = {
            div: {
                position: "fixed",
                left: 0,
                right: 0,
                top: "10rem",
                zIndex: 1000
            }
        }
        return (
            <div tabIndex="-1" role="dialog" style={style.div}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Ошибка обработки</h5>
                        </div>
                        <div className="modal-body">
                            <p>{this.state.message}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.close()}>Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}