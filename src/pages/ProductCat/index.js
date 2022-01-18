import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BannerTitle from "../../components/BannerTitle/BannerTitle";
import Layout from "../../components/Layout/Default";
import ProductLayout from "../../components/Layout/ProductLayout";
import ProductContent from "../../components/Products/ProductContent";
import useHttp from "../../hooks/use-http";
import endpoints from "../../lib/endpoints";
import { breadcrumbProductCat } from "../../data/product";
import useURLQuery from "../../hooks/use-urlquery";

const ProductCat = () => {
  const [mainTitle, setMainTitle] = useState("");

  const sort = useURLQuery("sort");

  const params = useParams();
  const { slug } = params;

  const {
    sendRequest: getRequestData,
    isLoading,
    data: productsData,
    error: errorRequest,
  } = useHttp();

  const { categoryTitle } = productsData;

  useEffect(() => {
    getRequestData({
      url: endpoints.getProductCat(slug, `?sort=${sort}`),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMainTitle(categoryTitle);
  }, [getRequestData, slug, categoryTitle, sort]);

  return (
    <Layout>
      <main>
        <BannerTitle title={mainTitle} breadcrumb={breadcrumbProductCat} />
        <ProductLayout>
          <ProductContent
            loading={isLoading}
            products={productsData.products}
            columns={3}
            error={errorRequest}
          />
        </ProductLayout>
      </main>
    </Layout>
  );
};

export default ProductCat;
