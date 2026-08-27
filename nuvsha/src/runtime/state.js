/**
 * Nuvsha Runtime — state.js
 *
 * This is the reactive engine of Nuvsha.
 *
 * SIMPLE IDEA:
 *   When you write `count = 0` in a .nuv file, the compiler creates
 *   a local variable `let count = 0` inside the `render()` function.
 *
 *   The compiler also generates $watch calls like this:
 *     $watch(() => String(count), (val) => textNode.textContent = val)
 *
 *   "Watch this expression. If it ever returns a different value, call
 *    this callback with the new value."
 *
 *   When the user clicks a button that runs `count++`, the event handler
 *   calls `$update()`, which re-evaluates every watched expression and
 *   calls the callbacks for the ones that changed.
 *
 * WHY COMPONENT-SCOPED?
 *   Each component gets its OWN set of watchers via createComponent().
 *   This means clicking a button in ComponentA does not force ComponentB
 *   to re-evaluate its expressions. Each component is isolated.
 *
 * REACTIVITY MODEL:
 *   Dirty-checking (poll on demand). Simple, predictable, fast enough.
 *   We do NOT use JavaScript Proxy or Object.defineProperty.
 *   We do NOT need a virtual DOM.
 */

/**
 * Creates a new reactive boundary for a single component instance.
 *
 * Returns two functions:
 *   $watch(getter, callback) — register an expression to track
 *   $update()               — evaluate all tracked expressions and fire callbacks for changes
 *
 * @returns {{ $watch: Function, $update: Function }}
 */
export function createComponent() {
  // A private set of all tracked expressions for this component.
  // Each entry is: { getter: Function, callback: Function, lastValue: any }
  const watchers = new Set();

  /**
   * Registers an expression to be tracked for changes.
   *
   * @param {Function} getter   — A function that returns the current expression value.
   *                              Example: () => String(count)
   * @param {Function} callback — Called with the new value whenever it changes.
   *                              Example: (val) => textNode.textContent = val
   */
  function $watch(getter, callback) {
    watchers.add({
      getter,
      callback,
      lastValue: getter(), // Capture the initial value now
    });
  }

  /**
   * Re-evaluates all watched expressions.
   * For any that returned a different value than last time, fires the callback.
   *
   * Called after every user event (click, input, etc.) by the generated code.
   */
  function $update() {
    for (const watcher of watchers) {
      try {
        const newValue = watcher.getter();
        if (newValue !== watcher.lastValue) {
          watcher.lastValue = newValue;
          watcher.callback(newValue);
        }
      } catch {
        // Silently skip watchers that error (e.g. undefined.name when data isn't loaded yet)
      }
    }
  }

  return { $watch, $update };
}

// ============================================================================
// CONTEXT TRACKING (For runtime primitives like data() to trigger updates)
// ============================================================================

let currentUpdateContext = null;

export function setContext(updateFn) {
  currentUpdateContext = updateFn;
}

export function clearContext() {
  currentUpdateContext = null;
}

export function getContext() {
  return currentUpdateContext;
}
