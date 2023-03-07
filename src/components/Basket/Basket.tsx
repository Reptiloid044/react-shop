import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Product } from '../../types/product';
import classes from './Basket.module.scss';
import { takefromBasket } from '../../features/productReducer';


export const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
  const productsInBasket = useAppSelector(state => state.products.productsInBasket) as Product[];

  const onTakefromBasket = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();
    
    dispatch(takefromBasket(id));
  }

  return (
    <>
      <div className={classes.basket}>
        {productsInBasket.map((product: Product) => (
          <div className={classes.card} key={product.id}>
            <div className={classes.card__content}>
              <div className={classes.card__image}>
                <img src={product.imageUrl} alt="iPhone" className={classes.card__imgProduct} />
              </div>
      
              <h2 className={classes.card__title}>
                {product.name}
              </h2>
      
              <p className={classes.card__price}> Count:
                <span className={classes.card__amount}>{product.count}</span>
              </p>
      
              <hr className={classes.card__line}/>
      
              <div className={classes.card__parameters}>
                <div className={classes.card__container}>
                  <div className={classes.card__box}>
                    <div className={classes.card__text}>width:</div>
                    <span className={classes.card__value}>{product.size.width}</span>
                  </div>
                  <div className={classes.card__box}>
                    <div className={classes.card__text}>height:</div>
                    <span className={classes.card__value}>{product.size.height}</span>
                  </div>
                  <div className={classes.card__box}>
                    <div className={classes.card__text}>weight:</div>
                    <span className={classes.card__value}>{product.weight}</span>
                  </div>
                </div>
              </div>
      
              <div className={classes.button}>
                <button className={classes.button__confirm}>
                  Confirm order
                </button>
                <button 
                  onClick={(event) => onTakefromBasket(event, product.id)} 
                  className={classes.button__cancel}>
                  Cancel order
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
    </>
  );
};
