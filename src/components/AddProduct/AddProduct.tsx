import { useState } from 'react';
import classes from './AddProduct.module.scss';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../api';

export const AddProduct: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [count, setCount] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createProduct(
        imageUrl,
        name,
        parseInt(count),
        parseInt(width),
        parseInt(height),
        weight,
      );

      navigate('/phones');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.card}>
      <div className={classes.card__content}>
        <form action="form" onSubmit={handleSubmit} className={classes.card__form}>
          <div className={classes.card__leftSide}>

            <div className={classes.card__image}>
              <img src={imageUrl} alt="image" className={classes.card__imgProduct} />
              <input 
                className={classes.card__imageURL}
                required
                type="url"
                id="url"
                name="url"
                value={imageUrl}
                placeholder="Enter new Url for image"
                onChange={event => setImageUrl(event.target.value)}
              />
            </div>
            <div className={classes.card__titleBox}>
              <div className={classes.card__title}> {name} </div>
              <input
                className={classes.card__inputParameterTitle}
                maxLength={45}
                minLength={1}
                required
                type="text"
                id="count"
                name="count" 
                value={name}
                placeholder="Enter new name"
                onChange={event => setName(event.target.value)}
              />
            </div>

            <hr className={classes.card__line}/>

            <div className={classes.card__parameters}>
              <div className={classes.card__price}> {`Count: ${count}`}
                <input
                  className={classes.card__inputParameter}
                  maxLength={3}
                  minLength={1}
                  required
                  type="text"
                  id="count"
                  name="count" 
                  value={count}
                  placeholder="Enter new count"
                  onChange={event => setCount(event.target.value)}
                />
              </div>

              <div className={classes.card__container}>
                <div className={classes.card__box}>
                  <div className={classes.card__text}>{`Width: ${width}`}</div>
                  <input 
                    className={classes.card__inputParameter}
                    maxLength={3}
                    minLength={1}
                    required
                    type="text"
                    id="width"
                    name="width"
                    value={width}
                    placeholder="Enter new width"
                    onChange={event => setWidth(event.target.value)}
                  />
                </div>
                <div className={classes.card__box}>
                  <div className={classes.card__text}>{`Height: ${height}`}</div>
                  <input 
                    className={classes.card__inputParameter}
                    maxLength={3}
                    minLength={1}
                    required
                    type="text"
                    id="height"
                    name="height"
                    value={height}
                    placeholder="Enter new height"
                    onChange={event => setHeight(event.target.value)}
                  />
                </div>
                <div className={classes.card__box}>
                  <div className={classes.card__text}>{`Weight: ${weight}`}</div>
                  <input 
                    className={classes.card__inputParameter}
                    maxLength={5}
                    minLength={1}
                    required
                    type="text"
                    id="weight"
                    name="weight"
                    value={weight}
                    placeholder="Enter new weight"
                    onChange={event => setWeight(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={classes.card__rightSide}>
            <div className={classes.button}>
              <button type="submit" className={classes.button__confirm} onSubmit={(event) => handleSubmit(event)}>Add Product</button>
              <button className={classes.button__back} onClick={handleGoBack}>Back</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
