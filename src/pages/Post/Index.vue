<template>
  <div class="elevation-8 pr-0 pl-0 pt-0 pb-5 v-container" v-if="post.postId">
    <img class="img" :src="`${PostImageUrl}${post.imageName}`">
    <div class="pr-4 pl-4">
      <h1>{{ post.title }}</h1>
      <p class="post-content">{{post.description}}</p>

      <hr/>

      <Comments :post-id="post.postId"></Comments>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getPostBySlug} from "@/services/PostService"
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {PostImageUrl} from "@/utilities/ImageUrls"
import Comments from "@/pages/Post/Comments";

const post = ref({});
const router = useRouter();
const store = useStore();

onMounted(() => {
  store.commit("setLoading", true);
  const slug = router.currentRoute.value.params.slug;
  getPostBySlug(slug).then(res => {
    if (res.status === 200) {
      post.value = res.data;
    } else {
      router.back()
    }
  }).catch(() => {
    router.back()
  }).finally(() => {
    store.commit("setLoading", false);
  })
})
</script>

<style scoped>
.post-content{
  white-space: pre-wrap
}
.img{
  width: 100%;
  max-height: 500px;
}
.v-container{
  width: 60% !important;

}
</style>
