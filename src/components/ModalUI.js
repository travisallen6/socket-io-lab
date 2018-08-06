import React, { Fragment } from 'react';

const Modal = (props) => {
    return (
        <Fragment>
            <div className="modal-shadow">
            </div>
            <div className="modal-position">
                <div className="modal-card">
                    { props.children }
                </div>
            </div>
        </Fragment> 
     );
}
 
export default Modal;