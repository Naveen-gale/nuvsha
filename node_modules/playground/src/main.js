import { mount } from 'nuvsha';
import App from './App.nuv';


// Get the root div from index.html
const container = document.getElementById('app');

// Mount our App component into it
mount(App, container);


