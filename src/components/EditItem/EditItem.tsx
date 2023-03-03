import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import classes from './EditItem.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../../api';
import * as productsActions from '../../features/productReducer';

export const EditItem: React.FC = () => {
  const {phoneId} = useParams();
  const dispatch = useAppDispatch();

  const [parameter, setParameter] = useState({
    imageUrl: '',
    name: '',
    count: '',
    width: '',
    height: '',
    weight: ''
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!phoneId) {
      return;
    }

    const response = await updateProduct(
      parseInt(phoneId), 
      parameter.imageUrl,
      parameter.name, 
      parseInt(parameter.count), 
      parseInt(parameter.width), 
      parseInt(parameter.height), 
      parameter.weight
      );

      if (response) {
        dispatch(productsActions.init());
      };

      navigate('/phones');
  };

  return (
    <div className={classes.card}>
      <div className={classes.card__content}>
        <form action="form" onSubmit={handleSubmit} className={classes.card__form}>
          <div className={classes.card__leftSide}>

            <div className={classes.card__image}>
              <img src={parameter.imageUrl} alt="image" className={classes.card__imgProduct} />
              <input 
                className={classes.card__imageURL}
                required
                type="url"
                id="url"
                name="url"
                value={parameter.imageUrl}
                placeholder="Enter new Url for image"
                onChange={event => setParameter({...parameter, imageUrl: event.target.value})}
              />
            </div>
            <div className={classes.card__titleBox}>
              <div className={classes.card__title}> {parameter.name} </div>
              <input
                className={classes.card__inputParameterTitle}
                maxLength={45}
                required
                type="text"
                id="count"
                name="count" 
                value={parameter.name}
                placeholder="Enter new name"
                onChange={event => setParameter({...parameter, name: event.target.value})}
              />
            </div>

            <hr className={classes.card__line}/>

            <div className={classes.card__parameters}>
              <div className={classes.card__price}> {`Count: ${parameter.count}`}
                <input
                  className={classes.card__inputParameter}
                  maxLength={3}
                  required
                  type="text"
                  id="count"
                  name="count" 
                  value={parameter.count}
                  placeholder="Enter new count"
                  onChange={event => setParameter({...parameter, count: event.target.value})}
                />
              </div>

              <div className={classes.card__container}>
                <div className={classes.card__box}>
                  <div className={classes.card__text}>{`Width: ${parameter.width}`}</div>
                  <input 
                    className={classes.card__inputParameter}
                    maxLength={3}
                    required
                    type="text"
                    id="width"
                    name="width"
                    value={parameter.width}
                    placeholder="Enter new width"
                    onChange={event => setParameter({...parameter, width: event.target.value})}
                  />
                </div>
                <div className={classes.card__box}>
                  <div className={classes.card__text}>{`Height: ${parameter.height}`}</div>
                  <input 
                    className={classes.card__inputParameter}
                    maxLength={3}
                    required
                    type="text"
                    id="height"
                    name="height"
                    value={parameter.height}
                    placeholder="Enter new height"
                    onChange={event => setParameter({...parameter, height: event.target.value})}
                  />
                </div>
                <div className={classes.card__box}>
                  <div className={classes.card__text}>{`Weight: ${parameter.weight}`}</div>
                  <input 
                    className={classes.card__inputParameter}
                    maxLength={5}
                    required
                    type="text"
                    id="weight"
                    name="weight"
                    value={parameter.weight}
                    placeholder="Enter new weight"
                    onChange={event => setParameter({...parameter, weight: event.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={classes.card__rightSide}>
            <div className={classes.button}>
              <button type="submit" className={classes.button__confirm} onSubmit={(event) => handleSubmit(event)}>Confirm</button>
              <button className={classes.button__back} onClick={handleGoBack}>Back</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
