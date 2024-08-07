import { ref, onMounted, onBeforeUnmount } from './vue.esm-browser.prod.js';

export default {
  props: {
    path: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const slides = ref([]);
    const currentSlide = ref(0);
    let intervalId = null;

    onMounted(async () => {
      try {
        const response = await fetch(props.path);
        const data = await response.json();
        const promises = data.map(url => fetch(url).then(response => response.blob()));
        const blobs = await Promise.all(promises);
        slides.value = blobs.map(blob => URL.createObjectURL(blob));
        start_slideshow();
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    });

    function start_slideshow() {
      intervalId = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.value.length;
      }, 8000); // 8 seconds, shorter looks bad
    }

    onBeforeUnmount(() => {
      clearInterval(intervalId);
      slides.value.forEach(url => URL.revokeObjectURL(url));
    });

    return {
      slides,
      currentSlide,
    };
  },
  template: `
    <div class="slideshow">
      <div v-for="(slide, index) in slides" :key="index" class="slide" :style="{ opacity: currentSlide === index ? 1 : 0 }">
        <img :src="slide" alt="Slide" />
      </div>
    </div>
  `,  
};
