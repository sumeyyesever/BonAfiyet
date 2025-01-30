
"use client"
import { useState } from "react"
import GetRecipe from "@/components/GetRecipe";

export default function Page() {
  const [inputClicked, setInputClicked] = useState(false);
  const [userMeal, setUserMeal] = useState("");

  const handleChange = (e) => setUserMeal(e.target.value);

  const handleClick = (e) => {
    e.preventDefault();
    setInputClicked(true);
  }

  return (
    <main className="max-w-4xl mx-auto min-h-screen mt-8">
      <section className="flex flex-col justify-center space-x-4 mb-16">
        <form className="max-w-4xl mx-auto text-xl sm:text-2xl flex flex-col sm:flex-row items-center gap-4">
          <label htmlFor="search_recipe">
            What are you cooking?
          </label>
          <input
            className="border border-gray-300 rounded w-64 h-12 py-2 px-4 text-gray-700 leading-tight focus:outline-none"
            id="recipe_search"
            type="text"
            name="name"
            value={userMeal}
            onChange={handleChange}
          />
          <button
            className="bg-black text-white text-md py-2 px-4 rounded-lg focus:outline-none" onClick={handleClick}>
            Search
          </button>
        </form>

        <p className="text-gray-600 text-center sm:text-lg text-sm mt-4 mb-16">
          Some meal ideas: <span className="font-semibold">Vegan Lasagna, Chicken Curry, Sushi, Tacos, Pasta Carbonara</span>.
        </p>
        
      </section>
      {inputClicked ? <GetRecipe meal={userMeal} /> : <GetRecipe meal="random" />}
    </main>
  )
}


