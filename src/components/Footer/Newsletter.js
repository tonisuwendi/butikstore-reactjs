import Button from '../UI/Button/Button';

import classes from './Newsletter.module.css';
import footerClasses from './Footer.module.css';

const Newsletter = () => (
  <div className={classes.newsletter}>
    <p className={footerClasses.title}>NEWSLETTER</p>
    <form>
      <input type="text" placeholder="E - MAIL" />
      <Button title="SUBSCRIBE" />
    </form>
  </div>
);

export default Newsletter;
