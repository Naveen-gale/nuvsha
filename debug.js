import test from 'node:test';
import assert from 'node:assert';
import { Router } from './nuvsha/src/runtime/router.js';

// Debugging what happens in tests
global.window = {
  location: { pathname: '/', origin: 'http://localhost' },
  history: { pushState(state, title, url) { window.location.pathname = url; } },
  addEventListener() {},
  dispatchEvent() {}
};
global.document = {
  createDocumentFragment() {
    return {
      type: 'fragment',
      childNodes: [],
      appendChild(node) { this.childNodes.push(node); },
      insertBefore(newNode, refNode) {
        const index = this.childNodes.indexOf(refNode);
        const nodesToInsert = newNode.type === 'fragment' ? newNode.childNodes : [newNode];
        console.log('insertBefore called with nodesToInsert length:', nodesToInsert.length);
        if (index > -1) {
          this.childNodes.splice(index, 0, ...nodesToInsert);
        } else {
          this.childNodes.push(...nodesToInsert);
        }
      }
    };
  },
  createComment(text) { return { type: 'comment', text, parentNode: null }; },
  createTextNode(text) { return { type: 'text', text, childNodes: [] }; },
  createElement(tag) { return { type: 'element', tag, childNodes: [] }; }
};

const routes = [
  { path: '/', component: () => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createTextNode('Home Page'));
      return frag;
    }
  }
];

  const fragment = Router({ routes });
  const container = {
    childNodes: [],
    insertBefore(newNode, refNode) {
      const idx = this.childNodes.indexOf(refNode);
      const nodesToInsert = newNode.type === 'fragment' ? newNode.childNodes : [newNode];
      if (idx > -1) this.childNodes.splice(idx, 0, ...nodesToInsert);
      else this.childNodes.push(...nodesToInsert);
      nodesToInsert.forEach(n => n.parentNode = this);
    },
    removeChild(node) {
      const idx = this.childNodes.indexOf(node);
      if (idx > -1) this.childNodes.splice(idx, 1);
      node.parentNode = null;
    }
  };
  console.log('fragment.childNodes', fragment.childNodes);
  fragment.childNodes.forEach(n => {
    container.childNodes.push(n);
    n.parentNode = container;
  });
  console.log('container.childNodes', container.childNodes);
  
  window.location.pathname = '/about';
  window.dispatchEvent(new Event('popstate'));
  console.log('container after popstate', container.childNodes);

