const formELement = document.querySelector(".form");
const todoNameInputElment = document.querySelector(".todoName");
const tbodyElement = document.querySelector("#tbody");

const data= JSON.parse(localStorage.getItem("data")) || [];
renderArray(data);

formELement.addEventListener("submit" , event => {
    event.preventDefault();
    if(todoNameInputElment.value.length > 0){
        data.push({
            name: todoNameInputElment.value,
            isDone: false
        });
        renderArray(data);
    }   
})

function renderArray(array){
    localStorage.setItem("data" , JSON.stringify(array));
    tbodyElement.textContent = "";
    for(let item of array){
        const newTrElement = document.createElement("tr");
        if(item.isDone){
            newTrElement.classList.add("table-success");
        }
        const newTodoNameElement = document.createElement("td");
        const newTdButtonsWrapperElement = document.createElement("td");
        const btnSuccessElement = document.createElement("button");
        const btnDangerELement = document.createElement("button");

        newTodoNameElement.textContent = item.name;
        btnSuccessElement.textContent = "Bajarildi";
        btnSuccessElement.classList.add("btn" , "btn-success" , "me-2");
        btnDangerELement.textContent = "O'chirildi";
        btnDangerELement.classList.add("btn" , "btn-danger");

        newTdButtonsWrapperElement.appendChild(btnSuccessElement);
        newTdButtonsWrapperElement.appendChild(btnDangerELement);
        newTrElement.appendChild(newTodoNameElement);
        newTrElement.appendChild(newTdButtonsWrapperElement);

        tbodyElement.appendChild(newTrElement);

        btnSuccessElement.addEventListener("click" , event => {
            event.preventDefault();
            item.isDone = true;
            renderArray(array);
        })

        btnDangerELement.addEventListener("click" , event => {
            event.preventDefault();
            array.splice(array.indexOf(item) , 1);
            renderArray(array);
        })
    }
}