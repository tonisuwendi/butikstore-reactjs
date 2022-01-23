import { memo } from 'react';

import Benefit from './Benefit';
import Newsletter from './Newsletter';
import SocialMedia from './SocialMedia';
import Menu from './Menu';
import Posts from './Posts';
import Copyright from './Copyright';

import { informations, helps } from '../../data/footer';

import classes from './Footer.module.css';

const Footer = memo(() => (
  <footer className={classes.footer}>
    <Benefit />
    <div className={classes.information}>
      <div>
        <Newsletter />
        <br />
        <SocialMedia />
      </div>
      <Menu title="INFORMATION" menus={informations} />
      <Menu title="HELP" menus={helps} />
      <Posts />
    </div>
    <Copyright />
  </footer>
));

export default Footer;
