import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Default';
import Button from '../../components/UI/Button/Button';

import classes from './NotFound.module.css';

const NotFound = () => (
  <Layout title="404">
    <main className={classes.notfound}>
      <div>
        <h1>404</h1>
        <strong>Oops! That page can&apos;t be found.</strong>
        <p>
          Sorry, but the page you are looking for is not found. Please, make
          sure you have typed the current URL.
        </p>
        <Link to="/">
          <Button title="GO TO HOME" size="lg" />
        </Link>
      </div>
    </main>
  </Layout>
);

export default NotFound;
