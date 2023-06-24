
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title:String,
    description:String,
    ingredients:String,
    instructions:String,
    image:String,    
})

const model = mongoose.model('Recipe', RecipeSchema);

module.exports = model;