import { getContext } from './state.js';

/**
 * Creates a reactive data state object linked to the current component.
 * Executes the promiseFn immediately.
 * 
 * @param {Function} promiseFn A function that returns a Promise (e.g. API call)
 * @returns {Object} { data, loading, error, reload }
 */
export function data(promiseFn) {
  // Capture the component's $update function
  const $update = getContext();

  const state = {
    data: null,
    loading: true,
    error: null,
    
    reload: async (...args) => {
      state.loading = true;
      state.error = null;
      
      if ($update) $update();
      
      try {
        state.data = await promiseFn(...args);
      } catch (err) {
        state.error = err;
      } finally {
        state.loading = false;
        if ($update) $update();
      }
    }
  };

  // Execute immediately
  state.reload();

  return state;
}
