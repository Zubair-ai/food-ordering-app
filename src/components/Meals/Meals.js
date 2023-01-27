import { Fragment } from "react";
import AvailiableMeals from "./AvailiableMeals";
import MealsSummary from "./MealsSummary";


const Meals=()=>{
    return (
        <Fragment>
            <MealsSummary/>
            <AvailiableMeals/>
        </Fragment>
    )

};
export default Meals;