import { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Product } from '../../types/product';
import { Card } from '../Card/Card';
import classes from './ProductList.module.scss';
import * as productsActions from '../../features/productReducer';
import { Loader } from '../Loader/Loader';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products) as Product[];
  const loading = useAppSelector(state => state.products.loading);
  const error = useAppSelector(state => state.products.error);

  useEffect(() => {
    dispatch(productsActions.init());
  }, [])

  if (loading) {{
    return <Loader />
  }}

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className={classes.list}>
      {products.map((product: Product) => 
      <Fragment key={product.id}>
        <Card 
          imageUrl={product.imageUrl}
          name={product.name}
          count={product.count}
          width={product.size.width}
          height={product.size.height}
          weight={product.weight}
          id={product.id}
        />
         </Fragment>)}
    </div>
  );
};
