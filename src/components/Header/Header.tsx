import classes from './Header.module.scss';
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/product';

export const Header: React.FC = () => {
  const productsInBasket = useAppSelector(state => state.products.productsInBasket) as Product[];

  return (
    <>
      <header className={classes.header}>
        <div className={classes.header__logo}></div>

        <nav className={classes.nav}>
            <ul className={classes.nav_list}>
              <li className={classes.nav_item}>
                <Link className={classes.nav_link} to="/">Home</Link>
              </li>
              <li className={classes.nav_item}>
                <Link className={classes.nav_link} to="phones">Phones</Link>
              </li>
              <li className={classes.nav_item}>
                <Link className={classes.nav_link} to="tablets">Tablets</Link>
              </li>
            </ul>
          </nav>

          <div className={classes.header__basket}>
            <label>{productsInBasket.length}</label>
            <Link to="basket" className={classes.header__basketLink}></Link>
          </div>
      </header>
      <Outlet />
    </>
  );
};
