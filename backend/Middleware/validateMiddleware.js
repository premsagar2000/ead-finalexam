
const validateMiddleware = function(req, res, next){
    const {title, decription, ingredients, instructions, image} = req.body;
    if(!title || !description || !ingredients || !instructions || !image){
        return res.redirect('/addRecipe');
    }
    next();
}

module.exports = validateMiddleware;