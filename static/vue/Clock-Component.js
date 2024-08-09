import { defineComponent } from './vue.esm-browser.prod.js';

export default defineComponent({
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      intervalId: null,
    };
  },
  mounted() {
    this.fetchTime();
    this.intervalId = setInterval(this.fetchTime, 10000);
  },
  unmounted() {
    clearInterval(this.intervalId);
  },
  methods: {
    async fetchTime() {
      const response = await fetch('/vue-clock');
      const data = await response.json();
      this.hours = data[0];
      this.minutes = data[1];
      this.seconds = data[2];
    },
    formatTime(value) {
      return (value < 10 ? '0' : '') + value;
    },
  },
  template: `
    <div class="clock">
      <div class="hour-minute">
        {{ formatTime(hours) }}:{{ formatTime(minutes) }}
      </div>
      <table class="seconds">
        <tr>
          <td v-for="i in 6" :key="i">
            <div class="container">
              <div :class="{ active: seconds >= (i - 1) * 10 }"></div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  `,
});
