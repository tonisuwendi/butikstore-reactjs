import { socialMedia } from '../../data/external-link';

import classes from './SocialMedia.module.css';
import footerClasses from './Footer.module.css';

const SocialMedia = () => (
  <div>
    <p className={footerClasses.title}>SOCIAL MEDIA</p>
    <div className={classes.socmed}>
      {socialMedia.map((media) => (
        <a href={media.url} key={media.id} target="_blank" rel="noreferrer">
          {media.icon}
        </a>
      ))}
    </div>
  </div>
);

export default SocialMedia;
