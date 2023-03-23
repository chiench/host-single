<template>
  <div>
    <h2 class="white--text my-4">Bullish and Bearish Crypto Signals</h2>
    <v-row>
      <v-col cols="12" sm="7">
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
            :items-per-page="29"
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
                          @click="showPopup(item.coin_symbol)"
                          class="d-flex align-center justify-evenly coin-name"
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
                                v-if="
                                  getColorToChange(item.percent_change_5min) ==
                                  `red--text`
                                "
                                style="
                                  font-size: 9px;
                                  color: red;
                                  margin-right: 8px;
                                "
                                class="fa-solid fa-chevron-down"
                              ></i>
                              <i
                                v-else
                                style="
                                  font-size: 9px;
                                  color: green;
                                  margin-right: 8px;
                                "
                                class="fa-solid fa-chevron-up"
                              ></i>
                              <span
                                v-bind:class="
                                  getColorToChange(item.percent_change_5min)
                                "
                                class="text-subtitle-2 mr-2"
                                >${{ getPrice(item.coin_price) }}</span
                              >
                              <span
                                class="text-caption"
                                v-bind:class="
                                  getColorToChange(item.percent_change_5min)
                                "
                                >{{ item.percent_change_5min }}</span
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
      <v-col style="margin-left: -10px" cols="12" sm="5">
        <v-card style="margin-top: 17%" :loading="loadingTable" color="#1e1e1e">
          <template slot="progress">
            <v-progress-linear color="green" indeterminate></v-progress-linear>
          </template>

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
            dark
            dense
            :headers="headersTableRight"
            :items="items"
            :items-per-page="23"
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

                  <td>{{ item.type }}</td>

                  <td>{{ getRandom() }}</td>
                  <td>${{ getPrice(item.coin_price) }}</td>
                  <td>{{ getTimeTableRight(item.updated_at) }}</td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
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
      { sortable: true, text: "", value: "symbol_name", width: "180px" },
      { sortable: true, text: "", value: "type", width: "20px" },
      { sortable: false, text: "24H", width: "20px", align: "center" },
      { sortable: false, text: "4H", width: "20px", align: "center" },
      { sortable: false, text: "1H", width: "20px", align: "center" },
      { sortable: false, text: "30 Min", width: "20px", align: "center" },
      { sortable: false, text: "15 Min", width: "20px", align: "center" },
      { sortable: false, text: "5 Min", width: "20px", align: "center" },
    ],
    headersTableRight: [
      { sortable: false, width: "30px", text: "Symbol", value: "coin_symbol" },
      { sortable: false, width: "30px", text: "State", align: "center" },
      { sortable: false, width: "30px", text: "Type", value: "type" },
      { sortable: false, width: "30px", text: "Candle", value: "type" },
      {
        sortable: false,
        width: "30px",
        text: "Price",
        value: "coin_price",
        align: "center",
      },
      {
        sortable: false,
        width: "30px",
        text: "Time",
        value: "updated_at",
        align: "center",
      },
    ],
    items: [],
  }),
  methods: {
    // async showPopup(item) {
    //   const data = await axios.post(
    //     "https://app.fidata.pro/api/quantifycrypto-coin",
    //     {
    //       symbol: item,
    //     }
    //   );
    //   this.$refs.formCoin.showDialog(data.data);
    // },

    async getChangePercentage(coin) {
      const data = await axios.post(
        "https://app.fidata.pro/api/quantifycrypto-coin",
        {
          symbol: coin,
        }
      );
      console.log(data.data, "data");
      return data.data.coin_price;
    },
    getRandom() {
      const arr = ["1h", "4h", "24h", "5min", "15min", "30min"];
      const random = Math.floor(Math.random() * arr.length);
      return arr[random];
    },
    getTimeTableRight(dateTimeString) {
      const dateObj = new Date(dateTimeString);
      const timeString = dateObj.toLocaleTimeString("en-US", { hour12: true });
      return timeString;
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

    getColorToChange(data) {
      if (data > 0) {
        return "green--text";
      } else {
        return "red--text";
      }
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
      .then(async (response) => {
        const data1 = [...response.data];
        const newRes = await axios.post(
          "https://app.fidata.pro/api/quantifycrypto-coin"
        );
        const data2 = [...newRes.data];
        const dataRel = data1.map((x) => ({
          ...x,
          ...data2.find((e) => x.coin_symbol == e.coin_symbol),
        }));
        console.log("data", dataRel);

        // lay gia tri thoi gian moi nhat qua updated_at
        let maxObj = dataRel.sort((a, b) => {
          let timestampA = new Date(a.timestamp).getTime();
          let timestampB = new Date(b.timestamp).getTime();
          return timestampB - timestampA;
        });

        // // Lấy ra đối tượng có giá trị timestamp lớn nhất
        let maxTimestampObject = maxObj.pop();
        console.log(maxTimestampObject, 1111);

        // // tạo khoa tim kiem theo gia tri moi nhat//

        let cutStr = maxTimestampObject.updated_at;
        let searchKey = cutStr.substring(0, 16);
        console.log(searchKey, 222222);

        // // lay mang 300 coin theo gia tri //
        let filteredCoin = dataRel.filter((item) => {
          return item.updated_at.includes(searchKey);
        });
        // console.log(filteredCoin, 33333);
        let uniqueArr = filteredCoin.filter(
          (obj, index, self) =>
            index ===
              self.findIndex((t) => t.coin_symbol === obj.coin_symbol) ||
            index === self.findIndex((t) => t.type === obj.type)
        );

        this.items = uniqueArr;
        // console.log(this.items, 222);
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
