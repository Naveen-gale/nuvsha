/**
 * Nuvsha Runtime — router.js
 * 
 * A simple, runtime-only routing system for Nuvsha.
 * It uses the existing component model to render pages dynamically.
 */

// Global flag to ensure we only attach the click listener once
let isListenerAttached = false;

/**
 * The Router component.
 * 
 * @param {Object} props - Contains the 'routes' array.
 * @returns {DocumentFragment} - The Nuvsha-compatible DOM fragment.
 */
export function Router(props) {
  const routes = props.routes || [];
  
  // Create a fragment and an anchor comment to mark our insertion point,
  // similar to how conditional and for-loop rendering works in the compiler.
  const fragment = document.createDocumentFragment();
  const anchor = document.createComment("nuvsha-router");
  fragment.appendChild(anchor);
  
  let currentNodes = [];
  let currentPath = window.location.pathname;
  
  function renderRoute() {
    // Clear old nodes
    for (const n of currentNodes) {
      if (n.parentNode) {
        n.parentNode.removeChild(n);
      }
    }
    
    // Find matching route
    let matchedRoute = routes.find(r => r.path === currentPath);
    if (!matchedRoute) {
      // Fallback to wildcard 404 route if present
      matchedRoute = routes.find(r => r.path === '*');
    }
    
    let newFrag;
    if (matchedRoute && typeof matchedRoute.component === 'function') {
      // Execute the Nuvsha component render function
      newFrag = matchedRoute.component();
    } else {
      // Default basic 404 if no component provided
      newFrag = document.createTextNode("404 Not Found");
    }
    
    currentNodes = Array.from(newFrag.childNodes);
    
    // Insert new nodes before the anchor
    if (anchor.parentNode) {
      anchor.parentNode.insertBefore(newFrag, anchor);
    }
  }

  // Handle browser Back/Forward (popstate)
  // We attach it to window, but we need to ensure multiple routers don't conflict
  // (typically there is only one router per app, but we re-render it per popstate)
  // To avoid memory leaks if a router is destroyed (rare), we could use an AbortController.
  // For simplicity, we just attach a persistent listener that checks the current path.
  window.addEventListener('popstate', () => {
    if (currentPath !== window.location.pathname) {
      currentPath = window.location.pathname;
      renderRoute();
    }
  });

  // Global link interception
  if (!isListenerAttached && typeof window !== 'undefined') {
    isListenerAttached = true;
    window.addEventListener('click', (e) => {
      // Find the closest anchor tag
      const a = e.target.closest('a');
      if (a && a.href) {
        // Skip external target="_blank"
        if (a.target === '_blank') return;
        
        try {
          const url = new URL(a.href, window.location.origin);
          
          // Only intercept same-origin links
          if (url.origin === window.location.origin) {
            e.preventDefault();
            
            // Only navigate if path actually changed
            if (url.pathname !== window.location.pathname) {
              window.history.pushState({}, '', url.pathname);
              
              // Dispatch popstate to trigger Router to update
              window.dispatchEvent(new Event('popstate'));
            }
          }
        } catch (err) {
          // Ignore invalid URLs
        }
      }
    });
  }

  // Perform the initial render synchronously so the fragment contains the route contents
  renderRoute();

  return fragment;
}

/**
 * Manual navigation helper.
 * 
 * @param {string} path - The path to navigate to.
 */
export function navigate(path) {
  if (typeof window !== 'undefined') {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  }
}
