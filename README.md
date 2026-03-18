## 1️⃣ What is the difference between var, let, and const?

In JavaScript, var, let, and const are used to declare variables, but they behave differently in terms of **scope, reusability, and safety**. 
- The `var` keyword is the oldest way to declare variables and is function-scoped, meaning it is accessible throughout the entire function where it is defined. It also allows both re-declaration and reassignment, which can sometimes lead to unexpected bugs.
- `let` is block-scoped, meaning it only works within the `{}` block where it is declared. It does not allow re-declaration in the same scope but does allow reassignment, making it safer and more predictable than `var`.
- `const` is also block-scoped but is more restrictive because it does not allow reassignment or re-declaration after the variable is initialized. However, if a const variable holds an object or array, its contents can still be modified even though the variable itself cannot be reassigned.

Additionally, all three are hoisted, but `let` and `const` remain in a ***"temporal dead zone"*** until they are initialized, which prevents them from being used before declaration. In modern JavaScript, it is recommended to use `const` by default and `let` when reassignment is necessary, while avoiding `var` due to its less predictable behavior.

## 2️⃣ What is the spread operator (...)?

The spread operator `(...)` in JavaScript is used to **expand** or **spread** elements of an array, object, or iterable into individual elements. It allows to copy, merge, or pass values more easily and cleanly. 
- **For example:** In arrays, the spread operator can be used to combine multiple arrays or create a shallow copy without modifying the original array. In objects, it helps to copy properties or merge multiple objects into one. It is also commonly used in function calls to pass elements of an array as separate arguments instead of passing the entire array. Overall, the spread operator makes code shorter, more readable, and avoids manual loops or complex operations when working with collections of data.

## 3️⃣ What is the difference between map(), filter(), and forEach()?

In JavaScript, `map()`, `filter()`, and `forEach()` are all array methods used to iterate over elements, but they serve different purposes and return different results. 

- The `map()` method is used to transform each element of an array and returns a new array containing the modified elements, making it useful when need to change data while keeping the same number of items.
- The `filter()` method, on the other hand, is used to select specific elements based on a condition and returns a new array containing only the elements that satisfy that condition, so the resulting array may have fewer items than the original.
- On the otherhand, `forEach()` simply loops through each element of the array and performs an action, such as logging or updating values, but it ***does not return a new array***; instead, it returns undefined.

In short, `map()` is used for transformation, `filter()` for selection, and `forEach()` for executing side effects without producing a new array.

## 4️⃣ What is an arrow function?

An arrow function is a shorter and more modern way to write functions in JavaScript, introduced in ES6. It uses the `=> (arrow)` syntax instead of the traditional function keyword, making the code more concise and easier to read. Arrow functions are especially useful for small functions or when working with array methods like `map()` and `filter()`. One of their key differences is that they do not have their own this value; instead, they inherit this from the surrounding scope, which helps avoid common issues with context in JavaScript. Additionally, arrow functions can have an implicit return when written in a single line, meaning don’t need to use the return keyword explicitly. Overall, arrow functions provide a cleaner syntax and better handling of `this`, making them widely used in modern JavaScript development.


```js

let person = "Riad";
const showName (person) => {
console.log("My name is" , person);
}

```
`result = My name is Riad`

## 5️⃣ What are template literals?

Template literals are a modern way to work with strings in JavaScript, introduced in ES6 and they use backticks ``(`)`` instead of single ``(' ')`` or double ``(" ")`` quotes. They make it easier to create dynamic strings by allowing one to embed variables or expressions directly inside the string using `${}` syntax, which is called ***interpolation***. This eliminates the need for complex string concatenation with ` + `. Template literals also support multi-line strings without needing special characters like ` \n `, making the code cleaner and more readable. Additionally, one can include expressions, function calls or even conditional logic inside ` ${} `, giving more flexibility when building strings. Overall, template literals improve ***readability, simplify string manipulation, and are widely used in modern JavaScript development***.
