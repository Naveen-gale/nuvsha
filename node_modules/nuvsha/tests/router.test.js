import test from 'node:test';
import assert from 'node:assert';

// Mocking the DOM environment for testing the router
global.window = {
  location: {
    pathname: '/',
    origin: 'http://localhost'
  },
  history: {
    pushState(state, title, url) {
      window.location.pathname = url;
    }
  },
  addEventListener(event, callback) {
    if (!this.listeners) this.listeners = {};
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  },
  dispatchEvent(event) {
    if (this.listeners && this.listeners[event.type]) {
      this.listeners[event.type].forEach(cb => cb(event));
    }
  }
};

global.Event = class Event {
  constructor(type) {
    this.type = type;
  }
};

global.document = {
  createDocumentFragment() {
    return {
      type: 'fragment',
      childNodes: [],
      appendChild(node) { 
        this.childNodes.push(node); 
        node.parentNode = this;
      },
      removeChild(node) {
        const index = this.childNodes.indexOf(node);
        if (index > -1) this.childNodes.splice(index, 1);
        node.parentNode = null;
      },
      insertBefore(newNode, refNode) {
        const index = this.childNodes.indexOf(refNode);
        const nodesToInsert = newNode.type === 'fragment' ? newNode.childNodes : [newNode];
        if (index > -1) {
          this.childNodes.splice(index, 0, ...nodesToInsert);
        } else {
          this.childNodes.push(...nodesToInsert);
        }
        nodesToInsert.forEach(n => n.parentNode = this);
      }
    };
  },
  createComment(text) {
    return { type: 'comment', text, parentNode: null };
  },
  createTextNode(text) {
    return { type: 'text', text, childNodes: [] };
  },
  createElement(tag) {
    return { type: 'element', tag, childNodes: [] };
  }
};

const { Router, navigate } = await import('../src/runtime/router.js');

test('Router matches root route', (t) => {
  window.location.pathname = '/';
  
  // Actually, Nuvsha components return fragments
  const routes = [
    { path: '/', component: () => {
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode('Home Page'));
        return frag;
      }
    },
    { path: '/about', component: () => {
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode('About Page'));
        return frag;
      }
    }
  ];
  
  const fragment = Router({ routes });
  
  const hasHomeText = fragment.childNodes.some(node => node.text === 'Home Page');
  assert.ok(hasHomeText, 'Should render Home Page');
});

test('Router matches /about route and popstate works', (t) => {
  window.location.pathname = '/';
  
  const routes = [
    { path: '/', component: () => {
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode('Home Page'));
        return frag;
      }
    },
    { path: '/about', component: () => {
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode('About Page'));
        return frag;
      }
    }
  ];
  
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
  
  const fragment = Router({ routes });
  
  // Simulate appending fragment to real DOM by moving nodes to container
  const anchor = fragment.childNodes.find(n => n.type === 'comment');
  fragment.childNodes.forEach(n => {
    container.childNodes.push(n);
    n.parentNode = container;
  });
  
  assert.ok(container.childNodes.some(n => n.text === 'Home Page'));
  
  // Simulate navigation
  window.location.pathname = '/about';
  window.dispatchEvent(new Event('popstate'));
  
  assert.ok(container.childNodes.some(n => n.text === 'About Page'));
  assert.ok(!container.childNodes.some(n => n.text === 'Home Page')); // Old nodes removed
});

test('Router handles 404', (t) => {
  window.location.pathname = '/non-existent';
  
  const routes = [
    { path: '/', component: () => {
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode('Home Page'));
        return frag;
      }
    },
    { path: '*', component: () => {
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode('Custom 404'));
        return frag;
      }
    }
  ];
  
  const fragment = Router({ routes });
  const has404Text = fragment.childNodes.some(node => node.text === 'Custom 404');
  assert.ok(has404Text, 'Should render Custom 404');
});

test('Router navigation function works', (t) => {
  window.location.pathname = '/';
  
  const routes = [
    { path: '/', component: () => {
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode('Home Page'));
        return frag;
      }
    },
    { path: '/about', component: () => {
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode('About Page'));
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
  
  fragment.childNodes.forEach(n => {
    container.childNodes.push(n);
    n.parentNode = container;
  });
  
  navigate('/about');
  
  assert.ok(container.childNodes.some(n => n.text === 'About Page'));
});

test('Router link click interception', (t) => {
  const fakeEvent = new Event('click');
  fakeEvent.target = {
    closest(selector) {
      if (selector === 'a') {
        return { 
          href: 'http://localhost/contact', 
          target: '' 
        };
      }
      return null;
    }
  };
  fakeEvent.preventDefault = () => { fakeEvent.defaultPrevented = true; };
  
  window.dispatchEvent(fakeEvent);
  
  assert.ok(fakeEvent.defaultPrevented, 'Should prevent default link behavior');
  assert.strictEqual(window.location.pathname, '/contact', 'Should update window.location.pathname');
});

test('Router does not intercept external links', (t) => {
  const fakeEvent = new Event('click');
  fakeEvent.target = {
    closest(selector) {
      if (selector === 'a') {
        return { 
          href: 'https://example.com', 
          target: '' 
        };
      }
      return null;
    }
  };
  fakeEvent.preventDefault = () => { fakeEvent.defaultPrevented = true; };
  
  window.dispatchEvent(fakeEvent);
  
  assert.ok(!fakeEvent.defaultPrevented, 'Should NOT prevent default behavior for external links');
});
