// TODO: Import ToggleButton (and any icons if you use any)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import AddRecipe from "../components/AddRecipe";
import RecipeOverlay from "../components/RecipeOverlay";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import type { Recipe } from "../types";

interface RecipeListProps {
  recipes: Recipe[];
  handleAddRecipe: (recipe: Omit<Recipe, "id">) => void;
  handleDeleteRecipe: (id: string) => void;
  handleToggleFavorite: (id: string, isFavorite: boolean) => void;
}

//creates the table with list of recipes that we see
//can bookmark the recipes
const RecipeList = ({
  recipes,
  handleAddRecipe,
  handleDeleteRecipe,
  handleToggleFavorite,
}: RecipeListProps) => {
  // PROPS FOR MODALS
  const [addModal, setAddModal] = useState<boolean>(false);
  const [currRecipe, setCurrRecipe] = useState<Recipe | null>(null);

  // TODO:  Create a state favoritesOnly and set it to initially be false.
  //        It should be a boolean.

  const handleAddAndClose = (recipe: Omit<Recipe, "id">) => {
    handleAddRecipe(recipe);
    setAddModal(false);
  };

  // TODO: Use useMemo to filter recipes only when needed.
  //   - The dependencies should be recipes and showFavoritesOnly
  //  For the arrow functino you pass into useMemo as the first  parameter:
  //     - first, have an if statement that returns recipes if favoritesOnly is false
  //     - After the if statement, return only favorited recipes using .filter()
  // const filteredRecipes =


  // TODO: Add a ToggleButton that will allow you to toggle if showFavorites is true or false.
  //  Hint: Some attributes worth setting for ToggleButton
  //  are value, selected (which should be tied to your state var),
  //  onChange (use an arrow function that calls setFavoritesOnly),
  //  and size.
  //  If you'd like, you can use a MaterialUI icon inside the ToggleButton (see readings in README.md)
  return (
    <div className="m-4">
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setAddModal(true)}
      >
        Create recipe
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dish</TableCell>
            <TableCell>Cuisine</TableCell>
            <TableCell>Time Required</TableCell>
            <TableCell>Skill Level</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* TODO: Make sure you're mapping over filteredRecipes, not necessarily all the recipes */}
          {recipes.map((recipe) => (
            <TableRow key={recipe.id} hover className="cursor-pointer">
              <TableCell onClick={() => setCurrRecipe(recipe)}>
                {recipe.name}
              </TableCell>
              <TableCell onClick={() => setCurrRecipe(recipe)}>
                {recipe.cuisine}
              </TableCell>
              <TableCell onClick={() => setCurrRecipe(recipe)}>
                {recipe.timeNeeded}
              </TableCell>
              <TableCell onClick={() => setCurrRecipe(recipe)}>
                {recipe.skillLevel}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteRecipe(recipe.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleToggleFavorite(recipe.id, recipe.isFavorite)}
                >
                  {recipe.isFavorite? <TurnedInIcon/> : <TurnedInNotIcon/>}
                </IconButton>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* MODALS */}
      {addModal && (
        <AddRecipe
          onClose={() => setAddModal(false)}
          handleAddRecipe={handleAddAndClose}
        />
      )}

      {currRecipe && (
        <RecipeOverlay
          recipe={currRecipe}
          onClose={() => setCurrRecipe(null)}
        />
      )}
    </div>
  );
};

export default RecipeList;
