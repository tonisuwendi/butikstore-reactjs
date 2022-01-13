import classes from "./Posts.module.css";
import footerClasses from "./Footer.module.css";

import { posts } from "../../data/footer";

const Posts = () => {
  return (
    <div>
      <p className={footerClasses.title}>FOLLOW US</p>
      <div className={classes.images}>
        {posts.map((post) => (
          <a href={post.url} key={post.id}>
            <img src={post.image} alt="postingan" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Posts;
