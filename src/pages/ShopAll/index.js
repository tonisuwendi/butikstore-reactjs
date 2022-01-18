import { useEffect } from "react";
import BannerTitle from "../../components/BannerTitle/BannerTitle";
import Layout from "../../components/Layout/Default";
import ProductLayout from "../../components/Layout/ProductLayout";
import ProductContent from "../../components/Products/ProductContent";
import { breadcrumbShopAll } from "../../data/product";
import useHttp from "../../hooks/use-http";
import useURLQuery from "../../hooks/use-urlquery";
import endpoints from "../../lib/endpoints";

const ShopAll = () => {
  const sort = useURLQuery("sort");

  const {
    sendRequest: getRequestData,
    isLoading,
    data: productsData,
    error: errorRequest,
  } = useHttp();

  useEffect(() => {
    getRequestData({
      url: endpoints.getAllProducts(sort ? `?sort=${sort}` : ""),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [getRequestData, sort]);

  return (
    <Layout>
      <main>
        <BannerTitle title="SHOP ALL" breadcrumb={breadcrumbShopAll} />
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

export default ShopAll;
