import classes from './ProductItem.module.css';

const ProductImage = ({ image, imageHover, productIsHover }) => {
  const backgroundImage = productIsHover
    ? { backgroundImage: `url("${imageHover}")` } : {
      backgroundImage: `url(${image})`,
    };

  return <div className={classes.image} style={backgroundImage} />;
};

export default ProductImage;
