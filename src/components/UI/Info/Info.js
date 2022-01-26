import classes from './Info.module.css';

const Info = ({
  text, center, small = false, warning = false,
}) => (
  <div className={`${classes.info} ${small ? classes.smallInfo : ''} ${warning ? classes.warning : ''}`}>
    <p className={center ? classes.textCenter : ''}>{text}</p>
  </div>
);

export default Info;
