'use strict';

//function to fetch products from the API
async function fetchProductsFromAPI(minPrice, maxPrice, offset, limit) {
const url = `http://localhost:3000/products?minPrice=${minPrice}&maxPrice=${maxPrice}&offset=${offset}&limit=${limit}`;
const response = await fetch(url);
if (!response.ok) {
throw new Error(`Failed to fetch products from API: ${response.status} ${response.statusText}`);
}
return await response.json();
}

//function to fetch products recursively
async function fetchAllProducts(minPrice, maxPrice, offset = 0, products = []) {
const limit = 1000; //as given in the problem statement
const response = await fetchProductsFromAPI(minPrice, maxPrice, offset, limit);
//adding fetched products to the products array
products.push(...response.products);
//return the products array when all products are fetched
if (products.length >= response.total) {
return products;
}
//make a recursive call with updated offset when there are more products to fetch
return fetchAllProducts(minPrice, maxPrice, offset + limit, products);
}

//testing:
const minPrice = 0; //as given in the problem statement
const maxPrice = 1000000; //as given in the problem statement
fetchAllProducts(minPrice, maxPrice)
.then(products => {
console.log("Total products fetched: ", products.length, products);
})
.catch(error => {
console.error("Error fetching products: ", error);
});