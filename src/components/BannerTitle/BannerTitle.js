import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';

import classes from './BannerTitle.module.css';

const BannerTitle = ({ title, breadcrumb }) => (
  <div className={classes.banner}>
    <div>
      <h2>{title}</h2>
      <div className={classes.underline} />
      <div className={classes.breadcrumb}>
        {breadcrumb.map((bc) => (
          <Link key={bc.id} to={bc.url}>
            {bc.title}
            <BiChevronRight />
            {' '}
          </Link>
        ))}
        <span>{title}</span>
      </div>
    </div>
  </div>
);

export default BannerTitle;
