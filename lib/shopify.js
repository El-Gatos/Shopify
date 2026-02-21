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
        # NEW: Grabbing the first variant ID to use for the cart
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
  return response.body.data.product;
}

// lib/shopify.js

export async function createCartAndAdd(variantId) {
  const query = `
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
          checkoutUrl
          cost {
            subtotalAmount {
              amount
            }
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
                    price {
                      amount
                    }
                    product {
                      title
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartInput: {
      lines: [{ merchandiseId: variantId, quantity: 1 }]
    }
  };

  const response = await shopifyFetch({ query, variables });
  return response.body.data.cartCreate.cart;
}