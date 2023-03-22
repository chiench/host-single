<template>
  <div>
    <h2 class="white--text my-4">Bullish and Bearish Crypto Signals</h2>
    <v-row>
      <v-col cols="12" sm="8">
        <v-card color="#1e1e1e">
          <v-card-title style="background-color: #514c4c">
            <v-text-field
              v-model="search"
              class="custom-label-color"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table
            loading-text="Loading... Please wait"
            :search="search"
            dark
            :loading="loading"
            class="elevation-1"
            :headers="headers"
            :items="dataTable"
            :items-per-page="10"
            :page="2"
          >
            <!-- eslint-disable-next-line -->
            <template v-slot:item.symbol_name="{ item }">
              <div class="d-flex align-center justify-space-between">
                <img
                  style="
                    width: 30px;
                    padding-right: 8px;
                    vertical-align: middle;
                  "
                  :src="getSrc(item.coin_symbol)"
                />
                <div
                  class="ml-3 text-left"
                  style="width: 150px; font-size: 17px"
                >
                  {{ item.symbol_name }}
                  <span class="text-caption">{{ item.coin_symbol }}</span>

                  <div>
                    <i
                      style="font-size: 9px; color: red; margin-right: 8px"
                      class="fa-solid fa-chevron-down"
                    ></i>
                    <span
                      v-bind:class="getColorToPrice(item.coin_price)"
                      class="text-caption mr-2"
                      >${{ getPrice(item.coin_price) }}</span
                    >
                    <span
                      v-bind:class="getColorToPrice(item.coin_price)"
                      class="text-caption"
                      >- 2.02 %</span
                    >
                  </div>
                  <div>
                    <span
                      v-bind:class="getColorToScore(item.technical_score)"
                      class="text-caption"
                      >Technical: {{ item.technical_score }}</span
                    >
                  </div>
                </div>
              </div>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.type="{ item }">
              <span>
                {{ item.type }}
              </span>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.signals="{ item }">
              <span :class="getColor(getState(item.signals, `24h`))">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      {{ getState(item.signals, "24h") }}</span
                    >
                  </template>
                  <span class="white--text"
                    >Timestamp: {{ getTimeStampToolip(item.updated_at) }}</span
                  >
                </v-tooltip>
              </span>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.signals1="{ item }">
              <span :class="getColor(getState(item.signals, `2h`))">
                {{ getState(item.signals, "2h") }}
              </span>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.signals2="{ item }">
              <span :class="getColor(getState(item.signals, `1h`))">
                {{ getState(item.signals, "1h") }}
              </span>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.signals3="{ item }">
              <span :class="getColor(getState(item.signals, `30min`))">
                {{ getState(item.signals, "30min") }}
              </span>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.signals4="{ item }">
              <span :class="getColor(getState(item.signals, `15min`))">
                {{ getState(item.signals, "15min") }}
              </span>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.signals5="{ item }">
              <span :class="getColor(getState(item.signals, `5min`))">
                {{ getState(item.signals, "5min") }}
              </span>
            </template>

            <!-- eslint-disable-next-line -->
            <!-- <template v-slot:item.state="{ item }">
      <span :class="getColor(item.state)">
        {{ item.state }} %
      </span> -->
            <!-- </template> -->
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4"></v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    search: "",
    loading: false,

    headers: [
      { text: "", value: "symbol_name", width: "230px", rowspan: 2 },
      { text: "", value: "type", colspan: 1, rowspan: 3 },
      { text: "24H", align: "center", value: "signals", colspan: 2 },
      { text: "4H", align: "center", value: "signals", colspan: 2 },
      { text: "1H", align: "center", value: "signals", colspan: 2 },
      { text: "30 Min", align: "center", value: "signals", colspan: 2 },
      { text: "15 Min", align: "center", value: "signals", colspan: 2 },
      { text: "5 Min", align: "center", value: "signals", colspan: 2 },
    ],
    dataTable: [],
  }),
  methods: {
    getState(data, condition) {
      console.log(data, typeof data, 333);
      let arr = JSON.parse(data);
      let new_arr = arr.filter((i) => i.interval == condition);
      let standard = new_arr[0].state;
      standard = standard.toUpperCase();
      return standard;
    },
    getPrice(data) {
      let price = data.toLocaleString("en-US");
      return price;
    },
    getColorToPrice(data) {
      console.log(data);
      return "green--text";
    },
    getColorToScore(data) {
      console.log(data);
      return "green--text";
    },
    getTimeStampToolip(data) {
      const date = new Date(data);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getUTCFullYear();
      const hour = date.getUTCHours();
      const minute = date.getUTCMinutes();
      const timeZoneOffset = date.getTimezoneOffset() / 60; // Chuyển đổi sang giờ

      const formattedDate = `${month}/${day}/${year}, ${hour}:${minute} ${
        hour >= 12 ? "pm" : "am"
      } GMT${timeZoneOffset >= 0 ? "+" : "-"}${Math.abs(timeZoneOffset)}`;
      return formattedDate;
    },
    getColor(state) {
      console.log(state, 5555);
      switch (state) {
        case "BULLISH":
          return "green--text";
        case "BEARISH":
          return "red--text";
        case "NEUTRAL":
          return "orange--text";
      }
    },
    getSrc(src) {
      return (
        "https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/" +
        src.toLowerCase() +
        ".png"
      );
    },
  },
  created() {
    this.loading = true;
    axios
      .post("https://app.fidata.pro/api/quantifycrypto-signal")
      .then((response) => {
        let data = [...response.data];

        const uniqueArr = data.filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t.coin_symbol === obj.coin_symbol)
        );
        this.dataTable = uniqueArr;
        console.log(this.dataTable, 222);
        this.loading = false;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
};
</script>
<style scoped>
.v-text-field .v-label {
  color: olivedrab I !important;
}

.v-text-field__slot #input-10 {
  color: red !important;
}

.v-input__append-inner .v-input__icon i {
  color: green !important;
}
</style>
