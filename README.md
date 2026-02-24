### 5. What is the difference between preventDefault() and stopPropagation() methods?

1️⃣ Difference: getElementById vs getElementsByClassName vs querySelector / querySelectorAll?

=> ANSWER

- getElementById()

Returns: single element
const title = document.getElementById("main-title");
returns only one element

- getElementsByClassName()

Selects multiple elements
const items = document.getElementsByClassName("item");
!not an array

- querySelector()

const btn = document.querySelector(".btn");
flexible (id, class, tag, attribute etc.)

- querySelectorAll()

Selects all matching elements
const buttons = document.querySelectorAll(".btn");
can use forEach().

2️⃣ How to create & insert new element in DOM
Step-by-step?

=> ANSWER

1. create element
   const li = document.createElement("li");

2. add content
   li.innerText = "New Item";

3. insert into DOM
   document.getElementById("list").appendChild(li);
   Other insert methods

   parent.appendChild(element); => end
   parent.prepend(element); => start
   parent.before(element); => beforeelement
   parent.after(element); => after element

3️⃣ What is Event Bubbling?

=> ANSWER
==> Event moves from child → parent → document

Example HTML:

<div id="parent">
  <button id="child">Click</button>
</div>

JS:

document.getElementById("parent").addEventListener("click", () => {
console.log("Parent clicked");
});

document.getElementById("child").addEventListener("click", () => {
console.log("Button clicked");
});

==> Click button → console:

how does it work?

=> ANSWER
Button clicked
Parent clicked
Event travels upward = bubbling

4️⃣ What is Event Delegation? Why useful?

=> ANSWER
==> Add event to parent instead of many children

Example:

<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

Instead of:

// many listeners
document.querySelectorAll("li").forEach(li => {
li.addEventListener("click", () => console.log("clicked"));
});

Use:

// one listener
document.getElementById("list").addEventListener("click", (e) => {
if (e.target.tagName === "LI") {
console.log("clicked", e.target.innerText);
}
});

Why is it useful?

=> ANSWER
fewer event listeners
faster
works for dynamic elements
cleaner code

5️⃣ What is the difference between preventDefault() and stopPropagation() methods?

=> ANSWER
They do very different things:

<b>preventDefault()</b> stops the browser's default behavior.

Example: Preventing a link from opening a URL or a "Submit" button from refreshing the page.

<b>stopPropagation()</b> stops the event from bubbling.

Example: If you have a button inside a clickable card, you use

stopPropagation() on the button so that clicking it doesn't also trigger the card's click event.
