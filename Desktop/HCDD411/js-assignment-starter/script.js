/* 
HCDD 411
DOM reading/parsing/validation is PROVIDED.
You implement LOGIC where there is a TODO.
*/

/* ========== tiny UI helpers (given) ========== */
function setText(id, text) {
  document.getElementById(id).textContent = text;
}
function setMsg(id, text, kind) {
  var el = document.getElementById(id);
  el.className = "msg" + (kind ? (" " + kind) : "");
  el.textContent = text;
}
function money(n) {
  return "$" + n.toFixed(2);
}

var greetClicks = 0;







/* =======================
   Task 1 (15 pts): Write a greeting function that checks 
   if the user typed a name, 
   displays “Hello, NAME!”
   ======================= */

function makeGreeting(name) {
  // TODO:
  // If name is empty -> return ""
  // Else -> return "Hello, " + name + "!"
}







function task1Greet() {
  var name = document.getElementById("nameInput").value;
  name = name.trim();

  var msg = makeGreeting(name);

  if (msg === "") {
    setText("greetMsg", "Please type your name.");
    return;
  }

  greetClicks = greetClicks + 1;
  setText("greetMsg", msg);
  setText("greetCount", String(greetClicks));
}







/* =======================
   Task 2 (20 pts): Write discount logic that takes a price 
   and a selected discount type, computes the final price, 
   and shows a category label (Budget/Regular/Premium) based on the final price.
   ======================= */
function applyDiscount(price, type) {
  // TODO:
  // type: "student" | "senior"
  // Return final price after discount:
  //   student discount: 10%, senior discount: 15%
}

function categoryFromPrice(finalPrice) {
  // TODO:
  // price < 20 => "Budget"
  // price < 100 => "Regular"
  // else => "Premium"
  // return the category based on finalPrice
}









function task2ComputeDiscount() {
  var raw = document.getElementById("priceInput").value;
  var type = document.getElementById("discountType").value;

  var price = parseFloat(raw);

  if (isNaN(price) || price <= 0) {
    setText("finalPrice", "—");
    setText("priceCategory", "—");
    setMsg("discountMsg", "Enter a valid price (> 0).", "bad");
    return;
  }

  var finalPrice = applyDiscount(price, type);
  var cat = categoryFromPrice(finalPrice);

  setText("finalPrice", money(finalPrice));
  setText("priceCategory", cat);
  setMsg("discountMsg", "Done.", "good");
}








/* =======================
   Task 3 (25 pts): Write functions to (1) determine if a number is 
   even/odd and (2) compute the sum from 1 to N, 
   then display both results.
   ======================= */
function isEven(n) {
  // TODO: return true if even else false
}

function sumToN(n) {
  // TODO: compute 1 + 2 + ... + n using a for-loop
  // return the sum
}









function task3Compute() {
  var raw = document.getElementById("nInput").value;
  var n = parseInt(raw, 10);

  if (isNaN(n) || n < 1 || n > 5000) {
    setText("evenOdd", "—");
    setText("sumResult", "—");
    setMsg("sumMsg", "Enter an integer N between 1 and 5000.", "bad");
    return;
  }

  var eo = isEven(n) ? "Even" : "Odd";
  var s = sumToN(n);

  setText("evenOdd", eo);
  setText("sumResult", String(s));
  setMsg("sumMsg", "Done.", "good");
}









/* =======================
   Task 4 (40 pts): Write two classes using class and extends 
   (a base item and an important item) and store items in an array.
   ======================= */

var oopItems = [];

/*
TODO: implement these 2 classes using the syntax you learned:
}
*/

class BaseItem {
  // TODO: write the constructor

  toHTML() {
    return "<li>" + this.text + "</li>";
  }
}

class ImportantItem extends BaseItem {
  // TODO: write the constructor

  toHTML() {
    return "<li class='important'>" + this.text + "</li>";
  }
}

function createItem(text, type) {
  if (type === "important") { return new ImportantItem(text); }
  return new BaseItem(text);
}

function addOopItem(arr, item) {
  // TODO: push item into arr
  // return nothing
}

function removeLast(arr) {
  // TODO: remove last item safely
  // return nothing
}

function clearAll(arr) {
  // TODO: empty the array
  // return nothing
}










function renderOopItems(arr) {
  var html = "";
  var i;
  for (i = 0; i < arr.length; i = i + 1) {
    html = html + arr[i].toHTML();
  }
  document.getElementById("oopItemsList").innerHTML = html;
  setText("oopItemCount", String(arr.length) + " items");
}

/* ===== UI plumbing (given) ===== */
function task4Add() {
  var text = document.getElementById("oopItemInput").value;
  text = text.trim();

  var type = document.getElementById("oopItemType").value;

  if (text === "") {
    setMsg("oopListMsg", "Type an item first.", "bad");
    return;
  }

  var item = createItem(text, type);
  addOopItem(oopItems, item);

  document.getElementById("oopItemInput").value = "";
  setMsg("oopListMsg", "Added.", "good");
  renderOopItems(oopItems);
}

function task4RemoveLast() {
  if (oopItems.length === 0) {
    setMsg("oopListMsg", "Nothing to remove.", "warn");
    return;
  }
  removeLast(oopItems);
  setMsg("oopListMsg", "Removed last.", "good");
  renderOopItems(oopItems);
}

function task4Clear() {
  if (oopItems.length === 0) {
    setMsg("oopListMsg", "Already empty.", "warn");
    return;
  }
  clearAll(oopItems);
  setMsg("oopListMsg", "Cleared.", "good");
  renderOopItems(oopItems);
}

window.onload = function () {
  renderOopItems(oopItems);
};
