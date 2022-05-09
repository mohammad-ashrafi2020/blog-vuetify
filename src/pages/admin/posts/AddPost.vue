<template>
  <h1>افزودن کاربر جدید</h1>
  <hr/>
  <v-form
      class="elevation-7 pr-3 pl-3 pt-5 pb-12"
      ref="form"
      lazy-validation
      @submit.prevent="addPost"
  >
    <v-row>
      <v-col cols="12" md="6" class="pb-0">
        <v-text-field v-model="postData.title"
                      :rules="[v=>!!v||'عنوان را وارد کنید']"
                      required
                      label="عنوان">

        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
            :rules="[v=>!!v||'slug را وارد کنید']"
            v-model="postData.slug"
            required
            label="slug">
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="pb-0">
        <v-textarea solo v-model="postData.description" required label="توضیحات"
                    :rules="[v=>!!v||'توضیحات را وارد کنید']">
        </v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <label>نویسنده</label>
        <select v-model="postData.userId" class="custom-select">
          <option v-for="item in usersFilter?.users" :key="item.userId" :value="item.userId">{{
              item.fullName
            }}
          </option>
        </select>
      </v-col>
      <v-col cols="12" md="6">
        <label>دسته بندی</label>
        <select v-model="postData.categoryId" class="custom-select">
          <option v-for="item in categories.filter(f=>f.parentId==0)" :key="item.id" :value="item.id">{{
              item.title
            }}
          </option>
        </select>
      </v-col>

      <v-col cols="12" md="6">
        <label>زیر دسته بندی</label>
        <select v-model="postData.subCategoryId" class="custom-select">
          <option v-for="item in subCategories" :key="item.id" :value="item.id">{{ item.title }}</option>
        </select>
      </v-col>
      <v-col cols="12" md="6">
        <v-switch
            v-model="postData.isSpecial"
            hide-details
            color="primary"
            label="آیا این پست ویژه است ؟"
        ></v-switch>
      </v-col>
      <v-col cols="12" md="6">
        <v-file-input
            v-model="files"
            show-size
            accept="image/png, image/jpeg, image/bmp"
            label="تصویر پست"
        ></v-file-input>
      </v-col>

    </v-row>
    <c-submit></c-submit>
  </v-form>
</template>


<script setup>
import CSubmit from "@/components/CSubmit";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";

const postData = reactive({
  userId: 0,
  categoryId: 0,
  subCategoryId: 0,
  title: "",
  slug: "",
  description: "",
  isSpecial: false
})
const store = useStore();
const toast = useToast();
const router = useRouter();
const form = ref(null);
const usersFilter = computed(() => store.state.userModule.usersFilter);
const categories = computed(() => store.state.categoryModule.categories);
const subCategories = ref([]);
const files = ref([]);
watch(
    () => postData.categoryId,
    () => {
      subCategories.value = categories.value.filter(f => f.parentId == postData.categoryId);
    });


async function addPost() {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("اطلاعات نامعتبر است")
    return;
  }
  if (postData.userId <= 0  || postData.subCategoryId <= 0 || files.value.length === 0) {
    toast.error("اطلاعات نامعتبر است")
    return;
  }

  const formData = new FormData();
  formData.append("UserId", postData.userId.toString());
  formData.append("CategoryId", postData.categoryId.toString());
  formData.append("SubCategoryId", postData.subCategoryId.toString());
  formData.append("Title", postData.title);
  formData.append("Slug", postData.slug);
  formData.append("ImageFile", files.value[0]);
  formData.append("Description", postData.description);
  formData.append("IsSpecial", postData.isSpecial.toString());

  store.dispatch("addPost", formData).then(res => {
    if (res.status === 200) {
      router.push("/admin/posts");
      toast.success("عملیات با موفقیت انجام شد")
    }
  });
}

onMounted(() => {
  store.dispatch("getUsers", {take: 100, pageId: 1});
  store.dispatch("getCategories")
})

</script>
