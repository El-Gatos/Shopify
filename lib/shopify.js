// lib/shopify.js

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({ query, variables }) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;
  const key = storefrontAccessToken;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
      },
      body: JSON.stringify({ query, variables }),
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data',
    };
  }
}

// Shared cart fragment so both getCart and createCartAndAdd return identical shapes
const CART_FRAGMENT = `
  id
  checkoutUrl
  cost {
    totalAmount { amount }
    subtotalAmount { amount }
  }
  lines(first: 10) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount }
            product { title }
            image { url altText }
          }
        }
      }
    }
  }
`;

export async function getCart(cartId) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ${CART_FRAGMENT}
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { cartId } });

  if (response.status !== 200 || response.body.errors) {
    return null;
  }

  return response.body.data?.cart || null;
}

export async function getProduct(handle) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        descriptionHtml
        priceRange { minVariantPrice { amount } }
        images(first: 1) { edges { node { url altText } } }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { handle } });

  if (response.status !== 200 || response.body.errors) {
    console.error('🚨 GET_PRODUCT ERROR:', JSON.stringify(response.body.errors, null, 2));
    return null;
  }

  return response.body.data?.product || null;
}

export async function createCartAndAdd(variantId) {
  const query = `
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          ${CART_FRAGMENT}
        }
      }
    }
  `;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const variables = {
    cartInput: {
      lines: [{ merchandiseId: variantId, quantity: 1 }],
      attributes: [{ key: 'return_url', value: baseUrl }],
    },
  };

  const response = await shopifyFetch({ query, variables });

  if (response.body.errors) {
    console.error('Shopify Error:', response.body.errors);
    return null;
  }

  return response.body.data.cartCreate.cart;
}

export async function getProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });

  if (!response.body.data || !response.body.data.products) {
    return [];
  }

  return response.body.data.products.edges.map((edge) => edge.node);
}

export async function updateCartQuantity(cartId, lineId, quantity) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FRAGMENT}
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [{ id: lineId, quantity }],
  };

  const response = await shopifyFetch({ query, variables });
  return response.body.data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId, lineIds) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${CART_FRAGMENT}
        }
      }
    }
  `;

  const variables = { cartId, lineIds };
  const response = await shopifyFetch({ query, variables });
  return response.body.data.cartLinesRemove.cart;
}

export async function searchProducts(query) {
  const gqlQuery = `
    query searchProducts($query: String!) {
      products(first: 8, query: $query) {
        edges {
          node {
            id
            title
            handle
            productType
            priceRange {
              minVariantPrice { amount }
            }
            images(first: 1) {
              edges { node { url altText } }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query: gqlQuery, variables: { query } });

  if (!response.body?.data?.products) return [];

  return response.body.data.products.edges.map((edge) => edge.node);
}

export async function getProductsWithTypes() {
  const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            productType
            priceRange {
              minVariantPrice { amount }
            }
            images(first: 1) {
              edges { node { url altText } }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });

  if (!response.body?.data?.products) return [];

  return response.body.data.products.edges.map((edge) => edge.node);
}