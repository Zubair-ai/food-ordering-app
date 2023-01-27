import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailiableMeals.module.css";
import MealItem from "./MealItems/MealItems";

const AvailiableMeals = () => {
  const [Meals,setMeals]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
   const fetcMeals= async()=>{
    const response = await fetch("https://first-http-c12b5-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json")
    const responseData=await response.json();
    const loadMeals=[];
    for(const key in responseData){
      loadMeals.push({
        id:key,
        name:responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price
      })
    }
    setMeals(loadMeals);
    }
    fetcMeals();
    setLoading(false)
  },[]);

  if(loading){
    return (<section className={classes.mealsLoading}>
   <p>Loading...</p>
    </section>)
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {Meals.map((meal) => (
            <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>
          ))}
        </ul>
      </Card>
    </section>
  );
};
export default AvailiableMeals;
