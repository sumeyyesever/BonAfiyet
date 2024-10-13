
"use client"
import { useState } from "react"
import GetRecipe from "@/components/GetRecipe";

export default function Page() {
  const [inputClicked, setInputClicked] = useState(false);
  const [userMeal, setUserMeal] = useState("");

  const handleChange = (e) => {
    setUserMeal(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setInputClicked(true);
  }

  return (
    <div>
      <div className="flex items-center justify-center h-[250px]">
        <div className="flex items-center space-x-4">
          <label className="font-bold text-gray-800 text-lg" htmlFor="search_recipe">
            What are you cooking?
          </label>
          <input
            className="block appearance-none border border-gray-300 rounded w-64 h-12 py-2 px-4 text-gray-700 leading-tight focus:outline-none"
            id="username"
            type="text"
            name="name"
            value={userMeal}
            onChange={handleChange}
          />
          <button
            className="bg-black text-white font-semibold py-2 px-4 rounded-lg focus:outline-none" onClick={handleClick}>
            Search
          </button>
        </div>
      </div>
      {inputClicked ? <GetRecipe meal={userMeal} /> : <GetRecipe meal="random" />}
    </div>
  )
}
