import { Product } from "../../types/product";
import classes from './ProductView.module.scss';
import { Link, useNavigate, useParams  } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Comments } from "../Comments/Comments";
import { createSelector } from "@reduxjs/toolkit";

const selectSpecificProduct = createSelector(
  (state: any) => state.products.products,
  (_: null, phoneId: string) => phoneId,
  (products: Product[], phoneId) => products.find((product: any) => product.id === phoneId)
);

export const ProductView: React.FC<{}> = (): JSX.Element => {
  const {phoneId} = useParams();
  if (!phoneId) {
    return <div> No phones </div>;
  }   
  const parameter = useAppSelector((state) => selectSpecificProduct(state, phoneId));
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!parameter) {
    return <div> No phones </div>;
  };

  return (
    <>
      <div className={classes.card}>
        <div className={classes.card__content}>
          <div className={classes.card__leftSide}>
            <div className={classes.card__image}>
              <img src={parameter.imageUrl} alt="iPhone" className={classes.card__imgProduct} />
            </div>
    
            <h2 className={classes.card__title}>
              {parameter.name}
            </h2>
    
            <p className={classes.card__price}> Count:
              <span className={classes.card__amount}>{parameter.count}</span>
            </p>
    
            <hr className={classes.card__line}/>
    
            <div className={classes.card__parameters}>
              <div className={classes.card__container}>
                <div className={classes.card__box}>
                  <div className={classes.card__text}>width:</div>
                  <span className={classes.card__value}>{parameter.size.width}</span>
                </div>
                <div className={classes.card__box}>
                  <div className={classes.card__text}>height:</div>
                  <span className={classes.card__value}>{parameter.size.height}</span>
                </div>
                <div className={classes.card__box}>
                  <div className={classes.card__text}>weight:</div>
                  <span className={classes.card__value}>{parameter.weight}</span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={classes.card__middleSide}>
            <div className={classes.card__description}>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quo repellendus placeat laboriosam facilis laborum sed velit voluptatum rerum saepe eveniet eum molestiae, delectus aliquid pariatur consequuntur necessitatibus dolore neque.
                Iure laborum inventore aliquid perspiciatis consequuntur dolores! Unde hic ab sunt, laudantium ipsam dolores suscipit similique odio culpa natus ut qui. Repudiandae amet dicta corrupti alias aspernatur ipsa maxime consequuntur.
                Expedita reiciendis commodi neque inventore voluptas quos dignissimos vero atque ab dicta voluptatibus placeat ea, voluptatum, alias provident, quas perspiciatis sapiente tempora est aut? Voluptas nobis dolores eius dolorem ducimus!
                Quia reiciendis sunt quaerat voluptatem soluta magni? Architecto perspiciatis non impedit ad. Voluptatum blanditiis saepe rerum placeat at adipisci ratione vitae officia ipsa iste, modi neque. Earum cupiditate maiores ut?
                At maiores ea dolorem quas eius odio quidem exercitationem, aperiam porro quos aspernatur. Et facilis corrupti aliquid, fuga sunt quam blanditiis accusamus cum sint alias commodi, officia possimus! Alias, ad.
              </p>
            </div>
          </div>
          <div className={classes.card__rightSide}>
            <div className={classes.button}>
              <Link to={`/phones/${phoneId}/edit`}>
                <button className={classes.button__confirm}>Edit</button>
              </Link>
              <button className={classes.button__back} onClick={handleGoBack}>Back</button>
            </div>
          </div>
        </div>
      </div>
    <Comments id={0} productId={0} description={""} date={new Date} />
    </>
  );
};
