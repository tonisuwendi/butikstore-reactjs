import MainNavigation from "./MainNavigation";

import classes from "./HeaderLeft.module.css";

const HeaderLeft = () => {
  return (
    <div className={classes.headerleft}>
      <img
        src="https://lookboutiquestore.com/wp-content/uploads/2020/12/LBS-Logo-Black-1.png"
        alt="lookboutiquestore"
      />
      <MainNavigation />
    </div>
  );
};

export default HeaderLeft;
