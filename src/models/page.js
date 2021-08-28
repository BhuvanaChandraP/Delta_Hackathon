const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true
  },
  body: {
    type: String,
   
  },
  color:{
      type:String
  },
  created:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  book:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Book'
  },
  date: {
    type:Date,
    
  },
  
  
 
  
});

const Page = mongoose.model("Page", PageSchema);

module.exports = Page;
