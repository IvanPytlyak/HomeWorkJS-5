const data = [];
const inWrapperTable = document.querySelector(".in_wrapper_table");
const change = document.querySelector(".change");
const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
function render() {
  inWrapperTable.innerHTML = `
            <tr>
            <th></th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Зарплата</th>
            <th>Дата найма</th>
            </tr>`;
  data.forEach((item) => {
    inWrapperTable.innerHTML += `
            <tr class="inner">
            <td><input type="checkbox" name="check" id="check">
            <td>${item.name}</td>
            <td>${item.surname}</td>
            <td>${item.salary}</td>
            <td>${item.date}</td>
            </tr>
          `;
  });
}

function addItem(event) {
  event.preventDefault();
  const list = {
    name: document.querySelector("#name").value,
    surname: document.querySelector("#surname").value,
    salary: document.querySelector("#salary").value,
    date: document.querySelector("#date").value,
  };
  data.push(list);
  render();
}

document.querySelector("#submit").addEventListener("click", (event) => {
  addItem(event);
});

document.querySelector("#delete").addEventListener("click", (event) => {
  const checkboxes = document.querySelectorAll(
    //
    'input[type="checkbox"]:checked' //
  ); //
  checkboxes.forEach((checkbox) => {
    const inner = checkbox.closest(".inner");
    const index = Array.from(
      document.querySelector(".in_wrapper_table").children
    ).indexOf(inner);
    data.splice(index - 1, 1);
  });
  render();
});
document.querySelector("#delete_all").addEventListener("click", (event) => {
  data.length = 0;
  render();
});

function changeRender(event) {
  event.preventDefault();
  if (checkboxes) {
    const inner = checkbox.closest(".inner"); //
    const index = Array.from(
      document.querySelector(".in_wrapper_table").children
    ).indexOf(inner);

    change.innerHTML = ` 
       <div class="change_wrapper" >
        <h2>Редактирование</h2>
        <input type="text" name="change_name" id="change_name" value="${data[index].name}">
        <input type="text" name="change_surname" id="change_surname" value="${data[index].surname}">
        <input type="number" name="change_salary" id="change_salary" value="${data[index].salary}">
        <input type="date" name="change_date" id="change_date" value="${data[index].date}">
    
        <button class="saveButton">Save</button>\n
       </div>
     `;
    change.style.display = "block";

    change.querySelector(".saveButton").addEventListener("click", (event) => {
      const changetName = document.querySelector("#change_name");
      const changetSurname = document.querySelector("#change_surname");
      const changetSalary = document.querySelector("#change_salary");
      const changetDate = document.querySelector("#change_date");

      data[index].name = changetName.value;
      data[index].surname = changetSurname.value;
      data[index].salary = changetSalary.value;
      data[index].date = changetDate.value;
      render();
      change.style.display = "none";
    });
  }
}
