import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

import classes from './SocialMedia.module.css';
import footerClasses from './Footer.module.css';

const SocialMedia = () => (
  <div>
    <p className={footerClasses.title}>SOCIAL MEDIA</p>
    <div className={classes.socmed}>
      <a href="https://facebook.com">
        <FaFacebook />
      </a>
      <a href="https://instagram.com">
        <FaInstagram />
      </a>
      <a href="https://youtube.com">
        <FaYoutube />
      </a>
    </div>
  </div>
);

export default SocialMedia;
