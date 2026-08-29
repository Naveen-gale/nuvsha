# Philosophy

The design of Nuvsha is guided by four core principles:

## 1. HTML should remain valid HTML

You shouldn't have to rewrite your entire UI into JavaScript just to make it interactive. In Nuvsha, your template is just HTML. You can copy and paste standard HTML snippets directly into a `.nuv` file, and they will work perfectly.

## 2. JavaScript should remain simple

Nuvsha doesn't force you into complex functional programming paradigms. If you want to increment a number, you just write `count++`. You don't need a special setter function.

## 3. Components are the building blocks

UI is best built as a composition of smaller, reusable pieces. Nuvsha makes creating, importing, and using components effortless.

## 4. Reactivity should be invisible

You shouldn't have to manually tell the framework when data changes. Nuvsha tracks your variables and updates the DOM for you automatically, so you can focus on your application logic, not DOM manipulation.
