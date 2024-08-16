<template>
    <div class="container">
        <!-- 搜索框 -->
        <div class="search">
            <div class="search-item weatherWidth">
                <input type="text" placeholder="请输入城市名" v-model="city">
                <i class="ri-search-eye-line" @click="search"></i>
            </div>
        </div>
        <!-- 今日天气 -->
        <div class="weather todayWeatherWidth">
            <div class="weather-left">
                <div>{{ cityShow }}天气</div>
                <div class="summary">
                    <img :src="`/src/icons/${weather.icon}.svg`" alt="天气图标">
                    <p>{{ weather.temp }}<span>℃</span></p>
                    <div class="describe">
                        <div class="weather-text">{{ weather.text }}</div>
                        <div class="weather-feelslike">{{ weather.feelsLike }}°</div>
                    </div>
                </div>
            </div>
            <div class="weather-right" style="margin-left: 1rem;">空气质量</div>
        </div>
    </div>
</template>

<script setup>

import { onMounted, ref } from "vue";
import * as echarts from 'echarts';
import axios from "axios";
import key from "@/config";

//设置初始值
let city = ref('北京');
let cityShow = ref('北京');
let weather = ref({});

//搜索功能
let search = async () => {
    cityShow.value = city.value;
    let res = await axios.get('https://devapi.qweather.com/v7/weather/now', {
        params: {
            key: key.apikey,
            location: '101010100'
        }
    })
    console.log(res)
    weather.value = res.data.now;
}
// onMounted(() => {
//     search()
// })
</script>

<style scoped>
/* 搜索框 */
.container {
    color: #fff;
}

.search {
    background-color: rgba(255, 255, 255, .1);
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

/* 今日天气 */
.todayWeatherWidth {
    display: flex;
    justify-content: left;
    width: 100%;
}
</style>