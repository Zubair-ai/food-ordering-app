import { Fragment } from "react";
import classes from "./Modal.module.css"
import  ReactDOM  from "react-dom";
const Backdrop=props=>{
    return <div className={classes.backdrop} onClick={props.removeCartHandler}></div>
};
const ModalOverlay=props=>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};
const Modal=props=>{
    const portalElement=document.getElementById("overlays");
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop removeCartHandler={props.removeCartHandler}/>,portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </Fragment>
};
export default Modal;