import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";

Vue.use(HighchartsVue);

// Optional: load additional modules like highcharts-more, exporting, etc.
// Refer to Highcharts documentation for more information.
require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
require("highcharts/modules/solid-gauge")(Highcharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
