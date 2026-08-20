import { mount } from 'nuvsha';
import App from './App.nuv';

/**
 * This is the entry point of your Nuvsha application.
 *
 * Step 1: import { mount } from 'nuvsha'
 *   The mount function is part of the Nuvsha runtime.
 *   Its job is to take your compiled component and attach it to the page.
 *
 * Step 2: import App from './App.nuv'
 *   The Nuvsha compiler (via the Vite plugin) automatically transforms
 *   App.nuv into a JavaScript module when Vite sees this import.
 *   You don't have to do anything special — it just works.
 *
 * Step 3: find the container
 *   We look for the <div id="app"> that exists in index.html.
 *
 * Step 4: mount(App, container)
 *   This calls App's render function and places the resulting HTML
 *   inside the container div.
 */

const container = document.getElementById('app');

mount(App, container);
