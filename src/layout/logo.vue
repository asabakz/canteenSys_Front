<template>
  <div class="logo">
    <img :src="MenuLogo" alt="Cafe Logo" />
    <span class="logo-title">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 绝对路径或者正确的相对路径
const MenuLogo = ref(new URL("../assets/cafeLogo.png", import.meta.url).href);
const title = ref("Dish ManageSys");
</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    align-items: center;
    background-color: transparent;
    cursor: pointer;
}

img {
    width: 36px;
    height: 36px;
    margin-left: 20px;
    margin-right: 12px;
}

.logo-title {
    color: rgb(87, 87, 61);
    font-weight: bold;
    font-size: 17px;
    font-style: italic;
    font-family: "Brush Script MT", "Lucida Handwriting", cursive;
}

</style>
