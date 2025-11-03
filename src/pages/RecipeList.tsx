import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  ToggleButton
} from "@mui/material";
import { useState, useMemo } from "react";
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

  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);

  const handleAddAndClose = (recipe: Omit<Recipe, "id">) => {
    handleAddRecipe(recipe);
    setAddModal(false);
  };

  const filteredRecipes = useMemo(() => {
    if (!favoritesOnly) {
      return recipes;
    } 
    return recipes.filter(recipe => recipe.isFavorite);
  }, [favoritesOnly, recipes])


  return (
    <div className="m-4">
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setAddModal(true)}
      >
        Create recipe
      </Button>
      <ToggleButton value="check" selected={favoritesOnly} size="small" onChange={() => setFavoritesOnly(!favoritesOnly)}>
        {favoritesOnly ? 'Show all' : 'Show favorites'}
      </ToggleButton>
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
          {filteredRecipes.map((recipe) => (
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
