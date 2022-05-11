<template>
  <div>
    <h1>جستوجو
      <small v-if="filter.title">{{ filter.title }}</small>
    </h1>
    <div v-if="loading===false">
      <v-row>
        <v-col cols="12" md="3" v-for="item in postFilterData.posts" :key="item.postId">
          <post-card :post="item"></post-card>
        </v-col>
      </v-row>
      <v-pagination
          v-if="postFilterData.pageCount>1"
          v-model="filter.pageId"
          :length="postFilterData.pageCount"
          :total-visible="7"
          next-icon="mdi-chevron-left"
          prev-icon="mdi-chevron-right"
          class="mt-3"
      ></v-pagination>
    </div>
    <div v-else class="text-center">
      <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import {getPostByFilter} from "@/services/PostService"
import PostCard from "@/components/PostCard"
import {useRouter} from "vue-router";

const loading = ref(true);
const router = useRouter();
const filter = reactive(
    {
      pageId: 1,
      take: 10,
      title: '',
      categorySlug: ""
    });
const postFilterData = ref({});

watchEffect(() => {
  filter.title = router.currentRoute.value.query.q;
  filter.categorySlug = router.currentRoute.value.query.categorySlug;
  filterPost();
});

onMounted(() => {
  filterPost();
});

function filterPost() {
  loading.value = true;
  getPostByFilter(filter).then(res => {
    if (res.status === 200) {
      postFilterData.value = res.data;
    }
  }).finally(() => {
    loading.value = false;

  })
}
</script>

<style scoped>

</style>
