const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense"); 

// add expense to database
router.post("/",async (req,res)=>{ 
    try{
        const newExpense = await Expense(req.body);
        const expense = newExpense.save();
        res.status(201).json(expense);

    }catch(cerror){
        res.status(500).json(error);
    }
});
router.get("/",async (req,res)=>{  
    console.log(req.body)
    try{ 
        const expenses = await Expense.find().sort({createdAt:-1});
        res.status(200).json(expenses);


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
module.exports = router;
