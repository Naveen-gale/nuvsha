import test from 'node:test';
import assert from 'node:assert';
import { compile } from '../nuvsha/src/compiler/index.js';
import { createComponent, form, data, Router, navigate, handleEvent, setContext, clearContext } from '../nuvsha/src/runtime/index.js';

// Setup Mock DOM environment for Node runtime verification
function setupMockDom() {
  const listeners = new Map();

  global.window = {
    location: { pathname: '/', origin: 'http://localhost' },
    history: {
      pushState(state, title, url) {
        window.location.pathname = url;
      }
    },
    addEventListener(event, fn) {
      if (!listeners.has(event)) listeners.set(event, []);
      listeners.get(event).push(fn);
    },
    dispatchEvent(event) {
      const fns = listeners.get(event.type) || [];
      fns.forEach(fn => fn(event));
    }
  };

  global.Event = class Event {
    constructor(type) {
      this.type = type;
      this.defaultPrevented = false;
    }
    preventDefault() {
      this.defaultPrevented = true;
    }
  };

  function createMockNode(type, val = '') {
    return {
      nodeType: type === 'element' ? 1 : type === 'text' ? 3 : 8,
      type,
      tagName: val,
      textContent: type === 'text' ? val : '',
      value: '',
      checked: false,
      attributes: {},
      childNodes: [],
      parentNode: null,
      setAttribute(k, v) { this.attributes[k] = v; },
      getAttribute(k) { return this.attributes[k]; },
      removeAttribute(k) { delete this.attributes[k]; },
      appendChild(node) {
        if (node.type === 'fragment') {
          const children = [...node.childNodes];
          for (const c of children) {
            c.parentNode = this;
            this.childNodes.push(c);
          }
          node.childNodes = [];
        } else {
          node.parentNode = this;
          this.childNodes.push(node);
        }
      },
      insertBefore(newNode, refNode) {
        const idx = this.childNodes.indexOf(refNode);
        const toInsert = newNode.type === 'fragment' ? [...newNode.childNodes] : [newNode];
        for (const n of toInsert) n.parentNode = this;
        if (idx > -1) this.childNodes.splice(idx, 0, ...toInsert);
        else this.childNodes.push(...toInsert);
        if (newNode.type === 'fragment') newNode.childNodes = [];
      },
      removeChild(node) {
        const idx = this.childNodes.indexOf(node);
        if (idx > -1) {
          this.childNodes.splice(idx, 1);
          node.parentNode = null;
        }
      },
      addEventListener(evt, fn) {
        this['on' + evt] = fn;
      },
      dispatchEvent(evt) {
        if (this['on' + evt.type]) this['on' + evt.type](evt);
      },
      closest(selector) {
        return selector === 'a' && this.tagName === 'a' ? this : null;
      }
    };
  }

  global.document = {
    createElement(tag) { return createMockNode('element', tag); },
    createTextNode(text) { return createMockNode('text', text); },
    createComment(text) { return createMockNode('comment', text); },
    createDocumentFragment() { return createMockNode('fragment'); }
  };
}

function instantiateComponent(nuvSource) {
  const js = compile(nuvSource);
  // Strip import statements and export default
  const cleanJs = js
    .replace(/import\s+[^;]+;/g, '')
    .replace('export default function render', 'function render');

  const fn = new Function('createComponent', 'handleEvent', 'setContext', 'clearContext', 'data', 'form', `
    ${cleanJs}
    return render;
  `);

  return fn(createComponent, handleEvent, setContext, clearContext, data, form);
}

test('Interactive Runtime: Phase 1 & 2 Reactivity & Event Updates', async (t) => {
  setupMockDom();
  const nuvSource = `
    <script>
      count = 0
    </script>
    <div>
      <p id="counter">{count}</p>
      <button onclick="count++">Add</button>
      <button onclick="count--">Sub</button>
    </div>
  `;
  const render = instantiateComponent(nuvSource);
  const dom = render({});
  const div = dom.childNodes[0];
  const p = div.childNodes[0];
  const btnAdd = div.childNodes[1];

  assert.strictEqual(p.childNodes[0].textContent, '0', 'initial counter is 0');
  
  // Simulate click event
  btnAdd.onclick(new Event('click'));
  assert.strictEqual(p.childNodes[0].textContent, '1', 'counter is 1 after click');

  btnAdd.onclick(new Event('click'));
  assert.strictEqual(p.childNodes[0].textContent, '2', 'counter is 2 after second click');
});

