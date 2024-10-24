
const LOAD_ARTICLES = 'article/loadArticles';
const ADD_ARTICLE = 'article/addArticle';
import {createSelector} from 'reselect';

export const loadArticles = (articles) => {
  return {
    type: LOAD_ARTICLES,
    articles
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    article
  };
};

export const fetchArticles = () => async (dispatch) => {
  const response = await fetch('/api/articles');
  const articles = await response.json();
  dispatch(loadArticles(articles));
};

export const writeArticle = (payload) => async (dispatch) => {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const article = await response.json();
    dispatch(addArticle(article));
    return article;
  }
};

// Step 1: Declare a selector using `createSelector`
const selectArticles = (state) => state.articleState.entries;

export const selectArticlesArray = createSelector(
  selectArticles,
  (articles) => Object.values(articles)
)

export const selectArticleById = 
  (articleId) => (state) => state.articleState.entries[articleId];

const initialState = { entries: {}, isLoading: true };

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES: {
      // return { ...state, entries: [...action.articles] };
      const newState = {};
      state.articles.forEach(article => {
        newState[article.id] = article
      })
      return {
        ...state,
        entries: {...newState},
      };
    }
    case ADD_ARTICLE:
      return { ...state, entries: {...state.entries, [action.article.id]:action.article} };
    default:
      return state;
  }
};

export default articleReducer;
