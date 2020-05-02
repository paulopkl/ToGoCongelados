const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema( // Colunas do Banco
    { 
        name: { 
            type: String,
            trim: true, 
            required: true,
            minlength: 2,
            maxlength: 40,
            unique: true // Para não repetir a categoria
        } 
    }, 
    { timestamps: true }
);

// O banco de Dados pode ser acessado utilizando o modelo Category 
// Por exemplo Category.findById() é a mesma coisa na linha de código ( db.Category.findById({ id }) )
module.exports = mongoose.model("Category", categorySchema); 
