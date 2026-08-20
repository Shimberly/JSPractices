import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
//console.log(icons); //with this Parcel can take the correct route when building

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  // the await will stop the code until the fetch is loaded, thats why we put in a aync function, async makes the function load in background
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return; //Guard clause
    recipeView.renderSpinner();

    //1. Loading recipe
    await model.loadRecipe(id);

    //2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};

//window.addEventListener('hashchange', controlRecipes);
//window.addEventListener('load', controlRecipes);
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes),
);
