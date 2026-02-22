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

export async function createCartAndAdd(variantId, cartId = null) {
  // If we already have a cart, add to the existing one
  if (cartId) {
    const query = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            cost { subtotalAmount { amount } }
            lines(first: 10) { edges { node { id quantity merchandise { ... on ProductVariant { id title price { amount } product { title } image { url } } } } } }
          }
        }
      }
    `;
    const variables = { cartId, lines: [{ merchandiseId: variantId, quantity: 1 }] };
    const response = await shopifyFetch({ query, variables });
    return response.body.data.cartLinesAdd.cart;
  }

  // Fallback: Create a brand new cart
  const query = `
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
          checkoutUrl
          cost { subtotalAmount { amount } }
          lines(first: 10) { edges { node { id quantity merchandise { ... on ProductVariant { id title price { amount } product { title } image { url } } } } } }
        }
      }
    }
  `;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const variables = {
    cartInput: {
      lines: [{ merchandiseId: variantId, quantity: 1 }],
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

export async function updateCartQuantity(cartId, lineId, quantity) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          cost { subtotalAmount { amount } }
          lines(first: 10) { edges { node { id quantity merchandise { ... on ProductVariant { id title price { amount } product { title } image { url } } } } } }
        }
      }
    }
  `;
  const variables = { cartId, lines: [{ id: lineId, quantity }] };
  const response = await shopifyFetch({ query, variables });
  return response.body.data.cartLinesUpdate.cart;
}

// Add this to the bottom of lib/shopify.js

export async function subscribeToNewsletter(email) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  // NOTE: This uses the ADMIN token, not the Storefront token
  const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN; 

  const endpoint = `https://${domain}/admin/api/2024-01/customers.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({
        customer: {
          email: email,
          accepts_marketing: true
        }
      })
    });

    const body = await result.json();

    // If Shopify returns an error (like "email already exists"), it will be in body.errors
    if (!result.ok && !body.errors?.email) {
      console.error('Newsletter Error:', body.errors);
      return { success: false, error: body.errors };
    }

    // Return success even if the email exists, so the user sees the success state
    return { success: true };
  } catch (error) {
    console.error('Newsletter Catch Error:', error);
    return { success: false };
  }
}