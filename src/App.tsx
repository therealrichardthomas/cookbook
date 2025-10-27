import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import PageNotFound from "./pages/PageNotFound";

// See https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
import type { Recipe } from "./types";
import localRecipes from "./recipes.json";

import { db } from "./firebaseConfig";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";


function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // TODO: Comment out this useEffect and uncomment out the second useEffect
  useEffect(() => {
    // the as Recipe[] is just saying to TypeScript: "this is a Recipe array, source: bro trust me"
    setRecipes(localRecipes as Recipe[]);
  }, []); // empty dependency array because we only run this on mount!
  

  /*
  useEffect(() => {
    // TODO: Create a reference to the recipes collection

    // TODO: Use onSnapshot to listen to any changes to the recipes collection.
    
    // Hint 1: Pass two things to onSnapshot: the reference to the recipes collection
    // you just made and an arrow function (snapshot) => { ... }.
    
    // Hint 2: Inside the arrow functino you just made, have two lines:
    //  - First line: The snapshot is of type QuerySnapshot. Viewing the documentation,
    //    note that there is a docs property you can use to get the documents of the collection here.
    //    Then map over these documents so that each one becomes an object with the document data (use the spread
    //    operator) and an id of doc.id
    //      It should look something like this (note it's not complete):
    //         const recipesData = map((doc) => ({
    //            // Get the data of the QueryDocumentSnapshot
    //            // Get the id of the QueryDocumentSnapshot
    //          })) as Recipe[];
    //  - Second line: Set the recipes state variable to recipesData
    

    // TODO: Return an arrow function that itself returns the function returned by snapshot.
    //    What you're doing here is returning a function that will be run when the component unmounts
    //     Note that if you try calling the unsubscribe function then you're not actually returning it.
  }, []);
  */
  
  

  // TODO: Comment out this handleAddRecipe and uncomment out the second one
  const handleAddRecipe = (recipe: Omit<Recipe, "id">) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
    };

    setRecipes((oldRecipes) => [...oldRecipes, newRecipe]);
  };
  

  /*
  // One of the provided links in the README.md explains what this Omit thing is doing
  const handleAddRecipe = async (recipe: Omit<Recipe, "id">) => {
    // TODO: Create a try catch statement.
    // TODO: In the catch statement, add console.error("Error adding document:", error);
    // TODO: In the first line of the try statement, get a reference to the recipes collection
    // TODO: For the seocnd line of the try statement,
    //       add the parameter recipe to the recipes collection using the function learned in class.
    //      DO NOT FORGET TO USE AWAIT!!!! the function you'll use is ASYNCHRONOUS.
    //      so you need to use the await keyword and the function it's in must be async (we've already done
    //             the second part for you)
  };
  */
  
  // TODO: Comment out this handleDeleteRecipe and uncomment out the second one
  const handleDeleteRecipe = (id: string) => {
    setRecipes((oldRecipes) => oldRecipes.filter((recipe) => recipe.id !== id));
  };
  
  /*
  const handleDeleteRecipe = async (id: string) => {
    // TODO: Create a try catch statement.
    // TODO: In the catch statement, add console.error("Error deleting document:", error);
    // TODO: In the first line of the try statement, get a reference to the document
    //       from the recipes collection with the id passed into this function.
    // TODO: For the second line of the try statement, use the function we learned
    //       in class to delete the specified document.
    //            DONT FORGET TO USE AWAIT (this is an async function)
  };
  */
  

  // TODO: Comment out this handleToggleFavorite and uncomment out the second one
  const handleToggleFavorite = (id: string, currentIsFavorite: boolean) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isFavorite: !currentIsFavorite }
          : recipe
      )
    );
  };
  

  /*
  const handleToggleFavorite = async (id: string, currentIsFavorite: boolean) => {
    // TODO: Create a try catch statement.
    // TODO: In the catch statement, add console.error("Error updating document:", error);
    // TODO: In the first line of the try statement, get a reference to the document
    //       from the recipes collection with the id passed into this function.
    // TODO: For the second line of the try statement, use the function we learned in
    //       class to update the specified document.
    //        DONT FORGET TO USE AWAIT (this is an asynchronous function)
    //         Hint: Just use ! (logical not)
    //           Remember that the object you're passing in
    //            will have the key(s) of what you're trying to update. 
  };
  */

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe-list" element={<RecipeList 
          recipes={recipes}
          handleAddRecipe={handleAddRecipe}
          handleDeleteRecipe={handleDeleteRecipe}
          handleToggleFavorite={handleToggleFavorite}
        />} />
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
