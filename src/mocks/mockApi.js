import {
  CATEGORY_META,
  MOCK_PRODUCTS,
  filterByCategory,
  getProductBySlug,
  isValidCategorySlug,
  searchProducts,
  sortProducts,
  toDetailImages,
  toListItem,
} from './products';

const MOCK_DELAY_MS = 280;
const CART_STORAGE_KEY = 'MOCK_CART_DATA';
const ORDERS_STORAGE_KEY = 'MOCK_ORDERS_DATA';
export const MOCK_TOKEN = 'mock-demo-token-butikstore';

const delay = (ms = MOCK_DELAY_MS) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const API_PATH_MARKERS = ['products/', 'cart/', 'orders/', 'auth/'];

const parseRequestUrl = (url) => {
  const queryIndex = url.indexOf('?');
  const pathPart = queryIndex >= 0 ? url.slice(0, queryIndex) : url;
  const query = queryIndex >= 0 ? url.slice(queryIndex + 1) : '';

  let pathname = pathPart;
  const marker = API_PATH_MARKERS.find((m) => pathPart.includes(m));
  if (marker) {
    const start = pathPart.indexOf(marker);
    pathname = `/${pathPart.slice(start)}`;
  } else if (url.startsWith('http')) {
    try {
      pathname = new URL(url).pathname;
    } catch {
      pathname = pathPart;
    }
  }

  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`;
  }

  return { pathname, searchParams: new URLSearchParams(query) };
};

const loadCarts = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

const saveCarts = (carts) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carts));
};

const saveOrders = (orders) => {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

const getSeedOrders = () => [
  {
    id: 1,
    order_number: 'BS-240601',
    date_order: '2024-06-01T10:30:00.000Z',
    total: 818000,
    phone: '081234567890',
    name: 'Demo User',
    address: 'Jl. Kemang Raya No. 12\nJakarta Selatan',
    postal_code: '12560',
    notes: 'Please contact via WhatsApp before delivery.',
    products: [
      {
        id: 1,
        title: 'Linen Wrap Dress — Sage',
        price: 489000,
        qty: 1,
        slug: 'linen-wrap-dress-sage',
        image: MOCK_PRODUCTS[0].images[0],
      },
      {
        id: 3,
        title: 'Ribbed Knit Top — Ivory',
        price: 329000,
        qty: 1,
        slug: 'ribbed-knit-top-ivory',
        image: MOCK_PRODUCTS[2].images[0],
      },
    ],
  },
];

const loadOrders = () => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* seed */
  }
  const seed = getSeedOrders();
  saveOrders(seed);
  return seed;
};

const getCartForKey = (clientKey) => {
  const carts = loadCarts();
  if (!carts[clientKey]) {
    carts[clientKey] = { items: [] };
    saveCarts(carts);
  }
  return carts[clientKey];
};

const buildCartResponse = (cart) => {
  const items = cart.items.map((item) => ({
    id: item.cartItemId,
    title: item.title,
    price: item.price,
    qty: item.qty,
    slug: item.slug,
    images: item.images,
    image: item.images[0],
  }));
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  return { totalItems, items, subtotal };
};

const generateOrderNumber = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `BS-${num}`;
};

const success = (data) => ({ status: 200, success: true, data });

const error = (message, extra = {}) => ({
  status: 200,
  success: false,
  message,
  data: extra,
});

const handleProducts = (pathname, searchParams) => {
  const categoryMatch = pathname.match(/\/products\/product-category\/([^/]+)\/?$/);
  if (categoryMatch) {
    const slug = categoryMatch[1];
    if (!isValidCategorySlug(slug)) {
      return error('Category not found', { slugIsExist: false });
    }
    let products = filterByCategory(slug).map(toListItem);
    const sort = searchParams.get('sort');
    products = sortProducts(products, sort);
    const limit = searchParams.get('limit');
    if (limit) {
      products = products.slice(0, parseInt(limit, 10));
    }
    return success({
      categoryTitle: CATEGORY_META[slug],
      products,
    });
  }

  if (pathname.match(/\/products\/all-products\/?$/)) {
    let products = MOCK_PRODUCTS.map(toListItem);
    products = sortProducts(products, searchParams.get('sort'));
    return success({ products });
  }

  if (pathname.match(/\/products\/search\/?$/)) {
    const keyword = searchParams.get('keyword') || '';
    let products = searchProducts(keyword).map(toListItem);
    products = sortProducts(products, searchParams.get('sort'));
    const title = keyword
      ? `SEARCH RESULTS FOR "${keyword.toUpperCase()}"`
      : 'SEARCH';
    return success({ categoryTitle: title, products });
  }

  const detailMatch = pathname.match(/\/products\/detail\/([^/]+)\/?$/);
  if (detailMatch) {
    const product = getProductBySlug(detailMatch[1]);
    if (!product) {
      return error('Product not found', { slugIsExist: false });
    }
    const relatedProducts = MOCK_PRODUCTS
      .filter((p) => p.id !== product.id && p.categorySlugs.some((s) => product.categorySlugs.includes(s)))
      .slice(0, 5)
      .map(toListItem);
    const {
      categories, categorySlugs, images, ...productDetail
    } = product;
    return success({
      product: {
        ...productDetail,
        images: toDetailImages(images),
      },
      categories,
      relatedProducts,
    });
  }

  return null;
};

const handleCart = (pathname, method, body) => {
  const getMatch = pathname.match(/\/cart\/([^/]+)\/?$/);
  if (getMatch && method === 'GET') {
    return success(buildCartResponse(getCartForKey(getMatch[1])));
  }

  if (!pathname.match(/\/cart\/?$/)) return null;

  const clientKey = body?.clientKey;
  if (!clientKey) return error('Invalid cart session');

  const carts = loadCarts();
  const cart = getCartForKey(clientKey);

  if (method === 'POST') {
    const product = MOCK_PRODUCTS.find((p) => p.id === body.productId);
    if (!product) return error('Product not found');
    const qty = body.qty || 1;
    const existing = cart.items.find((i) => i.productId === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.items.push({
        cartItemId: Date.now(),
        productId: product.id,
        title: product.title,
        price: product.price,
        qty,
        slug: product.slug,
        images: product.images,
      });
    }
    carts[clientKey] = cart;
    saveCarts(carts);
    return success(buildCartResponse(cart));
  }

  if (method === 'PUT') {
    (body.data || []).forEach(({ id, quantity }) => {
      const item = cart.items.find((i) => i.cartItemId === id);
      if (item) item.qty = quantity;
    });
    cart.items = cart.items.filter((i) => i.qty > 0);
    carts[clientKey] = cart;
    saveCarts(carts);
    return success(buildCartResponse(cart));
  }

  if (method === 'DELETE') {
    cart.items = cart.items.filter((i) => i.cartItemId !== body.id);
    carts[clientKey] = cart;
    saveCarts(carts);
    return success(buildCartResponse(cart));
  }

  return null;
};

const handleAuth = (pathname, method, body, headers) => {
  const authMatch = pathname.match(/\/auth\/([^/]+)\/?$/);
  if (!authMatch) return null;
  const action = authMatch[1];

  if (action === 'login' && method === 'POST') {
    if (!body?.username || !body?.password) {
      return error('Username and password are required');
    }
    return success({ token: MOCK_TOKEN });
  }

  if (action === 'register' && method === 'POST') {
    if (!body?.email || !body?.username) {
      return error('Please fill all required fields');
    }
    return success({ message: 'Registration successful' });
  }

  if (action === 'verify-token') {
    const authHeader = headers?.Authorization || headers?.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!token || token === 'null' || token === 'undefined') {
      return error('Invalid token');
    }
    return success({ valid: true });
  }

  return null;
};

const toOrderSummary = (order) => ({
  id: order.id,
  order_number: order.order_number,
  date_order: order.date_order,
  total: order.total,
  phone: order.phone,
});

const handleOrders = (pathname, method, body, headers, searchParams) => {
  const detailMatch = pathname.match(/\/orders\/([^/]+)\/?$/);

  if (detailMatch && method === 'GET') {
    const orderNumber = detailMatch[1];
    const orderId = searchParams.get('orderId');
    const phone = searchParams.get('phone');
    const order = loadOrders().find(
      (o) => o.order_number === orderNumber
        && (!orderId || String(o.id) === orderId)
        && (!phone || o.phone === phone),
    );
    if (!order) {
      return error('Order not found', { slugIsExist: false });
    }
    return success({
      order: {
        order_number: order.order_number,
        total: order.total,
        date_order: order.date_order,
        notes: order.notes,
        name: order.name,
        address: order.address,
        postal_code: order.postal_code,
        phone: order.phone,
      },
      products: order.products,
    });
  }

  if (pathname.match(/\/orders\/?$/) && method === 'GET') {
    const authHeader = headers?.Authorization || headers?.authorization || '';
    if (!authHeader.includes('Bearer')) {
      return success([]);
    }
    return success(loadOrders().map(toOrderSummary));
  }

  if (pathname.match(/\/orders\/?$/) && method === 'POST') {
    const clientKey = body?.clientKey;
    const cart = getCartForKey(clientKey);
    if (cart.items.length === 0) {
      return error('Cart is empty');
    }
    const cartResponse = buildCartResponse(cart);
    const orders = loadOrders();
    const newId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
    const orderNumber = generateOrderNumber();
    const newOrder = {
      id: newId,
      order_number: orderNumber,
      date_order: new Date().toISOString(),
      total: cartResponse.subtotal,
      phone: body.phone,
      name: `${body.firstName || ''} ${body.lastName || ''}`.trim(),
      address: body.address,
      postal_code: body.postalCode,
      notes: body.notes || '',
      products: cartResponse.items.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        qty: item.qty,
        slug: item.slug,
        image: item.image,
      })),
    };
    orders.unshift(newOrder);
    saveOrders(orders);
    cart.items = [];
    const carts = loadCarts();
    carts[clientKey] = cart;
    saveCarts(carts);
    return success({
      insertId: newId,
      orderNumber,
      phone: body.phone,
    });
  }

  return null;
};

export const handleMockRequest = async ({
  url, method = 'GET', data: body, headers,
}) => {
  await delay();
  const { pathname, searchParams } = parseRequestUrl(url);

  let result = handleProducts(pathname, searchParams);
  if (!result) result = handleCart(pathname, method, body);
  if (!result) result = handleAuth(pathname, method, body, headers);
  if (!result) result = handleOrders(pathname, method, body, headers, searchParams);

  if (!result) {
    result = error('Endpoint not found');
  }

  return { data: result };
};
