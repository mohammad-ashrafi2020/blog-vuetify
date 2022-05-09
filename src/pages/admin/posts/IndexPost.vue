<template>
  <div>
    <h1> مدیریت پست ها</h1>
    <hr/>
    <v-btn @click="$router.push({name:'addPost'})" color="success">افزودن پست جدید</v-btn>
    <form @submit.prevent="filterPosts" class="elevation-4 py-4 pl-4 pr-4 my-7">
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field v-model="filter.title"
                        label="عنوان"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field type="number" v-model="filter.take"
                        label="تعداد نمایش در صفحه"></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit" color="info">فیلتر</v-btn>
    </form>
    <v-table class="elevation-2 mt-7">
      <thead>
      <tr>
        <th>عکس</th>
        <th>عنوان</th>
        <th>slug</th>
        <th>نویسنده</th>
        <th>عملیات</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in postFilter.posts" :key="index">
        <td>
          <img :src="`${PostImageUrl}${item.imageName}`" style="max-width: 200px"/>
        </td>
        <td v-text="item.title"></td>
        <td v-text="item.slug"></td>
        <td v-text="item.userFullName"></td>
        <td>
          <v-btn @click="$router.push(`/admin/posts/edit/${item.postId}`)" color="info">ویرایش</v-btn>
          <v-btn @click="deletePost(item.postId)" class="mr-1" color="error">حذف</v-btn>
        </td>
      </tr>
      <tr v-if="postFilter.entityCount===0">
        <td colspan="5">پستی برای نمایش وجود ندارد</td>
      </tr>
      </tbody>
    </v-table>
    <v-pagination
        v-model="filter.pageId"
        :length="postFilter.pageCount"
        :total-visible="7"
        next-icon="mdi-chevron-left"
        prev-icon="mdi-chevron-right"
    ></v-pagination>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useToast} from "vue-toastification";
import Swal from 'sweetalert2'
import {PostImageUrl} from "@/utilities/ImageUrls"

import {useStore} from "vuex";
import postModule from "@/store/modules/postModule";

const store = useStore();
const toast = useToast();
const filter = reactive({pageId: 1, take: 1, title: ''})
const postFilter = computed(() => store.state.postModule.postsFilter);

function filterPosts() {
  filter.pageId = 1;
  store.dispatch("getPostByFilter", filter)
}

const deletePost = (postId) => {
  Swal.fire({
    title: 'آیا از حذف اطمینان دارید',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'بله ، حذفش کن',
    cancelButtonText: 'نه ، بی خیال',
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("deletePost", postId).then(res => {
        if (res.status === 200) {
          toast.success("حذف با موفقیت انجام شد");
          store.dispatch("getPostByFilter", filter);
        }
      }).catch(error => {
        if (error.response.data) {
          toast.error(error.response.data)
        } else {
          toast.error("مشکلی در عملیات رخ داده است")
        }
      });
    }
  })
}
watch(
    () => filter.pageId,
    () => {
      store.dispatch("getPostByFilter", filter)
    });
onMounted(() => {
  store.dispatch("getPostByFilter", filter)
})

</script>

<style scoped>

</style>
