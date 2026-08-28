import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SEC } from './config.js';
//import 'core-js/stable';

//console.log(icons); //with this Parcel can take the correct route when building

///////////////////////////////////////
//if (module.hot) {
//when saving it would no reload the page if the change it affects just the console
//// module.hot.accept();
//}

const controlRecipes = async function () {
  // the await will stop the code until the fetch is loaded, thats why we put in a aync function, async makes the function load in background
  try {
    const id = window.location.hash.slice(1);
    console.log(`Recipe id: ${id}`);

    if (!id) return; //Guard clause
    recipeView.renderSpinner();
    // 0. Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //1. Loading recipe
    await model.loadRecipe(id);
    //2. Rendering recipe
    recipeView.render(model.state.recipe);
    //3. Updating bookmarks view: this has to be at the end, because bookmarks view has an Load event, and has to be after the await
    //debugger;
    bookmarksView.update(model.state.bookmarks);
  } catch (error) {
    //alert(error);
    recipeView.renderError();
    console.error(error);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    //console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4. Render the initial pagination BUTTONS
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  console.log(`goToPage: ${goToPage}`);
  // 3. Render NEW results
  //console.log(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4. Render NEW pagination BUTTONS
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);

  //Update the recipe view (render again)
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or remove a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //console.log(model.state.recipe);
  //Update recipe view
  recipeView.update(model.state.recipe);

  //Render the bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  //console.log(newRecipe);

  try {
    //Show loading spinner
    addRecipeView.renderSpinner();

    //Upload new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //Sucess message
    addRecipeView.renderMessage();

    //Render Bookmarks
    bookmarksView.render(model.state.bookmarks);

    //Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close the form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();

//window.addEventListener('hashchange', controlRecipes);
//window.addEventListener('load', controlRecipes);
