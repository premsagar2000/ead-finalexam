
const confirmMiddleware = function(req, res, next){
    const prompt = prompt("Are you sure you want to delete this recipe?");
    if( prompt.res==true){
        next();
    }

}

module.exports = confirmMiddleware;