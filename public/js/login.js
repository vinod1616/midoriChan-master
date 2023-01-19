var loginButton = document.getElementById("loginbutton");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  var userId = document.getElementById("userId").value;
  var password = document.getElementById("password").value;
  if (userId === "mc001" && password === "gogreen1" || userId === "mc002" && password === "gogreen2" || userId === "mc003" && password === "gogreen3") {
    localStorage.setItem("username", userId);
    console.log("midori");
    document.location.href = "midori";
  }
});
