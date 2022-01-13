import { benefits } from "../../data/footer";
import classes from "./Benefit.module.css";

const Benefit = () => {
  return (
    <div className={classes.benefit}>
      {benefits.map((benefit) => (
        <div key={benefit.id} className={classes.item}>
          <img src={benefit.image} alt={benefit.title} />
          <p className={classes.title}>{benefit.title}</p>
          <p className={classes.description}>{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Benefit;
