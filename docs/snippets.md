# Nuvsha VS Code Snippets

Welcome to the official Nuvsha VS Code Snippets guide! This document explains how to use code snippets to write Nuvsha (`.nuv`) applications faster, with fewer typos and without needing to memorize every syntax detail.

---

## Table of Contents
1. [What are Snippets?](#what-are-snippets)
2. [Why Use Nuvsha Snippets?](#why-use-nuvsha-snippets)
3. [How to Use Snippets in VS Code](#how-to-use-snippets-in-vs-code)
4. [Tab Stops and Placeholders](#tab-stops-and-placeholders)
5. [Complete Snippet Reference](#complete-snippet-reference)
   - [Component Starter & Script](#component-starter--script)
   - [Conditionals](#conditionals)
   - [Loops](#loops)
   - [Expressions & Slots](#expressions--slots)
   - [Components & Props](#components--props)
   - [Events & Buttons](#events--buttons)
   - [Form Binding](#form-binding)
   - [Async & Data Fetching](#async--data-fetching)
   - [Routing](#routing)
   - [HTML Elements](#html-elements)

---

## What are Snippets?

Snippets are intelligent code templates for Visual Studio Code. Instead of typing an entire component structure, loop, or form binding by hand, you simply type a short prefix (such as `nvcomp` or `nvif`) and press **Tab** or **Enter**. VS Code will instantly insert the complete code snippet for you!

## Why Use Nuvsha Snippets?

- **Speed**: Scaffold full components, loops, and form bindings in seconds.
- **Accuracy**: Ensures you always use the exact syntax supported by the Nuvsha compiler.
- **Beginner-Friendly**: Never get stuck trying to remember the closing tag or block structure.
- **Sensible Defaults**: Pre-filled with standard placeholder values you can customize immediately.

## How to Use Snippets in VS Code

1. Open any `.nuv` file in VS Code.
2. Ensure the language mode in the bottom-right status bar says **Nuvsha**.
3. Type the snippet trigger prefix (for example, type `nvcomp` or `nvif`).
4. A suggestion pop-up will appear with the snippet name and description.
5. Press **Tab** or **Enter** to insert the snippet!

## Tab Stops and Placeholders

Nuvsha snippets use standard VS Code tab stops:
- **Highlighted placeholders** (like `condition` or `items`) allow you to immediately type your own variable name.
- Press **Tab** to jump to the next placeholder.
- Press **Shift + Tab** to jump back to the previous placeholder.
- Once you reach the end, the cursor lands at the final position ready for your code.

---

## Complete Snippet Reference

Every snippet available in the Nuvsha extension is documented below.

### Component Starter & Script

#### Nuvsha Component Starter

**Trigger:** `nvcomp`, `nuv`

**Description:** Create a complete Nuvsha component with script and template

**Snippet Template:**
```html
<script>
  ${1:// Component state}
  ${2:count = 0}
</script>

<div class="${3:container}">
  ${0}
</div>
```

**Rendered Output:**
```html
<script>
  // Component state
  count = 0
</script>

<div class="container">
  
</div>
```

---

#### Nuvsha Script Block

**Trigger:** `nvscript`, `script`

**Description:** Create a Nuvsha script block for component state and logic

**Snippet Template:**
```html
<script>
  ${0}
</script>
```

**Rendered Output:**
```html
<script>
  
</script>
```

---

#### Nuvsha Component Import

**Trigger:** `nvimport`, `import`

**Description:** Import a .nuv component

**Snippet Template:**
```html
import ${1:Card} from "./${2:components}/${1:Card}.nuv"
```

**Rendered Output:**
```html
import Card from "./components/Card.nuv"
```

---

### Conditionals

#### Nuvsha If Block

**Trigger:** `nvif`

**Description:** Create a Nuvsha if conditional block

**Snippet Template:**
```html
{if ${1:condition}}
  ${0}
{/if}
```

**Rendered Output:**
```html
{if condition}
  
{/if}
```

---

#### Nuvsha If-Else Block

**Trigger:** `nvifelse`

**Description:** Create a Nuvsha if-else conditional block

**Snippet Template:**
```html
{if ${1:condition}}
  ${2}
{else}
  ${0}
{/if}
```

**Rendered Output:**
```html
{if condition}
  
{else}
  
{/if}
```

---

#### Nuvsha Else-If Branch

**Trigger:** `nvelseif`

**Description:** Create a Nuvsha else-if branch

**Snippet Template:**
```html
{else if ${1:condition}}
  ${0}
```

**Rendered Output:**
```html
{else if condition}
  
```

---

#### Nuvsha Else Branch

**Trigger:** `nvelse`

**Description:** Create a Nuvsha else branch

**Snippet Template:**
```html
{else}
  ${0}
```

**Rendered Output:**
```html
{else}
  
```

---

### Loops

#### Nuvsha For Loop

**Trigger:** `nvfor`, `for`

**Description:** Create a Nuvsha reactive for loop

**Snippet Template:**
```html
{for ${1:item} of ${2:items}}
  ${0}
{/for}
```

**Rendered Output:**
```html
{for item of items}
  
{/for}
```

---

### Expressions & Slots

#### Nuvsha Expression

**Trigger:** `nvexpr`

**Description:** Interpolate a reactive state variable or expression

**Snippet Template:**
```html
{${1:variable}}
```

**Rendered Output:**
```html
{variable}
```

---

#### Nuvsha Children Slot

**Trigger:** `nvchildren`, `nvslot`

**Description:** Project child elements inside a component (Phase 16 slot)

**Snippet Template:**
```html
{children}
```

**Rendered Output:**
```html
{children}
```

---

### Components & Props

#### Nuvsha Component (Self-Closing)

**Trigger:** `nvcomponent`

**Description:** Instantiate a self-closing Nuvsha component with props

**Snippet Template:**
```html
<${1:Component} ${2:prop}={${3:value}} />
```

**Rendered Output:**
```html
<Component prop={value} />
```

---

#### Nuvsha Component with Children

**Trigger:** `nvcomponent-children`

**Description:** Instantiate a Nuvsha component wrapping child content

**Snippet Template:**
```html
<${1:Component} ${2:prop}={${3:value}}>
  ${0}
</${1:Component}>
```

**Rendered Output:**
```html
<Component prop={value}>
  
</Component>
```

---

### Events & Buttons

#### Nuvsha Click Event (Inline)

**Trigger:** `nvclick`

**Description:** Inline Nuvsha click handler

**Snippet Template:**
```html
onclick="${1:count++}"
```

**Rendered Output:**
```html
onclick="count++"
```

---

#### Nuvsha Click Event (Function)

**Trigger:** `nvclickfn`

**Description:** Function call on click event

**Snippet Template:**
```html
onclick="${1:handleClick}()"
```

**Rendered Output:**
```html
onclick="handleClick()"
```

---

#### Nuvsha Generic Event

**Trigger:** `nvevent`

**Description:** Nuvsha event attribute handler

**Snippet Template:**
```html
on${1:change}="${2:handleChange}()"
```

**Rendered Output:**
```html
onchange="handleChange()"
```

---

#### Nuvsha Button with Click Event

**Trigger:** `nvbutton`, `nvbtn`

**Description:** Button element with reactive click handler

**Snippet Template:**
```html
<button onclick="${1:count++}">
  ${2:Click me}
</button>
```

**Rendered Output:**
```html
<button onclick="count++">
  Click me
</button>
```

---

### Form Binding

#### Nuvsha Two-Way Binding

**Trigger:** `nvbind`

**Description:** Two-way data binding attribute

**Snippet Template:**
```html
bind={${1:variable}}
```

**Rendered Output:**
```html
bind={variable}
```

---

#### Nuvsha Input with Binding

**Trigger:** `nvinput`, `input`

**Description:** Input field with two-way data binding

**Snippet Template:**
```html
<input type="${1:text}" bind={${2:name}} placeholder="${3:Enter value...}" />
```

**Rendered Output:**
```html
<input type="text" bind={name} placeholder="Enter value..." />
```

---

#### Nuvsha Checkbox with Binding

**Trigger:** `nvcheckbox`

**Description:** Checkbox input with boolean two-way binding

**Snippet Template:**
```html
<label>
  <input type="checkbox" bind={${1:accepted}} />
  ${2:I accept the terms}
</label>
```

**Rendered Output:**
```html
<label>
  <input type="checkbox" bind={accepted} />
  I accept the terms
</label>
```

---

#### Nuvsha Select with Binding

**Trigger:** `nvselect`

**Description:** Select dropdown with two-way binding

**Snippet Template:**
```html
<select bind={${1:selected}}>
  <option value="">${2:Choose an option}</option>
  <option value="${3:option1}">${4:Option 1}</option>
</select>
```

**Rendered Output:**
```html
<select bind={selected}>
  <option value="">Choose an option</option>
  <option value="option1">Option 1</option>
</select>
```

---

#### Nuvsha Textarea with Binding

**Trigger:** `nvtextarea`

**Description:** Textarea element with two-way binding

**Snippet Template:**
```html
<textarea bind={${1:message}} placeholder="${2:Write your message...}"></textarea>
```

**Rendered Output:**
```html
<textarea bind={message} placeholder="Write your message..."></textarea>
```

---

#### Nuvsha Form with Submit

**Trigger:** `nvform`, `form`

**Description:** Form element with auto-prevented submit handler

**Snippet Template:**
```html
<form onsubmit="${1:handleSubmit}()">
  ${0}
  <button type="submit">${2:Submit}</button>
</form>
```

**Rendered Output:**
```html
<form onsubmit="handleSubmit()">
  
  <button type="submit">Submit</button>
</form>
```

---

### Async & Data Fetching

#### Nuvsha Async Template Block

**Trigger:** `nvasync`, `async`

**Description:** Nuvsha async template block with loading and error states

**Snippet Template:**
```html
{async ${1:data} = ${2:fetchData()}}
  ${3:<p>{${1:data}}</p>}
{loading}
  ${4:<p>Loading...</p>}
{error}
  ${5:<p>Error loading data.</p>}
{/async}
```

**Rendered Output:**
```html
{async data = fetchData()}
  <p>{${1:data}</p>}
{loading}
  <p>Loading...</p>
{error}
  <p>Error loading data.</p>
{/async}
```

---

#### Nuvsha Data Fetch Primitive

**Trigger:** `nvdata`

**Description:** Nuvsha Phase 11 data() primitive for async reactive data

**Snippet Template:**
```html
${1:resource} = data(() => fetch("${2:/api/endpoint}").then(res => res.json()))
```

**Rendered Output:**
```html
resource = data(() => fetch("/api/endpoint").then(res => res.json()))
```

---

#### Nuvsha Form Primitive

**Trigger:** `nvform-primitive`, `nvformobj`

**Description:** Nuvsha Phase 18 form() reactive primitive with loading, error, and submit

**Snippet Template:**
```html
${1:loginForm} = form({
  ${2:email}: "${3:}",
  ${4:password}: "${5:}"
})
```

**Rendered Output:**
```html
loginForm = form({
  email: "${3:}",
  password: "${5:}"
})
```

---

### Routing

#### Nuvsha Router Component

**Trigger:** `nvrouter`, `nvroute`

**Description:** Nuvsha SPA Router component

**Snippet Template:**
```html
<Router routes={${1:routes}} />
```

**Rendered Output:**
```html
<Router routes={routes} />
```

---

#### Nuvsha Route Definitions

**Trigger:** `nvroutes`

**Description:** Nuvsha route table array for <Router />

**Snippet Template:**
```html
routes = [
  { path: "/", component: ${1:Home} },
  { path: "/${2:about}", component: ${3:About} }
]
```

**Rendered Output:**
```html
routes = [
  { path: "/", component: Home },
  { path: "/about", component: About }
]
```

---

### HTML Elements

#### Nuvsha Div Element

**Trigger:** `nvdiv`

**Description:** HTML div container element

**Snippet Template:**
```html
<div class="${1:container}">
  ${0}
</div>
```

**Rendered Output:**
```html
<div class="container">
  
</div>
```

---

#### Nuvsha Section Element

**Trigger:** `nvsection`

**Description:** HTML section element

**Snippet Template:**
```html
<section class="${1:section-name}">
  ${0}
</section>
```

**Rendered Output:**
```html
<section class="section-name">
  
</section>
```

---

#### Nuvsha Main Element

**Trigger:** `nvmain`

**Description:** HTML main content element

**Snippet Template:**
```html
<main>
  ${0}
</main>
```

**Rendered Output:**
```html
<main>
  
</main>
```

---

#### Nuvsha Header Element

**Trigger:** `nvheader`

**Description:** HTML header element

**Snippet Template:**
```html
<header>
  ${0}
</header>
```

**Rendered Output:**
```html
<header>
  
</header>
```

---

#### Nuvsha Footer Element

**Trigger:** `nvfooter`

**Description:** HTML footer element

**Snippet Template:**
```html
<footer>
  ${0}
</footer>
```

**Rendered Output:**
```html
<footer>
  
</footer>
```

---

#### Nuvsha Nav Element

**Trigger:** `nvnav`

**Description:** HTML navigation element

**Snippet Template:**
```html
<nav>
  ${0}
</nav>
```

**Rendered Output:**
```html
<nav>
  
</nav>
```

---

#### Nuvsha Article Element

**Trigger:** `nvarticle`

**Description:** HTML article element

**Snippet Template:**
```html
<article>
  ${0}
</article>
```

**Rendered Output:**
```html
<article>
  
</article>
```

---

#### Nuvsha Heading 1

**Trigger:** `nvh1`

**Description:** HTML h1 heading

**Snippet Template:**
```html
<h1>${1:Heading 1}</h1>
```

**Rendered Output:**
```html
<h1>Heading 1</h1>
```

---

#### Nuvsha Heading 2

**Trigger:** `nvh2`

**Description:** HTML h2 heading

**Snippet Template:**
```html
<h2>${1:Heading 2}</h2>
```

**Rendered Output:**
```html
<h2>Heading 2</h2>
```

---

#### Nuvsha Heading 3

**Trigger:** `nvh3`

**Description:** HTML h3 heading

**Snippet Template:**
```html
<h3>${1:Heading 3}</h3>
```

**Rendered Output:**
```html
<h3>Heading 3</h3>
```

---

#### Nuvsha Paragraph

**Trigger:** `nvp`

**Description:** HTML paragraph element

**Snippet Template:**
```html
<p>${1:Paragraph text}</p>
```

**Rendered Output:**
```html
<p>Paragraph text</p>
```

---

#### Nuvsha Anchor Link

**Trigger:** `nva`

**Description:** HTML anchor link element

**Snippet Template:**
```html
<a href="${1:#}">${2:Link text}</a>
```

**Rendered Output:**
```html
<a href="#">Link text</a>
```

---

#### Nuvsha Image Element

**Trigger:** `nvimg`

**Description:** HTML self-closing image element

**Snippet Template:**
```html
<img src="${1:path/to/image.png}" alt="${2:Description}" />
```

**Rendered Output:**
```html
<img src="path/to/image.png" alt="Description" />
```

---

#### Nuvsha Unordered List

**Trigger:** `nvul`

**Description:** HTML unordered list element

**Snippet Template:**
```html
<ul>
  <li>${1:Item 1}</li>
  <li>${2:Item 2}</li>
</ul>
```

**Rendered Output:**
```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

---