test('Interactive Runtime: Phase 3 Form Two-Way Binding', async (t) => {
  setupMockDom();
  const nuvSource = `
    <script>
      user = "Alex"
      active = false
    </script>
    <div>
      <input type="text" bind={user}>
      <input type="checkbox" bind={active}>
      <span>{user}</span>
      <span>{active ? "Active" : "Inactive"}</span>
    </div>
  `;
  const render = instantiateComponent(nuvSource);
  const dom = render({});
  const div = dom.childNodes[0];
  const inputTxt = div.childNodes[0];
  const inputChk = div.childNodes[1];
  const spanUser = div.childNodes[2];
  const spanActive = div.childNodes[3];

  assert.strictEqual(inputTxt.value, 'Alex');
  assert.strictEqual(spanUser.childNodes[0].textContent, 'Alex');
  assert.strictEqual(spanActive.childNodes[0].textContent, 'Inactive');

  // Simulate typing in input
  inputTxt.value = 'Sophia';
  inputTxt.oninput({ target: inputTxt });
  assert.strictEqual(spanUser.childNodes[0].textContent, 'Sophia');

  // Simulate checkbox toggle
  inputChk.checked = true;
  inputChk.onchange({ target: inputChk });
  assert.strictEqual(spanActive.childNodes[0].textContent, 'Active');
});

test('Interactive Runtime: Phase 4 & 6 Loops & Conditions', async (t) => {
  setupMockDom();
  const nuvSource = `
    <script>
      show = true
      items = ["Apple", "Banana"]
    </script>
    <div>
      {if show}
        <p>Visible</p>
      {else}
        <p>Hidden</p>
      {/if}
      <ul>
        {for item of items}
          <li>{item}</li>
        {/for}
      </ul>
      <button onclick="show = !show">Toggle</button>
      <button onclick="items.push('Cherry')">Add</button>
    </div>
  `;
  const render = instantiateComponent(nuvSource);
  const dom = render({});
  const div = dom.childNodes[0];
  const buttons = div.childNodes.filter(n => n.tagName === 'button');
  const btnToggle = buttons[0];
  const btnAdd = buttons[1];

  // Verify initial condition
  assert.ok(div.childNodes.some(n => n.childNodes && n.childNodes.some(c => c.textContent === 'Visible')));

  // Toggle condition
  btnToggle.onclick(new Event('click'));
  assert.ok(div.childNodes.some(n => n.childNodes && n.childNodes.some(c => c.textContent === 'Hidden')));

  // Add loop item
  btnAdd.onclick(new Event('click'));
  const ul = div.childNodes.find(n => n.tagName === 'ul');
  assert.strictEqual(ul.childNodes.filter(n => n.tagName === 'li').length, 3, 'loop updated to 3 items');
});

test('Interactive Runtime: Phase 18 Form primitive lifecycle', async (t) => {
  setupMockDom();
  const f = form({ email: "test@nuvsha.dev", password: "123" });
  
  assert.strictEqual(f.loading, false);
  assert.strictEqual(f.error, null);
  assert.strictEqual(f.success, false);
  assert.strictEqual(f.values.email, "test@nuvsha.dev");

  // Test successful submission
  const res = await f.submit(async (vals) => {
    assert.strictEqual(vals.email, "test@nuvsha.dev");
    return "OK";
  });
  assert.strictEqual(res, "OK");
  assert.strictEqual(f.success, true);
  assert.strictEqual(f.loading, false);

  // Test reset
  f.reset();
  assert.strictEqual(f.success, false);
  assert.strictEqual(f.values.email, "test@nuvsha.dev");

  // Test failed submission
  await f.submit(async () => {
    throw new Error("Invalid password");
  });
  assert.strictEqual(f.error, "Invalid password");
  assert.strictEqual(f.success, false);
});
