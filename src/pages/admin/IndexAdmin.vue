<template>
  <h1>Admin</h1>
</template>

<script setup>
import axios from "axios";

axios.post("https://codeyad.com/Course/2039/result#comments").then(res => {
  if (res.status === 200) {
    console.log(res.headers);
    console.log(res.data);
  }
}).catch(err => {
  console.log(err);
  console.log(err.response);
})
</script>

<style scoped>

</style>
