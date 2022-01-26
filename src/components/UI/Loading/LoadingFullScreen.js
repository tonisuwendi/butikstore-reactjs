import { VscLoading } from 'react-icons/vsc';

import classes from './LoadingFullScreen.module.css';

const LoadingFullScreen = () => (
  <div className={classes.loading}>
    <VscLoading />
  </div>
);

export default LoadingFullScreen;
