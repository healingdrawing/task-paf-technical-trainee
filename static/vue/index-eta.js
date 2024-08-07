import { createApp } from './vue.esm-browser.prod.js';
import slideshow from './Slideshow-Component.js';

createApp(slideshow, {
  path: '/vue-slideshow/homepage' // or any other folder you want to fetch from "static/img/slides" folder
}).mount('#vue-slideshow');
