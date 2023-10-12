const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/login", (req, res) => {
  const formHtml = `
    <form onsubmit="handleFormSubmit()" action="/" method="GET">
      <input type="text" name="username" id="username">
      <button  type="submit">login</button>
    </form>
    <script>
      function handleFormSubmit() {
        const username = document.getElementById('username').value;
        localStorage.setItem('username', username);
      }
    </script>
  `;
  res.send(formHtml);
});

app.get("/", (req, res) => {
  fs.readFile(`messages.txt`, "utf-8", (err, data) => {
    const formHtml = `
       <p> ${data} </p>
        <form onsubmit="handleFormSubmit()" action="/" method="POST">
          <input type="text" name="message">
          <input type="hidden" name="username" id="username">
          <button type='submit'>send</button>
        </form>
        <script>
      function handleFormSubmit() {
         document.getElementById('username').value = localStorage.getItem("username");
      }
    </script>
        `;
    res.send(formHtml);
  });
});
app.post("/", (req, res) => {
  const {username, message} = req.body;
  console.log(message);
  fs.appendFile("messages.txt", `${username} : ${message} `, (err) => {});
  res.redirect("/")
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
