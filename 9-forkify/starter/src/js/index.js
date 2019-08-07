import Search from "./models/Search";
import Recipe from "./models/Recipe";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from "./views/searchView";

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/* SEARCH CONTROLLER */
const controlSearch = async () => {
    // 1. get query from view
    //const query = searchView.getInput(); 
    const query = "pizza";

    if(query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. search for recipes
            await state.search.getResults();
    
            // 5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch {
            alert('Error getting results');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// TESTING 
window.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/* RECIPE CONTROLLER */

const controlRecipe = async () => {
    // get id from url
    const id = window.location.hash.replace("#", "");

    if(id) { 
        // 1. prepare UI for changes

        // 2. create new recipe object
        state.recipe = new Recipe(id);
        window.r = state.recipe; // TESTING VARIABLE

        try {
            // 3. get recipe data
            await state.recipe.getRecipe();

            // 4. calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 5. render recipe
            console.log(state.recipe);
        } catch {
            alert('Error processing recipe');
        }
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));