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


  function createURL() {
    let robohashCat = "";
    if (formData.robotType === "monster") {
      robohashCat = "?set=set2";
    }
    else if (formData.robotType === "silly") {
      robohashCat = "?set=set3";
    }
    else if (formData.robotType === "kitty") {
      robohashCat = "?set=set4";
    }
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
    <>
      <h1 className="text-5xl text-center">🍒Welcome to BonAfiyet🍸</h1>
      {!formClicked ?
        <div className="flex flex-col h-screen">

          <div className="mt-12">
            <form action="" className="flex flex-col justify-center items-center">
              <div className="mb-4 w-64">
                <label className="block font-bold mb-2" htmlFor="username">
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

              <div className="inline-block relative w-64">
                <label htmlFor="monsters" className="block font-bold mb-2">
                  What are you??
                </label>
                <select
                  id="monsters"
                  name="robotType"
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.robotType}
                  onChange={handleChange}
                >
                  <option value="cute">Cute Robot</option>
                  <option value="monster">Monster Robot</option>
                  <option value="silly">Silly Robot</option>
                  <option value="kitty">Kitty Robot</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-[30px]">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <button
                className="bg-transparent text-black-700 font-semibold py-2 px-4 border border-black rounded mt-8"
                onClick={handleClick}
              >
                Send🛸
              </button>

            </form>
            <Link href="/recipe">
              <div className="flex justify-center mt-8">
                <button
                  className="bg-transparent text-black-700 font-semibold py-2 px-4 border border-black rounded mt-4">
                  Recipe Page
                </button>
              </div>
            </Link>
          </div>
        </div>
        :
        <div class="flex flex-col justify-center items-center mb-4 mx-24">
          <div className="mt-4">
            <h1 className="text-4xl my-4 text-center">Hi, {formData.name}👻</h1>
            <img src={robohashURL} alt="Robot" />
          </div>
          <div class="mt-4">
            <p className="text-2xl">Thank you for filling out the form.🩵<br />
              Here is your gorgeous robot self, generated just for you by <a href="https://robohash.org/" target="_blank"><i>RoboHash</i></a>🤖<br />
              Now let's go and get your recipe🍜</p>
            <Link href="/recipe">
              <button
                className="bg-transparent text-black-700 font-semibold py-2 px-4 border border-black rounded mt-4">
                Let's Go👽
              </button>
            </Link>
          </div>
        </div>
      }
    </>
  );
}

