import classes from './Info.module.css';

const Info = ({ text, center }) => (
  <div className={classes.info}>
    <p className={center ? classes.textCenter : ''}>{text}</p>
  </div>
);

export default Info;
