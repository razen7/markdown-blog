const mongoose= require('mongoose');

const articleSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    author:{
        type: String,
    },
    created_at:{
        type: Date,
        default: Date.now()
    }
})

module.exports=mongoose.model('Article', articleSchema);