// lib/shopify.js

// You'll put these in a .env.local file so you don't leak your keys to the public
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
      body: { query, variables } && JSON.stringify({ query, variables }),
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

// lib/shopify.js

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
  
  // Log the error so we can see it in the terminal
  if (response.status !== 200 || response.body.errors) {
    console.error("🚨 GET_PRODUCT ERROR:", JSON.stringify(response.body.errors, null, 2));
    return null;
  }

  return response.body.data?.product || null;
}

// lib/shopify.js

export async function createCartAndAdd(variantId) {
  const query = `
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
          checkoutUrl
          # ... rest of your existing query fields
        }
      }
    }
  `;

  // Determine the base URL (localhost for now, your domain later)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const variables = {
    cartInput: {
      lines: [{ merchandiseId: variantId, quantity: 1 }],
      // This tells Shopify where to send users back to
      attributes: [{ key: "return_url", value: baseUrl }]
    }
  };

  const response = await shopifyFetch({ query, variables });
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
  
  // Failsafe in case Shopify returns garbage
  if (!response.body.data || !response.body.data.products) {
    return [];
  }
  
  return response.body.data.products.edges.map((edge) => edge.node);
}

export async function removeFromCart(cartId, lineIds) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          cost { subtotalAmount { amount } }
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
        }
      }
    }
  `;

  const variables = { cartId, lineIds };
  const response = await shopifyFetch({ query, variables });
  return response.body.data.cartLinesRemove.cart;
}