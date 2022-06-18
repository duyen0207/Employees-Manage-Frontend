import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faArrowRotateRight,
  faAngleDown,
  faCaretDown,
  faXmark,
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

import { faCircleQuestion as regularQuestion} from "@fortawesome/free-regular-svg-icons"

/* add icons to the library */
library.add(
  faUserSecret,
  faArrowRotateRight,
  faAngleDown,
  faCaretDown,
  faXmark,
  faCircleCheck,
  faCircleExclamation,
  faCircleQuestion,
  faTriangleExclamation,
  regularQuestion,
);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
// createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
