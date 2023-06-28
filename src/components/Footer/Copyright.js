import classes from './Footer.module.css';

const Copyright = () => (
  <div className={classes.copyright}>
    <p>
      Built by
      {' '}
      <a href="https://tonsu.id/" target="_blank" rel="noreferrer">
        Toni Suwendi
      </a>
      {', '}
      inspired by
      {' '}
      <a href="https://lookboutiquestore.com/" target="_blank" rel="noreferrer">
        lookboutiquestore.com
      </a>
      .
    </p>
  </div>
);

export default Copyright;
