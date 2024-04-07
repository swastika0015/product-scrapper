// mock function to generate product data for testing purposes
async function mockFetchProducts(minPrice, maxPrice, batchSize) {
    // simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // generate mock products within the price range
    let products = [];
    // random total number of products
    let totalCount = Math.floor(Math.random() * 100000); // we can increase the number of products, if the number very huge, it might cause longer response times or memory issues.
    for (let i = 0; i < batchSize && i < totalCount; i++) {
        // random price for each product
        let price = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
        products.push({ id: i, price: price });
    }

    return { total: totalCount, count: products.length, products: products };
}

// export the mockFetchProducts function
module.exports = {
    mockFetchProducts
};