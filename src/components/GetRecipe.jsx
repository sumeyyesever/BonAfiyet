import { useEffect, useState } from 'react';

export default function GetRecipe({ meal: propMeal }) {
  const [meal, setMeal] = useState({});
  const [mealIngredients, setMealIngredients] = useState([]);

  useEffect(() => {
    // Function to fetch a random meal from the API
    const fetchRandomMeal = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const randomMeal = data.meals?.[0];

        if (randomMeal){
          setMeal(randomMeal);
          localStorage.setItem('meal', JSON.stringify(randomMeal));
          localStorage.setItem('mealDate', new Date().toDateString());
        }
      } catch (error) {
        console.error('Error fetching the random meal:', error);
      }
    };

    // Function to fetch a user-specified meal from the API
    const fetchUserMeal = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${propMeal}`);
        const data = await response.json();
        const userMeal = data.meals?.[0] || null;

        setMeal(userMeal);
      } catch (error) {
        console.error('Error fetching the user meal:', error);
      }
    };

    if (propMeal === "random") {
      // Check if a meal was already fetched today and use it if available
      const savedMeal = localStorage.getItem('meal');
      const savedDate = localStorage.getItem('mealDate');
      const currentDate = new Date().toDateString();

      if (savedMeal && savedDate === currentDate) {
        setMeal(JSON.parse(savedMeal));
      } else {
        fetchRandomMeal();
      }
    } else {
      fetchUserMeal();
    }

  }, [propMeal]);


  useEffect(() => {
    if (meal && Object.keys(meal).length > 0) {
      // Extract ingredients and measurements dynamically
      const ingredientsArray = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measurement = meal[`strMeasure${i}`];
        if (ingredient) ingredientsArray.push(`${measurement} ${ingredient}`);
      }
      setMealIngredients(ingredientsArray);
    }
  }, [meal]);

  if (!meal) return <div className="text-center p-4 font-semibold text-2xl">Loading...</div>; // Handle loading state

  return (
    <div className="sm:mx-24 mx-16 border-l">
      <div className='flex flex-col h-[25%] ml-4'>
        <img className="rounded-full mb-4" width="350px" src={meal.strMealThumb} alt={meal.strMeal} />
      </div>

      <div className="p-4">
        <h1 className="text-4xl mb-2">{meal.strMeal}</h1>
        <h2 className="font-medium">✓ {meal.strCategory} <br /> ✓ {meal.strArea}</h2>
        
        <h3 className="text-xl mt-4 mb-2 font-bold">Ingredients</h3>
        <ul>
          {mealIngredients.map((ingredient, index) => (
            <li className="sm:text-lg text-md" key={index}>⋆ {ingredient}</li>
          ))}
        </ul>

        <h3 className="text-xl mt-4 mb-2 font-bold">Instructions</h3>
        <p className="sm:text-lg text-md whitespace-pre-line">{meal.strInstructions}</p>

        {meal.strYoutube && (
          <h3 className="text-lg font-semibold mt-4">
            ⤷ <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">YouTube Video</a>
          </h3>
        )}

        {meal.strSource && (
          <h3 className="text-lg font-semibold mt-4">
            ⤷ <a href={meal.strSource} target="_blank" rel="noopener noreferrer">Recipe Source</a>
          </h3>
        )}
      </div>
    </div>
  )
}
