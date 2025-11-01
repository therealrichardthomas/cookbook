[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/iqtZJoJW)
# Week 7: Cookbook homework

This homework is all about firestore and backend! (Sorry the frontend is anything but impressive-looking, please feel free to change it and mess around with it). This app was built using React Router, TailwindCSS, and MaterialUI.

Follow the steps below to complete this homework assignment. Remember to use `npm install` and then `npm run dev` to run your app!

NOTE: Highly recommend using the TODO Tree extension for VSCode - it'll show you where all the TODOS for this homework are, and you can delete them as you complete tasks. With that being said, please tackle the TODOS in order as they are listed in this `README.md`! Otherwise things may not work as expected.

## TypeScript Interfaces and Types
Inside of `src/types.ts`, complete the 3 TODOs to create:
1. An `Ingredient` interface
2. A `SkillLevel` type (3 options. Hint this is a union of 3 strings)
3. A `Recipe` interface

## Customize `src/pages/Home.tsx`
This will be like an "About the Chef" sort of page.  At the minimum add an image of yourself and a description. Feel free to customize this page to your liking! 

At this point, try `npm run dev` to see how the app works! You should be able to use the recipe list page to add and delete recipes.

## Setting up a Firestore Database
These steps are kind of involved - please reach out to Jessica and Gavin if you have any questions!

