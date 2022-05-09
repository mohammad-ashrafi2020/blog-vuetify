<template>
  <h1>پربازدید ترین مقالات</h1>
  <v-row>
      <v-col cols="12" md="3" v-for="item in posts" :key="item.postId">
        <post-card :post="item"></post-card>
      </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {GetPopularPosts} from "../Services/PostService"
import PostCard from "@/components/PostCard";

const posts = ref([]);

onMounted(() => {
  GetPopularPosts().then(res => {
    if (res.status === 200) {
      posts.value = res.data;
    }
  })
})
</script>
