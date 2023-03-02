import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToBasket } from '../../features/productReducer';
import classes from './Card.module.scss';

type Props = {
  imageUrl: string,
  name: string,
  count:number,
  width: number,
  height: number,
  weight: string,
  id: number,
}
 
export const Card: React.FC<Props> = memo(({imageUrl, name, count, width, height, weight, id }) => {
  const dispatch = useDispatch()
  
  const onAddToBasket = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();
    dispatch(addToBasket(id))
  }
 
  return (
    <Link 
      className={classes.container}
      key={id}
      to={`/phones/${id}`}
    >
      <div className={classes.card}>
        <div className={classes.card__content}>
          <div className={classes.card__image}>
            <img src={imageUrl} alt="iPhone" className={classes.card__imgProduct} />
          </div>

          <h2 className={classes.card__title}>
            {name}
          </h2>

          <p className={classes.card__price}> Count:
            <span className={classes.card__amount}>{count}</span>
          </p>

          <hr className={classes.card__line}/>

          <div className={classes.card__parameters}>
            <div className={classes.card__container}>
              <div className={classes.card__box}>
                <div className={classes.card__text}>width:</div>
                <span className={classes.card__value}>{width}</span>
              </div>
              <div className={classes.card__box}>
                <div className={classes.card__text}>height:</div>
                <span className={classes.card__value}>{height}</span>
              </div>
              <div className={classes.card__box}>
                <div className={classes.card__text}>weight:</div>
                <span className={classes.card__value}>{weight}</span>
              </div>
            </div>
          </div>

          <div >
            <button className={classes.button__basket} onClick={(event) => onAddToBasket(event, id)}>
              Add to basket
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
});
