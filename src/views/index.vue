<template>
    <div class="container">
        <!-- 搜索框 -->
        <div class="search">
            <div class="search-item weatherHeader">
                <input type="text" placeholder="请输入城市名" v-model="city">
                <i class="ri-search-eye-line" @click="search"></i>
            </div>
        </div>
        <!-- 天气数据区 -->
        <div>{{ cityShow }}--天气</div>
    </div>
</template>

<script setup>

import { onMounted, ref } from "vue";
import * as echarts from 'echarts';

let city = ref('深圳');
let cityShow = ref('深圳');
//搜索功能
let search = async () => {
    cityShow.value = city.value;
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

.weatherHeader {
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