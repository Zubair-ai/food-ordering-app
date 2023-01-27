
import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css"
const MealItemForm=(props)=>{
    const [amountIsVaild,setAmountIsVaild]=useState(true)
    const InputRef=useRef();
    const submitHandler=(event)=>{
        event.preventDefault();
        const enteredAmount=InputRef.current.value;
        const enteredAmountNumber=+enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber<1 || enteredAmountNumber>5){
            return setAmountIsVaild(false)
        }
        props.onAddToCart(enteredAmountNumber);
        
    }
return(
    <form onSubmit={submitHandler} className={classes.form}>
        <Input label="Amount" ref={InputRef} input={{
            id:"amount",
            type:"number",
            min:"1",
            max:"5",
            step:"1",
            defaultValue:"1"
        }}/>
        <button>+ Add</button>
        {!amountIsVaild && <p>your entered Amount is InVaild please</p>}
    </form>
)
}; 
export default MealItemForm;