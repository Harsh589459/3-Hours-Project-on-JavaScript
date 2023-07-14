function addExpense(){
    console.log("Hi")

    var expenseAmount = document.getElementById('expense').value;
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;

    var expense = {
        expenseAmount:expenseAmount,
        description:description,
        category:category
    }

    var expenses = localStorage.getItem("expenses");
    if(expenses){
        expenses = JSON.parse(expenses);
    }else{
        expenses=[];
    }
    expenses.push(expense);
    localStorage.setItem("expenses",JSON.stringify(expenses));
    console.log(expenses);

    displayExpenses();
    

}

function displayExpenses(){
    var expenses = localStorage.getItem("expenses");
    if(expenses){
        expenses = JSON.parse(expenses);
        var expenseList = document.getElementById('expense-list');
        expenseList.innerHTML="";
        for(var i=0;i<expenses.length;i++){
            var expense = expenses[i];
            var listItem = document.createElement("li");
            listItem.textContent = expense.expenseAmount + " | " +expense.description + " | " + expense.category;
            var editButton = document.createElement("button");
            editButton.textContent="Edit";
            editButton.setAttribute("data-index",i);
            editButton.addEventListener("click",function(){
                var index = parseInt(this.getAttribute("data-index"));
                editExpenses(index);
            });
            var deleteButton = document.createElement("button");
            deleteButton.textContent="Delete";
            deleteButton.setAttribute("data-index",i);
            deleteButton.addEventListener("click",function(){
                var index = parseInt(this.getAttribute("data-index"));
                deleteExpenses(index);
            });
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            expenseList.appendChild(listItem);
        }
    }
}

function deleteExpenses(index){
    var expenses = localStorage.getItem("expenses");
    if(expenses){
        expenses=JSON.parse(expenses);

        expenses.splice(index,1);
        localStorage.setItem("expenses",JSON.stringify(expenses));
        displayExpenses();
    }
}

function editExpenses(index){
    var expenses = localStorage.getItem("expenses");
    if(expenses){
        expenses = JSON.parse(expenses);
    }
    console.log(expenses);
    var expense = expenses[index];
    document.getElementById("expense").value = expense.expenseAmount;
    document.getElementById("description").value = expense.description;
    document.getElementById("category").value = expense.category;

    deleteExpenses(index);}