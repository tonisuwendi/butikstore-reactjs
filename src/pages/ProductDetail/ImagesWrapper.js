import classes from './ProductDetail.module.css';

const getImageAt = (imageData, index) => {
  if (!imageData) return null;
  if (Array.isArray(imageData)) return imageData[index] || null;
  return imageData.split('^')[index] || null;
};

const ImagesWrapper = ({ images }) => {
  const image = (index) => getImageAt(images, index);

  return (
    <div className={classes.images_wrapper}>
      <div className={classes.top_images_wrapper}>
        <img src={image(0)} alt="product" />
        {image(1) && (
          <div className={classes.top_images_wrapper_mini}>
            <img src={image(1)} alt="product" />
          </div>
        )}
      </div>
      <div className={classes.bottom_images_wrapper}>
        {image(2) && <img src={image(2)} alt="product" />}
        {image(3) && <img src={image(3)} alt="product" />}
        {image(4) && <img src={image(4)} alt="product" />}
      </div>
    </div>
  );
};

export default ImagesWrapper;
