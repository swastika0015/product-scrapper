const express = require('express');
const app = express();

//mock product data
const generateProducts = (total, minPrice, maxPrice) => {
const products = [];
for (let i = 0; i < total; i++) {
const price = (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);
products.push({ id: i, price: parseFloat(price) });
}
return products;
};

//mock API endpoint to fetch products
app.get('/products', (req, res) => {
const minPrice = parseFloat(req.query.minPrice || 0);
const maxPrice = parseFloat(req.query.maxPrice || 100000);
const total = 99000 // testing it for 99000 products, you can change it any number or keep it random
const count = Math.min(parseInt(req.query.limit || 1000), total); // count is 1000 for testing 
const offset = parseInt(req.query.offset || 0);
const products = generateProducts(total, minPrice, maxPrice).slice(offset, offset + count);
res.json({ total: total, count: products.length, products: products });
});

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});