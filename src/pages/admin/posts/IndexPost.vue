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
        <v-col cols="12" md="6" >
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
        <td></td>
        <td v-text="item.title"></td>
        <td v-text="item.slug"></td>
        <td v-text="item.userFullName"></td>
        <td>
          <v-btn @click="$router.push(`/admin/users/edit/${item.userId}`)" color="info">ویرایش</v-btn>
        </td>
      </tr>
      <tr v-if="postFilter.entityCount===0">
        <td colspan="5">کاربری برای نمایش وجود ندارد</td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {useToast} from "vue-toastification";
import Swal from 'sweetalert2'

import {useStore} from "vuex";
import postModule from "@/store/modules/postModule";

const store = useStore();
const toast = useToast();
const filter = reactive({pageId: 1, take: 20, title: ''})
const postFilter = computed(() => store.state.postModule.postsFilter);

function filterPosts() {
  store.dispatch("getPostByFilter", filter)
}

onMounted(() => {
  store.dispatch("getPostByFilter", filter)
})

</script>

<style scoped>

</style>
