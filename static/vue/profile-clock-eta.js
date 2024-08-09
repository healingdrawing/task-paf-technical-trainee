import { createApp } from './vue.esm-browser.prod.js';
import clock from './Clock-Component.js';

createApp(clock, {blink: true}).mount('#vue-clock');
