import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchArticles, selectArticlesArray } from '../../store/articleReducer';

const ArticleList = () => {
  const dispatch = useDispatch();
  // option 1: without selectArticlesArray
  // const articles = useSelector(state=>state.articleState.entries);
  // Convert the `articles` object to an array to use .map()
  // const articlesArray = Object.values(articles);

  // option 2: with selectArticlesArray
  const articles = useSelector(selectArticlesArray);
  
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  

  return (
    <div>
      <h1>Article List</h1>
      <ol>
        {articles.map(({ id, title }) => ( //use articlesArray if going with option 1
          <li key={id}><NavLink to={`${id}`}>{title}</NavLink></li>
        ))}
      </ol>
    </div>
  );
};

export default ArticleList;
