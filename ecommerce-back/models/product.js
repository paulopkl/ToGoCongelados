const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

module.exports = mongoose.model("Product", new mongoose.Schema( // Colunas do Banco
    {
        name: { type: String, trim: true, required: true, maxlength: 40 },
        description: { type: String, required: true, maxlength: 2000 },
        price: { type: Number, trim: true, required: true, maxlength: 32 },
        category: { type: ObjectId, ref: 'Category', required: true }, // Foreign Key
        quantity: { type: Number },
        sold: { type: Number, default: 0 },
        photo: { data: Buffer, contentType: String },
        shipping: { type: Boolean, required: false },
    },
    { timestamps: true }
));