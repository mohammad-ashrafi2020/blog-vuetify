<template>
  <div>
    <h1>دسته بندی ها</h1>
    <hr/>
    <v-btn color="success" @click="$router.push({name:'addCategory'})">
      <v-icon
          right
          dark
      >
        mdi-plus
      </v-icon>
      افزودن دسته بندی

    </v-btn>
    <v-table class="elevation-4 mt-7">
      <thead>
      <tr>
        <th>#</th>
        <th>عنوان</th>
        <th>slug</th>
        <th>عملیات</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in categories" :key="item.id">
        <td v-text="item.id"></td>
        <td>
          <span>{{ item.title }}</span>
          <span v-if="item.parentId>0"> - {{ item.parentId }}</span>
        </td>
        <td v-text="item.slug"></td>
        <td>
          <v-btn color="error" @click="deleteCategory(item.id)" class="ml-2">حذف</v-btn>
          <v-btn color="info" class="ml-2" @click="$router.push({name:'editCategory',params:{id:item.id}})">ویرایش
          </v-btn>
          <v-btn v-if="item.parentId===0" color="primary"
                 @click="$router.push({name:'addCategory',query:{parentId:item.id}})">
            افزودن زیر گروه
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import {useToast} from "vue-toastification";
import Swal from 'sweetalert2'

import {useStore} from "vuex";

const store = useStore();
const toast=useToast();
const categories = computed(() => store.state.categoryModule.categories)

function deleteCategory(id) {
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
      store.dispatch("deleteCategory", id).then(res => {
        if(res.status===200){
          toast.success("حذف با موفقیت انجام شد");
          store.dispatch("getCategories");
        }
      }).catch(error=>{
        if(error.response.data){
          toast.error(error.response.data)
        }else{
          toast.error("مشکلی در عملیات رخ داده است")
        }
      });
    }
  })
}

onMounted(() => {
  store.dispatch("getCategories");
})
</script>

<style scoped>

</style>
