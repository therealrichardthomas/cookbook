// Complete the Ingredient interface.
// Properties:
//     quantity (a string)
//     name (a string)
export interface Ingredient {
  quantity: string;
  name: string;
}


// Create a SkillLevel type.
//   Either "Beginner" or "Intermediate" or "Advanced"
// see https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced"


// Complete the Recipe interface.
// Properties:
//    id (a string)
//    name (a string)
//    isFavorite (a boolean)
//    imageURL (a string)
//    skillLevel (Union type...either "Beginner" or "Intermediate" or "Advanced")
//    timeNeeded (a string)
//    cuisine (a string)
//    ingredients (an Ingredient array)
//    description (a string)
//    steps (a string)

export interface Recipe {
  id: string;
  name: string;
  isFavorite: boolean;
  imageUrl: string;
  skillLevel: SkillLevel;
  timeNeeded: string;
  cuisine: string;
  ingredients: Ingredient[];
  description: string;
  steps: string;
}


// See https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
