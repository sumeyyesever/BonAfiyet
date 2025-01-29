"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [robohashURL, setRobohashURL] = useState("")
  const [formClicked, setFormClicked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    robotType: "",
  });

  // Function to generate RoboHash URL based on user input
  function createURL() {
    let robohashCat = "";
    if (formData.robotType === "monster") robohashCat = "?set=set2";
    else if (formData.robotType === "silly") robohashCat = "?set=set3";
    else if (formData.robotType === "kitty") robohashCat = "?set=set4";
    setRobohashURL(`https://robohash.org/${formData.name}${robohashCat}`);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleClick(e) {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    createURL();
    setFormClicked(true);
  }

  return (
    <main className="max-w-4xl mx-auto">
      <section className="flex flex-col justify-center p-6 items-center gap-8 mb-12">
        <h1 className="text-3xl sm:text-5xl sm:text-center mt-8 text-left">🍒Welcome to BonAfiyet🍸</h1>

        {!formClicked ? (
          //Form section
          <form className="flex flex-col justify-center items-center">
            {/*Name input field*/}
            <div className="mb-4 w-64">
              <label className="block font-semibold sm:font-bold mb-2" htmlFor="username">
                What is your name?
              </label>
              <input
                className="block appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Robot type selection */}  
            <div className="relative w-64">
              <label htmlFor="monsters" className="block font-semibold sm:font-bold mb-2">
                What are you??
              </label>
              <select
                id="monsters"
                name="robotType"
                className="cursor-pointer w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={formData.robotType}
                onChange={handleChange}
              >
                <option value="cute">Cute Robot</option>
                <option value="monster">Monster Robot</option>
                <option value="silly">Silly Robot</option>
                <option value="kitty">Kitty Robot</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              className="bg-transparent text-black-700 font-semibold py-2 px-4 border border-black rounded mt-8"
              onClick={handleClick}
            >
              Send🛸
            </button>
          </form>
        ) : (
          // Post-Submission Section
          <div class="flex flex-col justify-center items-center mb-4 mx-24">
              <h1 className="text-3xl sm:text-4xl my-4 text-center">Hi, {formData.name}👻</h1>
              <img src={robohashURL} alt="Robot" />

              <p className="text-xl text-center sm:text-2xl">
                Thank you for filling out the form.🩵<br />
                Here is your gorgeous robot self, generated just for you by <a href="https://robohash.org/" target="_blank"><i>RoboHash</i></a>🤖<br />
                Now let's go and get your recipe🍜
              </p>

              <Link href="/recipe">
                <button
                  className="bg-transparent text-black-700 font-semibold py-2 px-4 border border-black rounded mt-4">
                  Let's Go👽
                </button>
              </Link>
          </div>
        )}
      </section>
    </main>
  );
}

