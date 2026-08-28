import { getContext } from './state.js';

/**
 * Creates a reactive form state object linked to the current component.
 * 
 * @param {Object} initialValues 
 * @returns {Object} form primitive
 */
export function form(initialValues) {
  // Capture the component's $update function
  const $update = getContext();

  // Clone initial values to avoid mutating the original object on reset
  const initial = JSON.parse(JSON.stringify(initialValues || {}));

  const state = {
    ...initial,
    loading: false,
    error: null,
    success: false,

    // Dynamically captures all fields to pass to the submit function
    get values() {
      const vals = {};
      for (const key of Object.keys(initial)) {
        vals[key] = state[key];
      }
      return vals;
    },

    submit: async (submitFn) => {
      if (state.loading) return;

      state.loading = true;
      state.error = null;
      state.success = false;
      if ($update) $update();

      try {
        const res = await submitFn(state.values);
        state.success = true;
        return res;
      } catch (err) {
        state.error = err.message || err;
      } finally {
        state.loading = false;
        if ($update) $update();
      }
    },

    reset: () => {
      for (const [key, val] of Object.entries(initial)) {
        state[key] = val;
      }
      state.loading = false;
      state.error = null;
      state.success = false;
      if ($update) $update();
    },

    setError: (err) => {
      state.error = err;
      if ($update) $update();
    },

    clearError: () => {
      state.error = null;
      if ($update) $update();
    }
  };

  return state;
}
