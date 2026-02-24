###(1)==> Difference: getElementById vs getElementsByClassName vs querySelector / querySelectorAll?

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

###(2)==> How to create & insert new element in DOM
Step-by-step?

=>To add something new to the page using DOM. There are three-step process:

// 1. Create the element
const newDiv = document.createElement('div');

// 2. Customize it
newDiv.textContent = "Hello, World!";
newDiv.className = "greeting";

// 3. Insert it into the DOM
const container = document.querySelector('#container');
container.appendChild(newDiv);

###(3)==> What is Event Bubbling?

=>Event Bubbling describes how an event moves through the DOM tree. When click an element (like a button), the click event doesn't just stay there. It "bubbles up" to its parent, then the grandparent, all the way up to the window.

How it works: If i click "span" inside a "div", the "span"'s click handler fires first, then the "div"'s handler fires, and so on.

document.getElementById("parent").addEventListener("click", () => {
console.log("Parent clicked");
});

document.getElementById("child").addEventListener("click", () => {
console.log("Button clicked");
});

<!-- ekhane parent and chaild id die select kora hoyeche -->

###(4)==> What is Event Delegation? Why useful?

=>Add event to parent instead of many children

Example =>

<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

// many listeners
document.querySelectorAll("li").forEach(li => {
li.addEventListener("click", () => console.log("clicked"));
});

// one listener
document.getElementById("list").addEventListener("click", (e) => {
if (e.target.tagName === "LI") {
console.log("clicked", e.target.innerText);
}
});

<!-- ekhane meainly parent a event bosiye child handle kora hoyeche -->

Why is it useful?
=> ANSWER
fewer event listeners
faster
works for dynamic elements
cleaner code

###(5)==> What is the difference between preventDefault() and stopPropagation() methods?

=>They do very different things:

<b>preventDefault()</b> stops the browser's default behavior.

Example: Preventing a link from opening a URL or a "Submit" button from refreshing the page.

<b>stopPropagation()</b> stops the event from bubbling.

Example: If you have a button inside a clickable card, you use

stopPropagation() on the button so that clicking it doesn't also trigger the card's click event.
