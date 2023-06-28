import { Link } from 'react-router-dom';

import MainNavigation from './MainNavigation';

import classes from './HeaderLeft.module.css';
import { logoDarkImage } from '../../assets';

const HeaderLeft = () => (
  <div className={classes.headerleft}>
    <Link to="/">
      <img
        src={logoDarkImage}
        alt="lookboutiquestore"
        height={14}
      />
    </Link>
    <MainNavigation />
  </div>
);

export default HeaderLeft;
