import { createApp } from './vue.esm-browser.prod.js';
import slideshow from './Slideshow-Component.js';

createApp(slideshow, {
  path: '/vue-slideshow/profilepage'
}).mount('#vue-slideshow');