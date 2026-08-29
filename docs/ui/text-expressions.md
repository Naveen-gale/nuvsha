# Text Expressions

You can seamlessly mix static text and dynamic expressions.

## Syntax

```html
<script>
  user = "Naveen"
  messages = 5
</script>

<p>
  Welcome back, <strong>{user}</strong>! You have {messages} new messages.
</p>
```

## What happens

Nuvsha only targets the exact text nodes containing expressions. When `messages` updates, only the number "5" changes in the DOM. The rest of the paragraph remains completely untouched, ensuring lightning-fast updates.
