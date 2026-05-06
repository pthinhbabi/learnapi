//Import thư viện cần thiết
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();


//Cấu hình Express
app.use(express.json());


//Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Kết nối MongoDB Atlas thành công"))
    .catch(err => console.error("❌ Lỗi kết nối:", err));



//Định nghĩa Schema và Model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image_url: String
});
const Product = mongoose.model("Product", productSchema, "sanpham");



//Viết API CRUD
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
});

app.put('/api/products/:id', async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa sản phẩm" });
});



// Khởi động server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server chạy ở http://localhost:${PORT}`));
