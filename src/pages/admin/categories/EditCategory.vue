<template>
  <h1>ویرایش دسته بندی</h1>
  <hr/>
  <v-form
      ref="form"
      lazy-validation
      @submit.prevent="editCategory"
  >
    <v-row>
      <v-col cols="12" md="6" class="pb-0">
        <v-text-field v-model="title"
                      :rules="[v=>!!v||'عنوان را وارد کنید']"
                      required
                      label="عنوان">

        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
            :rules="[v=>!!v||'slug را وارد کنید']"
            v-model="slug"
            required
            label="slug">

        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="pb-0">
        <v-text-field v-model="metaDescription"
                      :rules="[v=>!!v||'عنوان را وارد کنید']"
                      required label="metaDescription"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
            :rules="[v=>!!v||'metaTag را وارد کنید']"
            v-model="metaTag"
            required
            label="metaTag">

        </v-text-field>
      </v-col>
    </v-row>
    <c-submit></c-submit>
  </v-form>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import CSubmit from "@/components/CSubmit";

const toast = useToast();
const store = useStore();
const router = useRouter();

const form = ref(null);
const title = ref("");
const slug = ref("");
const metaTag = ref("");
const metaDescription = ref("");


async function editCategory() {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("اطلاعات نامعتبر است")
    return;
  }
  let id = router.currentRoute.value.params.id;

  store.dispatch("editCategory", {
    title: title.value,
    slug: slug.value,
    metaTag: metaTag.value,
    metaDescription: metaDescription.value,
    id
  }).then(res => {
    if (res.status === 200) {
      toast.success("عملیات با موفقیت انجام شد")
      router.push("/admin/categories")
    }
  }).catch(error => {
    if(error.response.data){
      toast.error(error.response.data)
    }else{

      toast.error("مشکلی در عملیات رخ داده است")

    }
  })
}

onMounted(() => {
  let id = router.currentRoute.value.params.id;

  store.dispatch("getCategoryById",id).then(res => {
    if (res.status === 200) {
      title.value = res.data.title;
      slug.value = res.data.slug;
      metaTag.value = res.data.metaTag;
      metaDescription.value = res.data.metaDescription;
    } else {
      toast.error("خطایی رخ داده است")
    }
  })
})
</script>

<style scoped>

</style>
