import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import PageNotFound from "./pages/PageNotFound";

// See https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
import type { Recipe } from "./types";
// import localRecipes from "./recipes.json";

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

  // useEffect(() => {
  //   // the as Recipe[] is just saying to TypeScript: "this is a Recipe array, source: bro trust me"
  //   setRecipes(localRecipes as unknown as Recipe[]);
  // }, []); // empty dependency array because we only run this on mount!
  

  useEffect(() => {
    const recipesCollectionRef = collection(db, 'recipes');

    const unsubscribe = onSnapshot(recipesCollectionRef, (snapshot) => {
      const recipesData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as Recipe[];

      setRecipes(recipesData);
    });
  
    return () => {
      unsubscribe();
    }
  }, []);

  // const handleAddRecipe = (recipe: Omit<Recipe, "id">) => {
  //   const newRecipe: Recipe = {
  //     ...recipe,
  //     id: Date.now().toString(),
  //   };

  //   setRecipes((oldRecipes) => [...oldRecipes, newRecipe]);
  // };
  

  // One of the provided links in the README.md explains what this Omit thing is doing
  const handleAddRecipe = async (recipe: Omit<Recipe, "id">) => {
    try {
      const recipesCollectionRef = collection(db, 'recipes');
      await addDoc(recipesCollectionRef, recipe);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  
  // const handleDeleteRecipe = (id: string) => {
  //   setRecipes((oldRecipes) => oldRecipes.filter((recipe) => recipe.id !== id));
  // };
  
  const handleDeleteRecipe = async (id: string) => {
    try {
      const recipeToDeleteRef = doc(db, "recipes", id);
      await deleteDoc(recipeToDeleteRef);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  

  // const handleToggleFavorite = (id: string, currentIsFavorite: boolean) => {
  //   setRecipes((prevRecipes) =>
  //     prevRecipes.map((recipe) =>
  //       recipe.id === id
  //         ? { ...recipe, isFavorite: !currentIsFavorite }
  //         : recipe
  //     )
  //   );
  // };
  

  const handleToggleFavorite = async (id: string, currentIsFavorite: boolean) => {
    try {
      const recipeToUpdateRef = doc(db, "recipes", id);
      await updateDoc(recipeToUpdateRef, {
        isFavorite: !currentIsFavorite
      })
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

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
