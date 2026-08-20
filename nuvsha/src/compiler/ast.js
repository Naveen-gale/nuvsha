/**
 * Represents the entire Nuvsha file (component)
 */
export class ComponentNode {
  constructor() {
    this.type = 'Component';
    this.script = ''; // Holds all JavaScript code from <script> blocks
    this.template = null; // The root HTML element
  }
}

/**
 * Represents an HTML element like <div> or <h1>
 */
export class ElementNode {
  constructor(tagName, attributes = {}) {
    this.type = 'Element';
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = [];
  }
}

/**
 * Represents pure text inside an element, like "Hello"
 */
export class TextNode {
  constructor(value) {
    this.type = 'Text';
    this.value = value;
  }
}

/**
 * Represents a dynamic JavaScript variable inside the HTML, like {name}
 */
export class ExpressionNode {
  constructor(expression) {
    this.type = 'Expression';
    this.expression = expression;
  }
}