First, create a firebase project:
1. Go to [Firebase Console](https://console.firebase.google.com) and log in
2. Click on `Create a new Firebase project`
3. Project name doesn't matter too much, do something like `cookbook-yourname` (e.g. `cookbook-gavinc`)
4. Disable google analytics and click on `Create project`

Now that your project is created, you are going to create a Firestore database.
1. Open the menu on the left of your screen and click on `Build` -> `Firestore Database`
2. On this new screen, click on `Create database`
3. Select `Standard edition`
4. Use the default location
5. IMPORTANT: CLICK ON `Start in test mode`, NOT production mode!!!! The purpose of this is to not have to worry about read and write perms and security rules (that's too much rn). For a real project team your tech lead would probably handle that sort of stuff (or guide you on how that works)
    - Note that if you want to look at this example much later (e.g. you look back at this in December), go to the `Rules` tab and change the settings there to `allow read, write: if true;` so that this database will always allow read and write. Security rules are outside the scope of this bootcamp.
6. In the `Data` tab of your firestore database, click on `+ Start collection` and title it `recipes`. It'll ask you to populate it with a first document - do that and then immediately delete that document afterwards so you have an empty `recipes` collection.

## Getting Firebase config information

1. Again on the left menu, click on the gear icon next to `Project Overview`
2. Click on `Project Settings`
3. On the screen there should now be a section called `Your apps`. Click on the web icon `</>` to make a web app
4. Give the app whatever nickname you want (e.g. `cookbook-yourname` like `cookbook-gavinc`). Do NOT set up firebase hosting for this app. Then click on `Register App`.
5. Usually, if you were making a project yourself, you'd have to do `npm install firebase` (but we've already added firebase as a dependency to `package.json`).
6. Copy the information stored in `firebaseConfig` (there's 6 things in there) and store it somewhere (e.g. a notepad app). You'll be using this in just a second.

## Setting up Firebase and Firestore in this project

Firstly, please read this guide from Vite to understand what we're about to do: [Env Variables and Modes](https://vite.dev/guide/env-and-mode). 

Note that when you work with APIs, you will often need things such as an API key which is used to authenticate you when you make requests to that API. However, it is VERY BAD PRACTICE to just leave API keys and things like these lying in your code, because then bad actors may be able to access it and then get access to your apps. To avoid these things, we can use a `.env` file to store important information, use `.gitignore` to ensure that this file is not pushed to GitHub, and that way we can ensure that other people can't get access to the `.env` file. When you work on your final project, you'd probably just create a `.env` file, distribute it to your teammates, and add it to your `.gitignore` file so that it doesn't get pushed to remote.

1. Back in the root directory of this project, create a file called `.env`. We already added `.env` to `.gitignore`, so this file will not be pushed when you submit your homework.
2. Inside the `.env` file, please add the following lines:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

3. Using the information in `firebaseConfig` that you recently saved, copy and paste the corresponding information into `VITE_FIREBASE_API_KEY=`, `VITE_FIREBASE_AUTH_DOMAIN=`, and so on for all 6 `.env` variables. IMPORTANT: Do NOT include the quotation marks!!!! This could mess up your code. ALSO, DO NOT USE ANY SPACES!!
4. IMPORTANT FOR GRADING: Copy and paste that information into this `README.md` (e.g. the code block above step 3 and after step 2 of this section) so that we can create a `.env` file when we grade your submission.
5. Inside of `src/firebaseConfig.ts`, replace `const firebaseConfig = { ... }` with the following code block:

```
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

What this does (as explained in the vite guide you just read) is allow you to use the environment variables from `.env` in your cookbook React app. Note that variables must be prefixed with `VITE_` for this to work.

## (Re)implementing methods in `App.tsx`
In this section you will reimplement the useEffect and many methods in App.tsx now that we're using firestore to store information in a database.

Helpful resources for this section:
- Class Slides
- [Cloud Firestore Data Model](https://firebase.google.com/docs/firestore/data-model): Information on Documents, Collections, and References. how to use `doc()` and `collection()` to get references to documents and collections respectively.
- [Get realtime updates with Cloud Firestore](https://firebase.google.com/docs/firestore/query-data/listen): Important reading to understand how to use `onSnapshot()` to create a listener that will run some code every time the `recipes` collection changes.
- [What does the "as" keyword do?](https://stackoverflow.com/questions/55781559/what-does-the-as-keyword-do): Read to understand what this type assertion does.
- [Firestore: Listen to update on the entire collection](https://stackoverflow.com/questions/48606611/firestore-listen-to-update-on-the-entire-collection)
- [QuerySnapshot API Documentation](https://firebase.google.com/docs/reference/node/firebase.firestore.QuerySnapshot): Relevant to the useEffect you will create in App.tsx.
- [QueryDocumentSnapshot API Documentation](https://firebase.google.com/docs/reference/node/firebase.firestore.QueryDocumentSnapshot): A snapshot of a document from a query, use `.data()` to get the data, `.id` to get the document's id
- [Omit<Type, Keys>](https://www.typescriptlang.org/docs/handbook/utility-types.html): You don't have to write coding using this, but it's already being used in this app. It constructs a type by picking all the properties in `Type`, and then removing `Keys` from it.
- [Add data to Cloud Firestore](https://firebase.google.com/docs/firestore/manage-data/add-data): self explanatory. also how to update existing docs
- [Delete data from Cloud Firestore](https://firebase.google.com/docs/firestore/manage-data/delete-data): self explanatory

For this part, you'll need to go through `App.tsx` and complete all of the TODOs listed there. Do them in order! They should be fairly self explanatory, but please read through class slides + other resources and reach out to jessica and gavin if you need any help (please message both, it'll be more likely one of us gets to you back faster).

## Favorites toggle
Important readings:
- [ToggleButton (MUI)](https://mui.com/material-ui/react-toggle-button/)
- [MaterialUI Icons](https://mui.com/material-ui/material-icons/?query=viewlist): You can use an icon inside the body of your `<ToggleButton>` to add an icon to your toggle. This site will let you search up icons to use.
- [useMemo Geeks4Geeks](https://www.w3schools.com/react/react_usememo.asp), [useMemo React docs](https://react.dev/reference/react/useMemo)

For the last task of this homework, you'll be working in `src/pages/RecipeList.tsx` to allow the user to toggle between showing all recipes and only favorited recipes. Note that no firestore is required for this! We're simply just changing what we show or not. However, you will have to learn a new hook, `useMemo()`, which is used for caching values and smartly recomputing them only when necessary (i.e. when the listed dependencies change). Just complete all the TODOs. Make sure that your toggle button works as intended before moving on.

## Summary (PLEASE MAKE SURE YOU PUT THE CONTENTS OF YOUR `.env` FILE IN THIS README EARLIER!!!)
Before submitting, make sure with TODO Tree that there are no more TODOs you need to do! Again I would recommend deleting the TODO comments when you've finished a task to make this easier.

Also make sure that you copy pasted the info from your `.env` file in the readme so we can use that to test if your code works