import { useEffect, useState } from 'react'

import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";



const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-ecf2e-default-rtdb.firebaseio.com/meals.json');

      console.log(response);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      };

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          description: responseData[key].description,
          name: responseData[key].name,
          price: responseData[key].price,
        })
      };

      setIsLoading(false)
      setMeals(loadedMeals);

      
    };
    
      fetchMeals().catch((error) => { 
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, []);

  if (isLoading) {
    return (<section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>)
  };

  if(httpError){
    return (<section className={classes.mealsError}>
      <p>{httpError}</p>
    </section>)
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      description={meal.description}
      name={meal.name}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
