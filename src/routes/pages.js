const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user");
const Page = require("../models/page");
const Book = require("../models/book");
const {checkAuth} =require('../middleware/checkAuth');




router.get('/book/:num' , checkAuth,async(req,res)=>{
    //const { email, username, password  } = req.body;
    const p = await Book.findOne({name : req.params.num});
    console.log(p)
    if(p == null)
    {
        const book = new Book({ name : req.params.num  });
        await book.save();
   
    }
    const book1 = await  Book.findOne( {name : req.params.num } ).populate('pages');
    res.render('book1' , {book1});
})

router.get('/book/:num/page' , checkAuth , async(req,res) =>{
    const p = await Page.findOne({header:"default"});
    console.log(p)
    if(p == null)
    {
        const book = await  Book.findOne( {name : req.params.num } )
        console.log(book);
        const page = new Page({ header : "default" , book: book._id});
        await page.save();
        console.log(page);
    }
    const book1 = await Book.findOne({name : req.params.num }).populate('pages');
    console.log(book1);
    let c = req.params.num;
    console.log(c);
    if(c%2 == 0)
    {
        console.log("got");
        res.render('mypage2' , { book1 });

    }
    else{
        res.render('mypage' , { book1 });
    }
   
})
router.get('/new/:bid/page' ,checkAuth ,async(req,res)=>{
    const book1 =await Book.findById(req.params.bid);
    res.render('create' , { book1 });
})
router.post('/new/:bid/page' , checkAuth , async(req,res)=>{
   
    const { header , body , color } = req.body;
    // const { body }  = req.body.richTextField;
    //const { header,body} = req.body;
    const newPage = new Page({ header , body , created : req.user._id, date : Date.now() ,color:color} )   
    await newPage.save();
    let  book1 = await Book.findOne({_id : req.params.bid }).populate('pages');
    console.log(book1)
    const d1 = await Book.findOneAndUpdate( {_id : book1._id} , {$push :{ pages : newPage }} , {
        new: true
    });
    await d1.save() ;
    //console.log(newPage);
    book1 = await Book.findOne({_id : req.params.bid  }).populate('pages');
    //console.log(newPage);
    res.render('book1' , {book1});
})

router.get('/display/:pid' , checkAuth, async(req,res)=>{
    const d = await Page.findById(req.params.pid);
    console.log(d);
    res.render('displayeach' , { d });
})
router.get('/edit/:bid/:pid' ,checkAuth,async(req,res)=>{
    const d = await Page.findById(req.params.pid);
    const d1 = await Book.findById(req.params.bid);
    console.log(d);
    res.render('edit' , { d , d1});
})
router.post('/edit/:bid/:pid' ,checkAuth,async(req,res)=>{
    console.log(req.body);
    let d1;
    let b1 = {body : req.body.body};
    let  h1 = {header : req.body.header};
    let  h2 = {color : req.body.color};
    d1 = await Page.findOneAndUpdate( {_id : req.params.pid} , b1 , {
        new: true
    });
    await d1.save() ;
    d1 = await Page.findOneAndUpdate( {_id : req.params.pid} , h1 , {
        new: true
    });
    await d1.save() ;
    d1 = await Page.findOneAndUpdate( {_id : req.params.pid} , h2 , {
        new: true
    });
    await d1.save() ;
    // console.log(d1);
    const d = await Page.findById(req.params.did);
    console.log(d);
    let c1 = await Book.findById(req.params.bid);
    console.log(c1)
    res.redirect(`/book/${c1.name}`);
})
router.get('/delete/:bid/:pid' ,checkAuth,async(req,res)=>{
    let d1;
    d1 = await Book.findOneAndUpdate( { _id : req.params.bid} , {$pull : {pages :req.params.pid}}, {
        new: true
    });
    await d1.save() ;
    await Page.findByIdAndDelete(req.params.pid);
    let c = await Book.findById(req.params.bid);
    res.redirect(`/book/${c.name}`);
})
module.exports = router;