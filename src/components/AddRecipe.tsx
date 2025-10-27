import { useState } from "react";
import type { Recipe, SkillLevel, Ingredient } from "../types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton, 
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface AddRecipeProps {
  onClose: () => void;
  handleAddRecipe: (recipe: Omit<Recipe, "id">) => void;
}

// defaults
const initialState = {
  name: "",
  imageURL: "",
  skillLevel: "Beginner" as SkillLevel,
  timeNeeded: "",
  cuisine: "",
  description: "",
  steps: "",
};

const AddRecipe = ({ onClose, handleAddRecipe }: AddRecipeProps) => {
  const [formState, setFormState] =
    useState<Omit<Recipe, "id" | "isFavorite" | "ingredients">>(initialState);
  // ingredients list
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { quantity: "", name: "" },
  ]);

  
  // See
  // https://www.totaltypescript.com/event-types-in-react-and-typescript
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // this is some bs...
  // see https://mui.com/material-ui/migration/v5-component-changes/#update-event-type-typescript-3
  const handleSkillChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value as SkillLevel}))
  }

  const handleIngredientChange = (
    index: number,
    field: "quantity" | "name",
    value: string
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, { quantity: "", name: "" }]);
  };

  const removeIngredientField = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = () => {
    if (!formState.name || !formState.timeNeeded) {
      alert("Please fill out at least Name and Time Needed.");
      return;
    }

    const newRecipe: Omit<Recipe, "id"> = {
      ...formState,
      ingredients: ingredients.filter((ing) => ing.name && ing.quantity), // Filter out empty
      isFavorite: false, // Default value
    };

    handleAddRecipe(newRecipe);
    // Reset form for next time
    setFormState(initialState);
    setIngredients([{ quantity: "", name: "" }]);
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add a New Recipe</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" sx={{ pt: 1 }}>
          <TextField
            name="name"
            label="Dish Name"
            value={formState.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            name="imageURL"
            label="Image URL"
            value={formState.imageURL}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Skill Level</InputLabel>
            <Select
              name="skillLevel"
              value={formState.skillLevel}
              label="Skill Level"
              onChange={handleSkillChange}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="timeNeeded"
            label="Time Needed"
            value={formState.timeNeeded}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            name="cuisine"
            label="Cuisine"
            value={formState.cuisine}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="description"
            label="Description"
            value={formState.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="dense"
          />

          {/* Ingredients */}
          {ingredients.map((ing, index) => (
            <Box
              key={index}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <TextField
                label="Quantity"
                value={ing.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                margin="dense"
              />
              <TextField
                label="Name"
                value={ing.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                margin="dense"
              />
              <IconButton
                onClick={() => removeIngredientField(index)}
                color="error"
                disabled={ingredients.length <= 1}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={addIngredientField}>
            Add Ingredient
          </Button>

          {/* Would've been better to have an array that mapped to an ordered list blah blah blah but i'm too tired at this point */}
          <TextField
            name="steps"
            label="Steps"
            value={formState.steps}
            onChange={handleChange}
            fullWidth
            multiline
            rows={5}
            margin="dense"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save Recipe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecipe;
