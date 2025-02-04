const mongoose = require("mongoose"); //import mongoose

const ExpenseSchema = mongoose.Schema({
    label:{type:String, require:true},
    value:{type:Number, require:true},
    date:{type:String, require:true},

});


// Export mongoose and Expense is database name
module.exports = mongoose.model("Expense",ExpenseSchema);