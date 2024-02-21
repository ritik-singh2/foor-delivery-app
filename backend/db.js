const mongoose = require('mongoose');
const mongoURL='mongodb+srv://rtkhere:ritik@cluster0.l2v0bvl.mongodb.net/gofoodmern?retryWrites=true&w=majority'
const mongoDB=async()=>{
    try{
        await mongoose.connect(mongoURL,{ useNewUrlParser:true});
        console.log("Connected");
        const fetched_data= await mongoose.connection.db.collection('food_items');
        fetched_data.find({}).toArray(function(err,data){
            if(err) console.log(err);
            else {
                // global.food_items=data;
                // console.log(global.food_items)
            }
        })
    }
    catch(err){
        console.log("Error in connection" + err.message);
    }
}

module.exports=mongoDB;


