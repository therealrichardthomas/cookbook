import type { Recipe } from "../types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface RecipeOverlayProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeOverlay = ({ recipe, onClose }: RecipeOverlayProps) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle className="flex justify-between">
        {recipe.name}
        <IconButton onClick={onClose} color="error">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="flex flex-col">
        <img src={recipe.imageURL} className="w-full" alt={recipe.name} />
        <Typography gutterBottom>{recipe.description}</Typography>
        <Typography>
          <strong>Time:</strong> {recipe.timeNeeded} |{" "}
          <strong>Skill Level:</strong> {recipe.skillLevel} |{" "}
          <strong>Cuisine:</strong> {recipe.cuisine}
        </Typography>
        <Typography variant="h6">Ingredients</Typography>
        <ul>
          {/* Not worrying about key here...for simplicity assume recipes can't be edited */}
          {recipe.ingredients.map((ingredient) => (
            <li>
              <Typography>
                {ingredient.quantity} {ingredient.name}
              </Typography>
            </li>
          ))}
        </ul>
        <Typography variant="h6">Steps</Typography>
        <Typography>{recipe.steps}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeOverlay;
