import TitleWithUnderline from '../../components/UI/Title/TitleWithUnderline';

import classes from './ProductDescription.module.css';

const ProductDescription = ({
  weight, size, material, color, height, wearingSize,
}) => (
  <div className={classes.description}>
    <TitleWithUnderline title="DESCRIPTION" />
    <table>
      <tbody>
        <tr>
          <td>WEIGHT</td>
          <td>{`${weight / 1000} kg`}</td>
        </tr>
        <tr>
          <td>SIZE</td>
          <td>{size}</td>
        </tr>
        <tr>
          <td>MATERIAL</td>
          <td>{material}</td>
        </tr>
        <tr>
          <td>COLOR</td>
          <td>{color}</td>
        </tr>
        <tr>
          <td>MODEL&apos;S HEIGHT</td>
          <td>{`${height} CM`}</td>
        </tr>
        <tr>
          <td>MODEL&apos;S WEARING SIZE</td>
          <td>{wearingSize}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ProductDescription;
