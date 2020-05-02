const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema({ // Colunas do Banco
        name: { type: String, trim: true, required: true, maxlength: 40 },
        email: { type: String, trim: true, required: true, unique: 40 },
        hashed_password: { type: String, required: true },
        about: { type: String, trim: true },
        sal: String,
        role: { type: Number, default: 0 },
        history: { type: Array, default: [] }
    }, 
    { timestamps: true }
);

// Campo Virtual
userSchema.virtual('password').set(function(password) {
    this._passoword = password;
    this.sal = uuidv1();
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._passoword
});

userSchema.methods = {
    autenticar: function (plainText) { // Função autenticar; 
        return this.encryptPassword(plainText) === this.hashed_password // true or false
    },

   
    encryptPassword: function (password) {
        if (!password) {
            return '';
        } else {
            try {
                return crypto.createHmac('sha1', this.sal)
                    .update(password) // Atualize password
                    .digest('hex')
            } catch(error) {
                return error;
            }
        }
    }
};

module.exports = mongoose.model("user", userSchema);
