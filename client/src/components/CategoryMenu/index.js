import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import store from '../../utils/store';
/* import { useStoreContext } from '../../../../dismiss-files/GlobalState'; */
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  /* const [state, dispatch] = useStoreContext(); */
  const state = store.getState();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  /* useEffect(() => { */
    if (categoryData) {
      store.dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        store.dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
 /*  }, [categoryData, loading]); */

  const handleClick = id => {
    store.dispatch({
      type: UPDATE_CURRENT_CATEGORY/* ,
      currentCategory: id */
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
