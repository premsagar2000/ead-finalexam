
const confirmPrompt = function(req, res, next){
    
    prompt('Are you sure you want to delete this recipe?');
    if(confirmPrompt == true){
        next();
    }   
}

module.exports = confirmPrompt;