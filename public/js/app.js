var waves1 = document.getElementById("w1");
var waves2 = document.getElementById("w2");
var waves3 = document.getElementById("w3");
var watermeter = document.querySelector(".waterlevel");
var level = 50;
var waves;
waves1.style.cssText = `top : ${level * 2}px`;
waves2.style.cssText = `top : ${level * 2}px`;
waves3.style.cssText = `top : ${level * 2}px`;
console.log(level);
watermeter.textContent = `${100 - level} %`;
let username = localStorage.getItem("username");
if (username) {
  document.getElementById("displayUser").innerText = username;
}
// var flow = setInterval(() => {
//   level = level + 1;
//   waves1.style.cssText = `top : ${level * 2 }px`;
//   waves2.style.cssText = `top : ${level * 2}px`;
//   waves3.style.cssText = `top : ${level * 2}px`;
//   console.log(level);
//   watermeter.textContent = `${ 100 - level} %`
//   if(level === 50) {
//       clearInterval(flow);
//   }
// },100)
