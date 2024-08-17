function aircondiChartInit() {
  let mychart = echarts.init(aircondiChart.value);
  console.log(airData.value.aqi);
  let option = {
    autoResize: true,
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "gauge",
        max: 200,
        radius: "100%",
        title: {
          color: "#FED624",
        },
        data: [
          {
            value: airData.value.aqi,
            name: airData.value.category,
          },
        ],
        axisLine: {
          lineStyle: {
            color: [
              [0.25, "#8cd2af"],
              [0.7, "#1EB04D"],
              [0.9, "#D73C31"],
              [2, "#6E2211"],
            ],
          },
        },
        label: {
          show: false, // 取消饼图上的文字标签
        },
        axisTick: {
          show: false, // 取消刻度线
        },
        axisLabel: {
          show: false, // 取消刻度文字
        },
        detail: {
          fontsize: 40,
          color: "#FED624",
          offsetCenter: [0, "-25%"],
          formatter: "{value}",
        },
      },
    ],
  };
  mychart.setOption(option);
}

async function aircondiChartInit() {
  try {
    await axios
      .get("https://devapi.qweather.com/v7/air/now", {
        params: {
          key: key.apikey,
          location: location.value,
        },
      })
      .then((response) => {
        airData.value = response.data.now;
      });

    let mychart = echarts.init(aircondiChart.value);
    let option = {
      autoResize: true,
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "gauge",
          max: 200,
          radius: "100%",
          title: {
            color: "#FED624",
          },
          data: [
            {
              value: airData.value.aqi,
              name: airData.value.category,
            },
          ],
          axisLine: {
            lineStyle: {
              color: [
                [0.25, "#8cd2af"],
                [0.7, "#1EB04D"],
                [0.9, "#D73C31"],
                [2, "#6E2211"],
              ],
            },
          },
          label: {
            show: false, // 取消饼图上的文字标签
          },
          axisTick: {
            show: false, // 取消刻度线
          },
          axisLabel: {
            show: false, // 取消刻度文字
          },
          detail: {
            fontsize: 40,
            color: "#FED624",
            offsetCenter: [0, "-25%"],
            formatter: "{value}",
          },
        },
      ],
    };
    mychart.setOption(option);
  } catch (error) {
    console.error("获取空气质量数据时出错:", error);
  }
}

let airquality = await axios
  .get("https://devapi.qweather.com/v7/air/now", {
    params: {
      key: key.apikey,
      location: location.value,
    },
  })
  .then((response) => {
    airData.value = response.data.now;
    // console.log(airData.value)
  })
  .then(() => {
    aircondiChartInit();
  });
console.log("airquality", airquality);
// airData.level ? airData.level : '-1'

// let airquality = await axios.get('https://devapi.qweather.com/v7/air/now', {
//     params: {
//         key: key.apikey,
//         location: location.value
//     }
// })
// console.log('airquality', airquality)
// airData.value = airquality.data.now;
// console.log('airData',airData.value)
