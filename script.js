// ===== To-Do App =====
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

// Load tasks on page load
window.onload = function () {
  loadTasks();
};

// Add Task
function addTask() {
  const taskValue = taskInput.value.trim();
  if (taskValue === "") {
    alert("⚠️ Please enter a task!");
    return;
  }

  createTaskElement(taskValue);
  saveTask(taskValue);
  taskInput.value = "";
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.innerHTML = `${taskText} <button onclick="removeTask(this)">❌</button>`;
  taskList.appendChild(li);
}

function removeTask(button) {
  const li = button.parentElement;
  const taskText = li.firstChild.textContent.trim();
  li.remove();
  deleteTask(taskText);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function deleteTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskElement(task));
}

// ===== Product Listing =====
const products = [
  { name: "Laptop", category: "tech", price: 700 },
  { name: "Headphones", category: "tech", price: 50 },
  { name: "T-Shirt", category: "fashion", price: 20 },
  { name: "Sofa", category: "home", price: 300 },
  { name: "Watch", category: "fashion", price: 150 },
];

function displayProducts(list) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  list.forEach((p) => {
    productList.innerHTML += `
      <div class="product-card">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>💲${p.price}</p>
      </div>
    `;
  });
}
displayProducts(products);

function filterProducts() {
  const category = document.getElementById("filterCategory").value;
  if (category === "all") displayProducts(products);
  else displayProducts(products.filter((p) => p.category === category));
}

function sortProducts() {
  const sortValue = document.getElementById("sortPrice").value;
  let sorted = [...products];
  if (sortValue === "low-high") sorted.sort((a, b) => a.price - b.price);
  if (sortValue === "high-low") sorted.sort((a, b) => b.price - a.price);
  displayProducts(sorted);
}

// ===== Contact Form =====
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (name === "" || email === "" || message === "") {
    formMessage.style.color = "red";
    formMessage.innerText = "⚠️ Please fill in all fields!";
    return;
  }
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    formMessage.style.color = "red";
    formMessage.innerText = "⚠️ Invalid email!";
    return;
  }
  formMessage.style.color = "green";
  formMessage.innerText = "✅ Message sent successfully!";
  document.getElementById("contactForm").reset();
});
