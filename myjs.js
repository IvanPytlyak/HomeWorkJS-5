const data = [];
const inWrapperTable = document.querySelector(".in_wrapper_table");
const change = document.querySelector(".change");
const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

function render(data) {
  inWrapperTable.innerHTML = `
            <tr>
            <th>id</th>
            <th></th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th><label>Зарплата <input type="button" id="salary-up" value ="↑"><input type="button" id="salary-down" value="↓"></label></th>
            <th><label>Дата найма  <input type="button" id="date-up" value ="↑"><input type="button" id="date-down" value="↓"></label></th>
            </tr>`;
  data.forEach((item) => {
    //data-index ="${index}"
    inWrapperTable.innerHTML += `
            <tr class="inner"  id="${item.index}">
            <th>${item.index}</th>
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
    index: data.length,
    name: document.querySelector("#name").value,
    surname: document.querySelector("#surname").value,
    salary: document.querySelector("#salary").value,
    date: document.querySelector("#date").value,
  };
  data.push(list);
  // тут формировать localstorage?
  render(data);
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
    // const index = Array.from(
    //   document.querySelector(".in_wrapper_table").children
    // ).indexOf(inner);                                                    // -1 но работает почему?
    const index = data.findIndex((item) => item.index === inner.id); //  const index = data.findIndex((item) => item.index === inner.index); тоже работает , -1 но работает почему?
    data.splice(index - 1, 1);
  });
  render(data);
});
document.querySelector("#delete_all").addEventListener("click", (event) => {
  data.length = 0;
  render(data);
});

function changeRender(event) {
  event.preventDefault();
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  if (checkboxes.length > 0) {
    checkboxes.forEach((checkbox) => {
      const inner = checkbox.closest(".inner"); //
      // console.log(inner.id);
      // const index = Array.from(
      //   document.querySelector(".in_wrapper_table").children
      // ).indexOf(inner);                                                   // -1
      const index = data.findIndex((item) => item.index == inner.id); // -1 предлжено Ростиславом
      // const index = data.findIndex(                                                  // рабочая версия
      //   (item) => item.index === parseInt(inner.firstElementChild.textContent)
      // );

      // console.log(index);

      const change = document.querySelector(".change"); //
      change.innerHTML = ` 
       <div class="change_wrapper" >
        <h2>Редактирование</h2>
        <input type="text" name="change_name" id="change_name" value="${data[index].name}">
        <input type="text" name="change_surname" id="change_surname" value="${data[index].surname}">
        <input type="number" name="change_salary" id="change_salary" value="${data[index].salary}">
        <input type="date" name="change_date" id="change_date" value="${data[index].date}">
    
        <button class="saveButton">Save</button>
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
        render(data);
        change.style.display = "none";
      });
    });
  }
  if (checkboxes.length > 1) {
    alert(
      "Выбрано больше одного пользователя, исправлен будет лишь последний выбранный"
    );
  }
}

document.querySelector("#edit").addEventListener("click", (event) => {
  changeRender(event);
});

function sortSalaryAsc() {
  data.sort((a, b) => a.salary - b.salary);
  render(data);
}
function sortSalaryDesc() {
  data.sort((a, b) => b.salary - a.salary);
  render(data);
}

function sortDateAsc() {
  data.sort((a, b) => new Date(a.date) - new Date(b.date));
  render(data);
}
function sortDateDesc() {
  data.sort((a, b) => new Date(b.date) - new Date(a.date));
  render(data);
}

document.querySelector("#salary-up").addEventListener("click", () => {
  if (document.querySelector("#salary-up")) {
    sortSalaryAsc();
  }
});
document.querySelector("#salary-down").addEventListener("click", () => {
  if (document.querySelector("#salary-down")) {
    sortSalaryDesc();
  }
});
document.querySelector("#date-up").addEventListener("click", () => {
  if (document.querySelector("#date-up")) {
    sortDateAsc();
  }
});
document.querySelector("#date-down").addEventListener("click", () => {
  if (document.querySelector("#date-down")) {
    sortDateDesc();
  }
});

// document.querySelector("#salary-up").addEventListener("click", sortSalaryAsc);
// document.querySelector("#salary-down").addEventListener("click", sortDateDesc);
// document.querySelector("#date-up").addEventListener("click", sortDateAsc);
// document.querySelector("#date-down").addEventListener("click", sortDateDesc);
