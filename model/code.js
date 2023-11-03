const mongoose = require('mongoose');

const code_schema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    snippets: [
        {
            language: String,
            tittle: String,
            code: String
        }
    ]
})

const code_model = mongoose.model('code', code_schema);

module.exports = code_model;