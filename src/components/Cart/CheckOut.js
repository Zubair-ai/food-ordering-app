import { useState } from "react";
import classes from "./CheckOut.module.css";
const isInputEmpty = (value) => value.trim().length !== 0;
const isInputhaveChars = (value) => value.trim().length !== 5;
const CheckOut = (props) => {
  const [Name, setName] = useState("");
  const [Street, setStreet] = useState("");
  const [Postal, setPostal] = useState("");
  const [City, setCity] = useState("");

  const [inputisVaild, setInputIsVaild] = useState({
    name: true,
    city: true,
    postal: true,
    street: true,
  });

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const streetHandler = (event) => {
    setStreet(event.target.value);
  };
  const postalHandler = (event) => {
    setPostal(event.target.value);
  };
  const cityHandler = (event) => {
    setCity(event.target.value);
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = Name;
    const enteredStreet = Street;
    const enteredPostal = Postal;
    const enteredCity = City;
    const invaildName = isInputEmpty(enteredName);
    const invaildStreet = isInputEmpty(enteredStreet);
    const invaildPostal = isInputhaveChars(enteredPostal);
    const invaildCity = isInputEmpty(enteredCity);

    setInputIsVaild({
      name: invaildName,
      city: invaildCity,
      postal: invaildPostal,
      street: invaildStreet,
    });
    
    // let formIsVaild= true;
    // if(invaildName && invaildPostal && invaildCity && invaildStreet){
    //     formIsVaild=false;
    // }
    setName("");
    setCity("");
    setPostal("");
    setStreet("");
  };
  const nameClass = `${classes.control} ${
    !inputisVaild.name ? classes.invalid : ""
  }`;
  const streetClass = `${classes.control} ${
    !inputisVaild.name ? classes.invalid : ""
  }`;
  const postalClass = `${classes.control} ${
    !inputisVaild.name ? classes.invalid : ""
  }`;
  const cityClass = `${classes.control} ${
    !inputisVaild.name ? classes.invalid : ""
  }`;

  props.onConfirm({
    name: Name,
    street: Street,
    postal: Postal,
    city: City,
  });

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input onChange={nameHandler} type="text" id="name" />
        {!inputisVaild.name && <p>enter your vaild name</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input onChange={streetHandler} type="text" id="street" />
        {!inputisVaild.street && <p>enter your vaild street</p>}
      </div>
      <div className={postalClass}>
        <label htmlFor="postal">Postal Code</label>
        <input onChange={postalHandler} type="text" id="postal" />
        {!inputisVaild.postal && <p>enter your vaild Postal address</p>}
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input onChange={cityHandler} type="text" id="city" />
        {!inputisVaild.city && <p>enter your vaild City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button onClick={props.onConfirm}>Confirm</button>
      </div>
    </form>
  );
};
export default CheckOut;
