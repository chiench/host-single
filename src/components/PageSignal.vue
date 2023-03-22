<template>
  <div>
    <h2 class="white--text my-4">Bullish and Bearish Crypto Signals</h2>
    <v-row>
      <v-col cols="12" sm="8">
        <v-card :loading="loadingTable" color="#1e1e1e">
          <template slot="progress">
            <v-progress-linear color="green" indeterminate></v-progress-linear>
          </template>
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

          <v-card-title
            class="d-flex justify-center align-center"
            v-if="loadingTable"
          >
            <p class="white--text text-caption mx-auto my-0">
              Loading table... Please wait
            </p>
          </v-card-title>
          <v-data-table
            v-else
            :search="search"
            dark
            dense
            :loading="loadingTable"
            class="elevation-1"
            sort-by="calories"
            :items-per-page="30"
            :page="1"
            :headers="headers"
            :items="items"
          >
            <template v-slot:headers="{ headers }">
              <thead>
                <tr>
                  <td v-for="(item, index) in headers" :key="index">
                    {{ item.text }}
                  </td>
                </tr>
              </thead>
            </template>

            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td v-if="index % 3 === 0" rowspan="3">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <div
                          v-bind="attrs"
                          v-on="on"
                          @click="showPopup()"
                          class="d-flex align-center justify-space-between coin-name"
                        >
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
                            <span class="text-caption">{{
                              item.coin_symbol
                            }}</span>

                            <div>
                              <i
                                style="
                                  font-size: 9px;
                                  color: red;
                                  margin-right: 8px;
                                "
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
                              <span class="text-caption mr-1">Technical:</span>
                              <span
                                v-bind:class="
                                  getColorToScore(item.technical_score)
                                "
                                class="text-caption"
                                >{{ item.technical_score }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </template>
                      <span class="white--text text-caption"
                        >Click show details
                      </span>
                    </v-tooltip>
                  </td>
                  <!-- <td v-else >{{ item.name }}</td> -->
                  <td>{{ item.type }}</td>

                  <td>
                    <span :class="getColor(getState(item.signals, `24h`))">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">
                            {{ getState(item.signals, "24h") }}</span
                          >
                        </template>
                        <span class="white--text"
                          >Timestamp:
                          {{ getTimeStampToolip(item.updated_at) }}</span
                        >
                      </v-tooltip>
                    </span>
                  </td>
                  <td>
                    <span :class="getColor(getState(item.signals, `4h`))">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">
                            {{ getState(item.signals, "4h") }}</span
                          >
                        </template>
                        <span class="white--text"
                          >Timestamp:
                          {{ getTimeStampToolip(item.updated_at) }}</span
                        >
                      </v-tooltip>
                    </span>
                  </td>
                  <td>
                    <span :class="getColor(getState(item.signals, `1h`))">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">
                            {{ getState(item.signals, "1h") }}</span
                          >
                        </template>
                        <span class="white--text"
                          >Timestamp:
                          {{ getTimeStampToolip(item.updated_at) }}</span
                        >
                      </v-tooltip>
                    </span>
                  </td>
                  <td>
                    <span :class="getColor(getState(item.signals, `30min`))">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">
                            {{ getState(item.signals, "30min") }}</span
                          >
                        </template>
                        <span class="white--text"
                          >Timestamp:
                          {{ getTimeStampToolip(item.updated_at) }}</span
                        >
                      </v-tooltip>
                    </span>
                  </td>
                  <td>
                    <span :class="getColor(getState(item.signals, `15min`))">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">
                            {{ getState(item.signals, "15min") }}</span
                          >
                        </template>
                        <span class="white--text"
                          >Timestamp:
                          {{ getTimeStampToolip(item.updated_at) }}</span
                        >
                      </v-tooltip>
                    </span>
                  </td>
                  <td>
                    <span :class="getColor(getState(item.signals, `5min`))">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">
                            {{ getState(item.signals, "5min") }}</span
                          >
                        </template>
                        <span class="white--text"
                          >Timestamp:
                          {{ getTimeStampToolip(item.updated_at) }}</span
                        >
                      </v-tooltip>
                    </span>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
          <Popup ref="formCoin"></Popup>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card :loading="loadingTable" color="#1e1e1e">
          <v-card-title style="background-color: #514c4c">
            <template slot="progress">
              <v-progress-linear
                color="green"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-text-field
              style="display: hidden"
              v-model="search"
              class="custom-label-color"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-card-title
            class="d-flex justify-center align-center"
            v-if="loadingTable"
          >
            <p class="white--text text-caption mx-auto my-0">
              Loading table... Please wait
            </p>
          </v-card-title>
          <template>
            <v-data-table
              dark
              dense
              :headers="headersTableRight"
              :items="items"
              :items-per-page="23"
              hide-default-header
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:headers="{ headers }">
                <thead>
                  <tr>
                    <td v-for="(item, index) in headers" :key="index">
                      {{ item.text }}
                    </td>
                  </tr>
                </thead>
              </template>
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td>{{ item.coin_symbol }}</td>
                    <td>
                      <span :class="getColor(getState(item.signals, `24h`))">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                              {{ getState(item.signals, "24h") }}</span
                            >
                          </template>
                          <span class="white--text"
                            >Timestamp:
                            {{ getTimeStampToolip(item.updated_at) }}</span
                          >
                        </v-tooltip>
                      </span>
                    </td>
                    <td>
                      <span :class="getColor(getState(item.signals, `4h`))">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                              {{ getState(item.signals, "4h") }}</span
                            >
                          </template>
                          <span class="white--text"
                            >Timestamp:
                            {{ getTimeStampToolip(item.updated_at) }}</span
                          >
                        </v-tooltip>
                      </span>
                    </td>
                    <td>{{ item.type }}</td>
                    <td>${{ getPrice(item.coin_price) }}</td>
                    <td>{{ item.updated_at }}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Popup from "./Popup.vue";
import axios from "axios";
export default {
  components: {
    Popup,
  },
  data: () => ({
    search: "",
    loadingTable: false,
    headers: [
      { sortable: true, text: "", value: "symbol_name", width: "230px" },
      { sortable: true, text: "", value: "type" },
      { sortable: false, text: "24H", align: "center" },
      { sortable: false, text: "4H", align: "center" },
      { sortable: false, text: "1H", align: "center" },
      { sortable: false, text: "30 Min", align: "center" },
      { sortable: false, text: "15 Min", align: "center" },
      { sortable: false, text: "5 Min", align: "center" },
    ],
    headersTableRight: [
      { sortable: false, text: "Symbol", value: "coin_symbol", width: "230px" },
      { sortable: false, text: "State", align: "center" },
      { sortable: false, text: "Type", value: "type" },
      { sortable: false, text: "Price", value: "coin_price", align: "center" },
    ],
    items: [],
  }),
  methods: {
    showPopup() {
      this.$refs.formCoin.showDialog();
    },

    getState(data, condition) {
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
      if (data > 70) {
        return "green--text";
      } else if (data < 30) {
        return "red--text";
      } else {
        return "orange--text";
      }
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
    this.loadingTable = true;
    axios
      .post("https://app.fidata.pro/api/quantifycrypto-signal")
      .then((response) => {
        let data = [...response.data];
        // lay gia tri thoi gian moi nhat qua updated_at
        const maxObj = data.sort((a, b) => {
          const timestampA = new Date(a.timestamp).getTime();
          const timestampB = new Date(b.timestamp).getTime();
          return timestampB - timestampA;
        });

        // Lấy ra đối tượng có giá trị timestamp lớn nhất
        const maxTimestampObject = maxObj.pop();
        console.log(maxTimestampObject, 1111);

        // tạo khoa tim kiem theo gia tri moi nhat//

        let cutStr = maxTimestampObject.updated_at;
        let searchKey = cutStr.substring(0, 16);
        console.log(searchKey, 222222);

        // lay mang 300 coin theo gia tri //
        const filteredCoin = data.filter((item) => {
          return item.updated_at.includes(searchKey);
        });
        console.log(filteredCoin, 33333);

        // gan mang vao table

        // const uniqueArr = data.filter(
        //   (obj, index, self) =>
        //     index === self.findIndex((t) => t.coin_symbol === obj.coin_symbol)
        // );
        this.items = filteredCoin;
        console.log(this.items, 222);
        this.loadingTable = false;
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
.coin-name:hover {
  cursor: pointer;
}
</style>
