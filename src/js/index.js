import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the map
* - Search object
* - Current recipes
* - Shopping list object
* - Liked recipes
*/
const state = {

}

/*
* Search controller
*/
const controlSearch = async () => {
    // 1) Get query from the view
    const query = searchView.getInput(); //TODO

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            // 4) Search for recipes
            await state.search.getResults();
            clearLoader();

            // 5) Render results on UI
            searchView.renderResults(state.search.result);
        } catch(error) {
            alert('something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

/*
* Recipe controller
*/

const controlRecipe = async () => {
    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes
        state.recipe = new Recipe(id);
        // Create new recipe object
        try {
            // Get recipe data
            await state.recipe.getRecipe();
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // Render recipe
            console.log(state.recipe);
        } catch(error) {
            alert('error processing recipe!');
        }
    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
