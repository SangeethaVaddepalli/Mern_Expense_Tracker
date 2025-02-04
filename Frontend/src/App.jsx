
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { publicRequest } from "./requestMethods";

function App() {
  const [addExpense, setAddExpense] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [update, setUpdate] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [label, setLabel] = useState("");
  const [amount, setValue] = useState(0);
  const [date, setDate] = useState("");
  const [updatedId, setUpdatedID] = useState(null);
  const [updatedLabel, setUpdatedLabel] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddExpense = () => {
    setAddExpense(!addExpense);
  };

  const handleShowChart = () => {
    setShowChats(!showChats);
  };

  const handleUpdate = (id, label, value, date) => {
    setUpdatedID(id);
    setUpdatedLabel(label);
    setUpdatedAmount(value);
    setUpdatedDate(date);
    setUpdate(true);
  };

  const handleExpense = async () => {
    try {
      await publicRequest.post("/expenses", {
        label,
        date,
        value: amount,
      });
      setLabel("");
      setValue(0);
      setDate("");
      setAddExpense(false); // Close the add expense modal
      window.location.reload(); // Reload to show new expenses
    } catch (error) {
      console.log(error);
    }
  };

  const updateExpense = async () => {
    try {
      if (updatedId) {
        await publicRequest.put(`/expenses/${updatedId}`, {
          value: updatedAmount,
          label: updatedLabel,
          date: updatedDate,
        });
        setUpdate(false); // Close the update modal
        setUpdatedLabel("");
        setUpdatedAmount("");
        setUpdatedDate("");
        setUpdatedID(null);
        window.location.reload(); // Reload to show updated expenses
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await publicRequest.get("/expenses");
        setExpenses(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSum = filteredExpenses.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-[3%] w-[80%] mr-[5%] ml-[5%] ">
        <h1 className="text-2xl font-medium">Expense Tracking App</h1>
        <div className="flex items-center justify-between mt-5 w-[100%]">
          <div className="relative flex justify-between w-[300px]">
            <button
              className="bg-pink-600 p-[10px] border-none outline-none cursor-pointer text-[#fff] text-medium rounded-lg"
              onClick={handleAddExpense}
            >
              Add Expense
            </button>
            <button
              className="bg-blue-500 cursor-pointer p-[10px] text-[#fff] rounded-lg"
              onClick={handleShowChart}
            >
              Expense Report
            </button>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="p-[10px] w-[150px] border-2 border-solid rounded-lg pl-[20px] "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        
        {addExpense && (
          <div className="absolute z-[999] flex flex-col p-[20px] top-[20%] left-[30%] w-[400px] bg-white shadow-xl rounded-md">
            <FaWindowClose
              className="flex justify-end items-end text-2xl text-pink-600  cursor-pointer"
              onClick={handleAddExpense}
            />
            <h2 className="text-xl text-center mb-4">Add New Expense</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExpense();
              }}
            >
              <div className="mb-4">
                <label className="block mb-1">Expense Name</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full p-2 border border-[#ddd] rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full p-2 border border-[#ddd] rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border border-[#ddd] rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-pink-600 text-white rounded-md"
              >
                Add Expense
              </button>
            </form>
          </div>
        )}

        
        {update && (
          <div className="absolute z-[999] flex flex-col p-[20px] top-[20%] left-[30%] w-[400px] bg-white shadow-xl rounded-md">
            <FaWindowClose
              className="flex justify-end items-end text-2xl text-purple-600 cursor-pointer"
              onClick={() => setUpdate(false)}
            />
            <h2 className="text-xl text-center mb-4">Update Expense</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateExpense();
              }}
            >
              <div className="mb-4">
                <label className="block mb-1">Expense Name</label>
                <input
                  type="text"
                  value={updatedLabel}
                  onChange={(e) => setUpdatedLabel(e.target.value)}
                  className="w-full p-2 border border-[#ddd] rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Amount</label>
                <input
                  type="number"
                  value={updatedAmount}
                  onChange={(e) => setUpdatedAmount(e.target.value)}
                  className="w-full p-2 border border-[#ddd] rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  value={updatedDate}
                  onChange={(e) => setUpdatedDate(e.target.value)}
                  className="w-full p-2 border border-[#ddd] rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-purple-600 text-white rounded-md"
              >
                Update Expense
              </button>
            </form>
          </div>
        )}

        <div className="flex flex-col mt-10">
          {filteredExpenses.map((expense) => (
            <div
              className="relative flex justify-between items-center w-[80vw] h-[100px] bg-pink-100 my-[15px] py-[5px]"
              key={expense._id}
            >
              <h2 className="m-[20px]  text-[18px] font-medium text-[#555]">
                {expense.label}
              </h2>
              <h2 className="m-[20px] text-[18px]">{expense.date}</h2>
              <h2 className="m-[20px] text-[18px] font-medium">
                ${expense.value}
              </h2>
              <div>
                <FaTrash
                  className="text-red-500 mr-[10px] cursor-pointer"
                  onClick={() => handleDelete(expense._id)}
                />
                
                <FaEdit
                  className=" my-[10px] cursor-pointer"
                  onClick={() =>
                    handleUpdate(
                      expense._id,
                      expense.label,
                      expense.value,
                      expense.date
                    )
                  }
                />
              
                
              </div>
            </div>
          ))}
        </div>
        

        

        {showChats && (
          <div className="absolute z-[999] flex flex-col p-[10px] top-[20px] left-[100px] h-[500px] w-[500px] bg-white shadow-xl">
            <FaWindowClose
              className="flex justify-end items-end text-2xl text-blue-500 cursor-pointer"
              onClick={handleShowChart}
            />
            <PieChart
              series={[
                {
                  data: expenses,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                  cx: 150,
                  cy: 150,
                },
              ]}
            />
            <div>
              <strong>Total Expenses:</strong> ${totalSum}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;




