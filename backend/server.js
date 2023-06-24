const express = require('express');
const app = express();

const mongoose = require('mongoose');

const RecipeSchema = require('./model/RecipeSchema');
const validateMiddleware = require('./Middleware/validateMiddleware');


mongoose.connect('mongodb://127.0.0.1:27017/', {dbName:'RecipeManagmentApp'}).then((res)=>{
    console.log('Connected')
}).catch((err)=>{
    console.log(err)
});

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');


app.get('/', (req, res)=>{
    res.render("home");
});

app.get('/showrecipes', async (req, res)=>{
    const recipes = await RecipeSchema.find();
    res.render("ShowRecipes", {recipes});
});

app.get('/addRecipe', validateMiddleware, (req, res)=>{    
    const recipe = {};
    res.render("AddRecipe", {recipe});
});


app.post('/recipe/save' , validateMiddleware,async (req, res)=>{
    const recipe = await RecipeSchema.create(req.body);
    res.redirect('/showrecipes');
});

app.get('/recipe-details/:myid', async(req, res)=>{
    const recipe = await RecipeSchema.findById(req.params.myid);
    res.render('Recipe-Details', {recipe});
});

app.post("/recipe/update/:id", validateMiddleware,async function(req, res){
    const id = req.params.id;
    const newRecipe = await RecipeSchema.updateOne({_id:id}, {$set:{title:req.body.title, description:req.body.description, ingredients:req.body.ingredients, instructions:req.body.instructions, image:req.body.image}});  
    console.log('Product Updated');
    res.redirect('/showrecipes');
})


app.get("/recipe/update/:id", async function(req, res){
    const id = req.params.id;
    const recipe = await RecipeSchema.findById(req.params.id);
    console.log(recipe);
    res.render('addRecipe', {recipe});
});


app.get("/recipe/delete/:id",confirmMiddleware,async function(req, res){
    const id = req.params.id;
    await RecipeSchema.deleteOne( { _id:id} );
    console.log('Deleted Successfulyy');
    res.redirect('/showrecipes');

});

app.get("*", (req, res)=>{
    res.render("not-found");
})

const server = app.listen(2700, ()=>{
    console.log('Server is listening at the port '+server.address().port);
})



