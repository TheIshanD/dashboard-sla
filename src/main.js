import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faArrowRight);
library.add(faArrowLeft);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
