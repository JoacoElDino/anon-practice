const ACCESS_CODE = "1234";
const anonName = "Anon#" + Math.floor(Math.random() * 9000);

const login = document.getElementById("login");
const app = document.getElementById("app");
const muro = document.getElementById("muro");
const chat = document.getElementById("chat");

function checkCode() {
  const code = document.getElementById("code").value;
  if (code === ACCESS_CODE) {
    login.classList.add("hidden");
    app.classList.remove("hidden");
    loadPosts();
    loadChat();
  } else {
    alert("Código incorrecto");
  }
}

function showSection(section) {
  muro.classList.add("hidden");
  chat.classList.add("hidden");
  document.getElementById(section).classList.remove("hidden");
}

/* MURO */
function addPost() {
  const text = document.getElementById("muroText").value.trim();
  if (!text) return;

  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.unshift(text);
  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("muroText").value = "";
  loadPosts();
}

function loadPosts() {
  const container = document.getElementById("posts");
  container.innerHTML = "";
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");

  posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "post";
    div.textContent = p;
    container.appendChild(div);
  });
}

/* CHAT */
function sendMessage() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if (!msg) return;

  const chatData = JSON.parse(localStorage.getItem("chat") || "[]");
  chatData.push(`${anonName}: ${msg}`);
  localStorage.setItem("chat", JSON.stringify(chatData));

  input.value = "";
  loadChat();
}

function loadChat() {
  const container = document.getElementById("messages");
  container.innerHTML = "";
  const chatData = JSON.parse(localStorage.getItem("chat") || "[]");

  chatData.forEach(m => {
    const div = document.createElement("div");
    div.textContent = m;
    container.appendChild(div);
  });
}
