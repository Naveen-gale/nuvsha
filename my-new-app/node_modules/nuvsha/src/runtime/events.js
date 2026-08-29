/**
 * Nuvsha Runtime — events.js
 * 
 * Helper for event handlers to reduce generated bundle size.
 * Handles synchronous execution and promise resolution for async handlers.
 */

export function handleEvent(fn, $update) {
  return function(event) {
    const res = fn(event);
    $update();
    
    // If the handler returned a promise (e.g. an async function)
    if (res && typeof res.then === 'function') {
      res.then(() => $update()).catch(() => $update());
    }
  };
}
