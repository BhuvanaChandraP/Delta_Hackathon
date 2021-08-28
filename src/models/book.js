const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
 
  name:{
      type:Number
  },
  pages:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'Page'
  },
  date: {
    type:Date,
    
  },
  
  
 
  
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
