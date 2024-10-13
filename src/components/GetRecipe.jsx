import { useEffect, useState } from 'react';

export default function GetRecipe({ meal: propMeal }) {
  const [meal, setMeal] = useState({});
  const [mealIngredients, setMealIngredients] = useState([]);

  useEffect(() => {
    if (propMeal === "random") {
      const fetchRandomMeal = async () => {
        try {
          const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
          const data = await response.json();
          const randomMeal = data.meals[0];
          setMeal(randomMeal);

          localStorage.setItem('meal', JSON.stringify(randomMeal));
          localStorage.setItem('mealDate', new Date().toDateString());
        } catch (error) {
          console.error('Error fetching the random meal:', error);
        }
      };

      const savedMeal = localStorage.getItem('meal');
      const savedDate = localStorage.getItem('mealDate');
      const currentDate = new Date().toDateString();

      if (savedMeal && savedDate === currentDate) {
        setMeal(JSON.parse(savedMeal));
      } else {
        fetchRandomMeal();
      }
    } else {
      const fetchUserMeal = async () => {
        try {
          console.log(propMeal);

          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${propMeal}`);
          const data = await response.json();
          const userMeal = data.meals ? data.meals[0] : null;

          if (userMeal) {
            setMeal(userMeal);
          } else {
            console.error('Meal not found');
          }
        } catch (error) {
          console.error('Error fetching the user meal:', error);
        }
      };

      fetchUserMeal();
    }
  }, [propMeal]);

  useEffect(() => {
    if (meal && Object.keys(meal).length > 0) {
      const ingredientsArray = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measurement = meal[`strMeasure${i}`];
        if (ingredient) ingredientsArray.push(`${measurement} ${ingredient}`);
      }
      setMealIngredients(ingredientsArray);
    }
  }, [meal]);

  return (
    <div>
      <div className="mx-24 border-l">
        <div className='flex flex-col h-[25%] ml-4'>
          <img className="rounded-full mb-4" width="350px" src={meal.strMealThumb} />
        </div>

        <div className=' p-4'>
          <h1 className="text-4xl mb-2">{meal.strMeal}</h1>
          <h1 className="font-medium">✓ {meal.strCategory}<br /> ✓ {meal.strArea}</h1>
          <h1 className="text-xl mt-4 mb-2 font-bold">Ingredients</h1>
          <ul>
            {mealIngredients.map((ingredient, index) => (
              <li className="text-lg " key={index}>⋆ {ingredient}</li>
            ))}
          </ul>

          <h1 className="text-xl mt-4 mb-2 font-bold">Instruction</h1>
          <h1 className="text-lg">{meal.strInstructions}</h1>
          <h1 className="text-lg font-semibold mt-4">⤷ <a href={meal.strYoutube} target="_blank" className="">Youtube Video</a></h1>
          <h1 className="text-lg font-semibold mt-4">⤷ <a href={meal.strSource} target="_blank" className="">Recipe Source</a></h1>
        </div>
      </div>
    </div>
  )
}
