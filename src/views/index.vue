<template>
    <div class="container">
        <!-- 搜索框 -->
        <div class="search base-bgc">
            <div class="search-item weatherWidth">
                <input type="text" placeholder="请输入城市名" v-model="city">
                <i class="ri-search-eye-line" @click="search"></i>
            </div>
        </div>
        <!-- 今日天气 -->
        <div class="weather todayWeatherWidth">
            <div class="weather-left   base-bgc">
                <div class="label-blod">{{ cityShow }}天气</div>
                <div class="weather-summary">
                    <img :src="`/src/icons/${weather.icon}.svg`" alt="天气图标">
                    <p class="weather-temp">{{ weather.temp }}<span>℃</span></p>
                    <div class="weather-describe">
                        <div class="weather-text">{{ weather.text }}</div>
                        <div class="weather-feelslike">体感温度&ensp;{{ weather.feelsLike }}°</div>
                    </div>
                </div>
                <!-- 天气细节展示列表 -->
                <div class="weather-item">
                    <ul>
                        <li>
                            <div class="item-tltle">风向</div>
                            <div class="item-details">{{ weather.windDir }}</div>
                        </li>
                        <li>
                            <div class="item-tltle">风力等级</div>
                            <div class="item-details">{{ weather.windScale }}&nbsp;级</div>
                        </li>
                        <li>
                            <div class="item-tltle">相对湿度</div>
                            <div class="item-details">{{ weather.humidity }}&nbsp;%</div>
                        </li>
                        <li>
                            <div class="item-tltle">大气压强</div>
                            <div class="item-details">{{ weather.pressure }}&nbsp;Pa</div>
                        </li>
                        <li>
                            <div class="item-tltle">能见度</div>
                            <div class="item-details">{{ weather.vis }}&nbsp;Km</div>
                        </li>
                        <li>
                            <div class="item-tltle">云量</div>
                            <div class="item-details">{{ weather.cloud }}&nbsp;%</div>
                        </li>
                    </ul>
                </div>
                <!-- 天气指数 -->
                <div class="weatherDaily" v-if="daily.length >= 2">
                    {{ daily[0].text || '暂无天气指数信息' }}
                    {{ daily[1].text || '' }}
                </div>
            </div>
            <div class="weather-right  base-bgc" style="margin-left: 1rem;">
                <div class="label-blod">空气质量</div>
                <!-- 仪表盘 -->
                <div ref="aircondiChart" class="aircondiChartBox">
                </div>
                <div class="aircondiText" v-if="airData">空气质量指数等级：<b style="color: #FFE5B4;">{{
                    airData.level }}</b>&ensp;级</div>
                <div class="aircondiText" v-else>空气质量指数等级：-1 级</div>
            </div>
        </div>
        <!-- 生活指数 -->
        <div class="livingIndex base-bgc">
            <div class="label-blod living-title">生活指数</div>
            <ul class="livingIndex-content">
                <li>
                    <div class="daily-icon">
                        <i class="iconfont iconpaobukuai"></i>
                    </div>
                    <div class="daily-box">
                        <p class="daily-box-name">name</p>
                        <p class="daily-box-text">text</p>
                    </div>
                </li>
                <li>
                    <div class="daily-icon">
                        <i class="iconfont iconclothes-full"></i>
                    </div>
                    <div class="daily-box">
                        <p class="daily-box-name">name</p>
                        <p class="daily-box-text">text</p>
                    </div>
                </li>
                <li>
                    <div class="daily-icon">
                        <i class="iconfont iconyueyanglvyou"></i>
                    </div>
                    <div class="daily-box">
                        <p class="daily-box-name">name</p>
                        <p class="daily-box-text">text</p>
                    </div>
                </li>
                <li>
                    <div class="daily-icon">
                        <i class="iconfont iconganmao"></i>
                    </div>
                    <div class="daily-box">
                        <p class="daily-box-name">name</p>
                        <p class="daily-box-text">text</p>
                    </div>
                </li>
                <li>
                    <div class="daily-icon">
                        <i class="iconfont iconxiche-cuxiantiao"></i>
                    </div>
                    <div class="daily-box">
                        <p class="daily-box-name">name</p>
                        <p class="daily-box-text">text</p>
                    </div>
                </li>
                <li>
                    <div class="daily-icon">
                        <i class="iconfont icondiaoyuzhishu"></i>
                    </div>
                    <div class="daily-box">
                        <p class="daily-box-name">name</p>
                        <p class="daily-box-text">text</p>
                    </div>
                </li>
                <li>
                    <div class="daily-icon">
                        <i class="iconfont iconguominshi"></i>
                    </div>
                    <div class="daily-box">
                        <p class="daily-box-name">name</p>
                        <p class="daily-box-text">text</p>
                    </div>
                </li>
                <li>
                    <div class="daily-icon">
                        <i class="iconfont iconsun-uv_1"></i>
                    </div>
                    <div class="daily-box">
                        <p class="daily-box-name">name</p>
                        <p class="daily-box-text">text</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

import { onMounted, ref } from "vue";
import * as echarts from 'echarts';
import axios from "axios";
import key from "@/config";

//设置初始值
let city = ref('深圳');
let cityShow = ref('深圳');
let weather = ref({});
let location = ref();//城市位置id
let daily = ref([]);//天气指数
let aircondiChart = ref();//空气质量图
let airData = ref();//空气质量数据

//搜索功能
let search = async () => {
    cityShow.value = city.value;
    //获取城市location ID
    let localID = await axios.get('https://geoapi.qweather.com/v2/city/lookup', {
        params: {
            key: key.apikey,
            location: city.value
        }
    });

    location.value = localID.data.location[0].id;

    //获取对应ID城市天气数据
    let res = await axios.get('https://devapi.qweather.com/v7/weather/now', {
        params: {
            key: key.apikey,
            location: location.value
        }
    })
    console.log(res);
    weather.value = res.data.now;

    //获取天气指数
    let indicesData = await axios.get('https://devapi.qweather.com/v7/indices/1d', {
        params: {
            key: key.apikey,
            location: location.value,
            type: '3,5',//生活指数类型，参考https://dev.qweather.com/docs/resource/indices-info/
        }
    })
    daily.value = indicesData.data.daily;
    // console.log(daily.value)

    //空气质量 
    await axios.get('https://devapi.qweather.com/v7/air/now', {
        params: {
            key: key.apikey,
            location: location.value
        }
    }).then((response) => {
        airData.value = response.data.now;
    }).then(() => {
        aircondiChartInit();
    });

    console.log('airData.value:', airData.value, '空气质量等级:', airData.value.level)
}

// 调用 search 函数并获取返回值 
// async function callerFunction() {
//   let returnedAirData = await search();
//   // 对返回的 airData 进行操作
//   console.log('returnedAirData',returnedAirData.value.level);
// }
// callerFunction();

//图表功能
function chartInit() {
    let mychart = echarts.init(chart.value);
    let option = {};
    mychart.setOption(option);
}

//空气质量aircondiChart
function aircondiChartInit() {
    let mychart = echarts.init(aircondiChart.value);
    // console.log(airData.value)
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


onMounted(() => {
    search();
})

</script>

<style scoped>
/* 搜索框 */
.container {
    color: #fff;
}

.search {
    padding: 1rem;
}

.weatherWidth {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto;
}

.search-item {
    border-radius: 2rem;
    background-color: #fff;
    max-width: 30%;
    height: 3rem;
}

i {
    font-size: 2rem;
    cursor: pointer;
}

input {
    width: 80%;
    border: 0;
}
</style>