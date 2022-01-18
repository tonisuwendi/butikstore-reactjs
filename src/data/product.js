export const productFilter = [
  {
    id: "f1",
    title: "Shop By",
    menus: [
      {
        id: "m1",
        title: "NEW ARRIVALS",
        url: "/product-cat/new-arrivals",
      },
      {
        id: "m2",
        title: "BEST SELLERS",
        url: "/product-cat/best-sellers",
      },
      {
        id: "m3",
        title: "SHOP ALL",
        url: "/shop-all",
      },
    ],
  },
  {
    id: "f2",
    title: "Sort By",
    menus: [
      {
        id: "m1",
        title: "POPULARITY",
        url: "?sort=popularity",
      },
      {
        id: "m2",
        title: "PRICE: LOW TO HIGH",
        url: "?sort=price01",
      },
      {
        id: "m3",
        title: "PRICE: HIGH TO LOW",
        url: "?sort=price10",
      },
      {
        id: "m4",
        title: "PRODUCT NAME",
        url: "?sort=name",
      },
    ],
  },
];

export const breadcrumbProductCat = [
  {
    url: "/",
    title: "HOME",
  },
  {
    url: "/shop-all",
    title: "SHOP",
  },
];

export const breadcrumbShopAll = [
  {
    url: "/",
    title: "HOME",
  },
];
