# Components

Nuvsha components allow you to break your application into small, reusable, and isolated pieces. They have an `.nuv` extension and look just like standard Nuvsha pages.

## Creating a component

A component is simply a chunk of HTML, optionally with logic inside `<script>`:

```html
<!-- src/components/Greeting.nuv -->
<div class="greeting">
  <h1>Hello, welcome to Nuvsha!</h1>
</div>
```

## Importing a component

To use a component, import it in a parent component's `<script>` block and use it like an HTML tag:

```html
<script>
  import Greeting from "./components/Greeting.nuv"
</script>

<Greeting />
```

## Props

You can pass data into a component using props. 

```html
<Card title="Hello" />
```

Inside the child component (`Card.nuv`), the `title` prop is automatically available as a local variable. You don't need to do any special configuration!

```html
<!-- Card.nuv -->
<div class="card">
  <h2>{title}</h2>
</div>
```

*(Note: Behind the scenes, Nuvsha automatically destructures `title` from a `props` object, so you could also write `{props.title}`).*

## Reactive props

Props are fully reactive. If the parent's data changes, the child updates automatically:

```html
<script>
  count = 0
</script>

<!-- When count changes, the Card's count prop updates instantly! -->
<Card count={count} />
```

## Children

You can pass child elements into a component just like standard HTML. Inside the component, use `{children}` to render them.

**Parent (`App.nuv`)**:
```html
<Card>
  <p>Hello world!</p>
</Card>
```

**Child (`Card.nuv`)**:
```html
<div class="card">
  <div class="card-content">
    {children}
  </div>
</div>
```

## Component events

To send data back from a child to a parent, use component events. By convention, name them starting with `on`, like `onchange`.

**Parent (`App.nuv`)**:
```html
<!-- $event is a special variable containing the payload from the child -->
<Counter onchange="count = $event" />
```

**Child (`Counter.nuv`)**:
```html
<!-- We trigger the parent's event by calling props.onchange() -->
<button onclick="props.onchange(value + 1)">
  Increase
</button>
```

> [!NOTE]  
> `$event` is specifically for payloads emitted by Nuvsha components. For native DOM events (like clicking a native `<button>`), use the standard `event` variable.

## Default props

You can provide default values for your props simply by assigning a value in the `<script>` block. If the parent doesn't provide a value, Nuvsha will fall back to your default automatically.

```html
<script>
  // If the parent didn't provide a title, it will be "Untitled"
  title = "Untitled"
</script>

<h2>{title}</h2>
```

## Boolean props

Nuvsha supports standard HTML boolean attributes. Writing the attribute name by itself is identical to setting it to `true`.

```html
<!-- Both of these pass disabled={true} to the Button -->
<Button disabled />
<Button disabled={true} />
```

## Component isolation

Every component manages its own reactive state independently. 

If you render `<Counter />` twice on the same page, clicking one will never update the other. Parent state never accidentally leaks into a child, and a child's local state never pollutes the parent. This isolation guarantees that large Nuvsha applications remain predictable and easy to debug.

## Recommended component structure

While Nuvsha doesn't force a folder structure on you, it's recommended to place your reusable components in a `components/` directory:

```text
src/
├── App.nuv
└── components/
    ├── Button.nuv
    ├── Card.nuv
    └── Counter.nuv
```
