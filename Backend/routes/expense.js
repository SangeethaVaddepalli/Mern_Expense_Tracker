const express = require("express");
const router = express.Router(); //calling Router fun from express
const Expense = require("../models/Expense"); //

// add expense to database
router.post("/",async (req,res)=>{ // using mthd post to add expense and callback fun how to dislay expense on databse
    try{
        const newExpense = await Expense(req.body);
        const expense = newExpense.save();
        res.status(201).json(expense);

    }catch(cerror){
        res.status(500).json(error);
    }

});

// Get all expenses
router.get("/",async (req,res)=>{  // using mthd get to fetch data from router/databse
    console.log(req.body)
    try{ 
        const expenses = await Expense.find().sort({createdAt:-1});// sort to display latest exp at top
        res.status(200).json(expenses);//sending exp to frontend to display on interface


    }catch(error){
        res.status(500).json(error)

    }

})
// update expense
router.put("/:id",async (req,res)=>{
    try{
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
        {new:true}
    );
    res.status(201).json(expense)

    }catch(error){
        res.status(500).json(error)
    }

})
// delete expense
router.delete("/:id",async (req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.status(201).json("deleted successfully");

    }catch(error){
        res.status(500).json(error);

    }

});

// export router bcoz we will use in index.js for our entry file to our server
module.exports = router;