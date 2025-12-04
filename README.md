# Cookbook App

A modern, full-stack single-page application (SPA) for managing and organizing your favorite recipes, built with React, TypeScript, and Firebase.

## Features

* **Recipe Management**: Create, view details for, and delete recipes.
* **Detailed Recipe Entry**: Add new recipes with fields for dish name, image URL, cuisine, time required, steps, and dynamic ingredient lists (quantity and name).
* **Skill Level Classification**: Recipes are categorized by skill level (Beginner, Intermediate, Advanced).
* **Favorites/Bookmarks**: Easily mark recipes as a favorite and filter the main list to show only your bookmarked recipes.
* **Initial Data**: Includes a set of placeholder recipes (e.g., Grilled Cheese, Buko Pandan) in a local `recipes.json` file.

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | [React](https://reactjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Material UI (MUI)](https://mui.com/) |
| **Utility Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Backend/DB** | [Firebase (Firestore)](https://firebase.google.com/docs/firestore) |
| **Bundler** | [Vite](https://vitejs.dev/) |
| **Routing** | [React Router](https://reactrouter.com/) |

## Configuration

This application requires Firebase credentials to connect to Cloud Firestore.

1.  **Set up a Firebase Project**
2.  **Create a `.env` file** in the root directory to store your credentials as environment variables.

    ```
    # .env
    VITE_FIREBASE_API_KEY="YOUR_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    VITE_FIREBASE_APP_ID="YOUR_APP_ID"
    ```

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd wk07-hw-cookbook
    ```

2.  **Install dependencies:**
    ```bash
    npm install 
    # or
    # yarn install
    ```

## Available Scripts

In the project directory, you can run:

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts the development server. |
| `npm run build` | `tsc -b && vite build` | Builds the app for production to the `dist` folder. |
| `npm run lint` | `eslint .` | Runs the linter for code quality checks. |
| `npm run preview` | `vite preview` | Serves the production build locally for testing. |
