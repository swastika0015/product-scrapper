const { mockFetchProducts } = require('./mockFetch.js');

// function to fetch products in batches until all products are retrieved
async function fetchAllProducts(minPrice, maxPrice, batchSize) {
    let products = [];
    let totalFetched = 0;
    let currentMin = minPrice;

    while (totalFetched < Number.MAX_SAFE_INTEGER) {
        let remainingProducts = Math.min(batchSize, Number.MAX_SAFE_INTEGER - totalFetched);
        let response = await mockFetchProducts(currentMin, maxPrice, remainingProducts);

        // accumulate fetched products
        products.push(...response.products);

        totalFetched += response.count;

        // if all products are fetched, break the loop
        if (totalFetched >= response.total) {
            break;
        }

        // update currentMin for the next batch
        currentMin = Math.max(...response.products.map(product => product.price)) + 1;
    }

    return products;
}

// fetch all products
fetchAllProducts(0, 100000, 1000) // 0-100000 is the price range and API returns at max 1000 products per call.
    .then(products => {
        console.log("Total products fetched: ", products.length, products);
    })
    .catch(error => {
        console.error("Failed fetching products: ", error);
    });
