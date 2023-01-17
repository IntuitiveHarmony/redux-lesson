# Redux/ Redux Toolkit

[Redux Documents](https://redux.js.org/) | [Redux Toolkit Documents](https://redux-toolkit.js.org/)
<br />
<br />

## What is Redux and Redux Toolkit?  

Redux is a package that gives us the ability to store pieces of state in a globaly. This allows the programmer to avoid prop drilling and lifting state.  Depending on your app you may still consider the `{ useState }` hook for local pieces of state in addition to this new functionality.  

Redux Toolkit is a package that helps simplify the Redux logic.  It is the prefered method for using Redux.  

> <i>Redux Toolkit is our official recommended approach for writing Redux logic. It wraps around the Redux core, and contains packages and functions that we think are essential for building a Redux app. Redux Toolkit builds in our suggested best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications.</i> -[from the docs](https://redux.js.org/introduction/getting-started#redux-toolkit)

### <u>When to use Redux?</u>

You may consider using Redux if:
- If you have many pieces of state that are needed in various components throughout the app
- Logic to update the state is overly complex
<br />
<br />

## Redux in a Nutshell

I think of Redux as deconstructing the different elements of useState so that we can place that piece of state into the global store. It does so by breaking it in to the following basic components:
- State
- Store
- Actions
- Reducers
- Dispatchers

### <u>State</u>

These are the variables that we manipulate in order to run our app. 

### <u>Store</u>

This is where the global state resides.

### <u>Actions</u>

Actions are essentially an object that describes the "where" and the "what" that will take place.  Since we can have many pieces of state in the store it will contain a name that describes the domain it shall take place (where).  It will also contain a payload (what).

### <u>Reducers</u>

Reducers take the current state from the store and the action and then updates the state in the store based on the written logic.

### <u>Dispatchers</u>

These are methods attached to the store.  When we run a dispatcher we also pass it an action object.  This will trigger the cooresponding reducer which will update the store.

<hr />

![Redux flow image](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

[Redux App Data Flow](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#redux-application-data-flow)

<hr />
<br />
<br />

# Redux Toolkit Counter

In this lesson we will be learning how to set up Redux Toolkit and implement a store within a React app.  For learning purposes we will build a counter from the ground up so that each step is understood.  There is a Redux Toolkit template that can be downloaded as some of the set up can be fairly tedious and boilerplate.  The terminal command for this is in the Redux Toolkit Docs and it will also be shared at the bottom of the this markdown.

Redux has it's own set of dev tools, make sure to install them to your browser so you can access their features. 

[Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) | [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/) 

## Create React App 

Navigate to a directory to initilize a React app, call it something like `redux-toolkit-counter` 

In the terminal run: 
```
npx create-react-app redux-toolkit-counter
```
## Install the Redux Toolkit Packages

In the terminal run: 
```
npm i @reduxjs/toolkit react-redux
```

## Create the Store

This is where we will keep the global state for our app.

Create a folder inside the `src` directory named `app`
Create a new file inside `app` and name it `store.js`

![Folder Tree View](./public/folderTree1.png)

### Configure the Store

Import the `{ configureStore }` hook from `"@reduxjs/toolkit"` and export the store.  The `{ configureStore }` hook holds an object that contains all of our reducers, we are going to put an empty reducer object in there for now that we will fill with our reducers once they are set up. 

```javascript
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {

    }
})
```
<i>store.js</i>
<hr />

## Provide the Store

Open `index.js` we are going to add some code to this file in order to make our store acesable to the app. We need to: 
1) Import the `{ store }` we just created. We wil also import the `{ Provider }` hook from `react-redux`.
2) Wrap the `<App />` with `<Provider>` and pass our `store` in as a prop.  It should look something like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';     // 1. Add this line 
import { Provider } from 'react-redux';  // 1. Add this line 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>           {/* 2. Add this line */}
      <App />
    </Provider>                        {/* 2. Add this line */}
  </React.StrictMode>
);
```
<i>index.js</i>
<hr />

## Create the Counter Slice

A slice is where all of the action and reducer logic resides for each of the features for our app.  Since we are building a counter feature for our app we will make a counter slice.  Each feature should have its own slice. For example: if our app had a post feature and a delete feature, we would make a slice for each. 

In the `src` directory create another directory called `features` and within `features` create another directory called `counter`.  Create a new file named `counterSlice.js` with in this folder.

![folderTree2](./public/folderTree2.png)

Within `counterSlice.js` we will define the increment and decrement logic for our counter.  
1) Import the `{ createSlice }` hook. 
2) Create the initial state of the counter within our store.
3) Using the `counterSlice` hook, create the slice object, we will put in a  name, the `initialState` we just created and the `reducers` object.
4) Create the action logic for the increment and the decrement within the reducer object.  Each will be anonymous functions that use state as a parameter. We can write logic that mutates the state because Redux uses a library called [immer](https://immerjs.github.io/immer/) 
5) Export both actions seperately and the reducer itself.  The dispatcher will need to use the actions and the store will need to use the reducer. 

```javascript
// Step 1.
import { createSlice } from '@reduxjs/toolkit'   

 // Step 2.
const initialState = {                          
  value: 0,
}

// Step 3.
export const counterSlice = createSlice({       
  name: 'counter',
  initialState,
  reducers: {
    //Step 4.
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

// Step 5.
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer
```
<i>counterSlice.js</i>
<hr />

## Add the Reducer to the Store

Within `store.js`
1) Import `counterReducer` 
2) Add it to the reducer object we created earlier.

```javascript
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from '../features/counter/counterSlice'  // 1. Add this line 

export const store = configureStore({
    reducer: {
        counter: counterReducer,  // 2. Add this line 
    }
})
```
<i>store.js</i>
<hr />

Once this is done we should be able to see the `value` state in our store using the redux dev tools in the browser.

In the terminal run:
```
npm start
```

Once the React app is running in the browser open the Redux dev tools.  If you cannot locate the Redux dev tools, they may be in the drop down menu (press the >> button)

![reduxDevTool1](./public/reduxDevTool1.png)

## Create the Counter Component

Within the `/features/counter` directory create a file named `Counter.js`.  This is where we will:
1) Create the user interface for counter (buttons).
2) Import the `increment` and   decrement` actions we made in the `counterSlice`
3) Use the `useDispatch` hook in order to put our dispatchers to work. 
4) Use the `useSelector` hook to display the current state of `value` from within the store.

## Create React App + Redux Template

In order to setup the store more quickly you can use the following command in your terminal.  This template also has some other examples to reverse engineer! 
```
npx create-react-app <my-app> --template redux
```