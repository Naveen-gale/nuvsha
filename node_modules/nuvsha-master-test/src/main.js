import { mount } from 'nuvsha';
import './assets/main.css';
import App from './App.nuv';

const container = document.getElementById('app');
mount(App, container);
