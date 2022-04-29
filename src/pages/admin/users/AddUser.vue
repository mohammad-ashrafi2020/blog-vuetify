<template>
  <h1>افزودن کاربر جدید</h1>
  <hr/>
  <v-form
      ref="form"
      lazy-validation
      @submit.prevent="addUser"
  >
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-text-field v-model="fullName"
                      :rules="[v=>!!v||'نام و نام خانوادگی را وارد کنید']"
                      required label="نام و نام خانوادگی"></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="pt-0">
        <v-text-field
            :rules="[v=>!!v||'نام کاربری را وارد کنید']"
            v-model="userName"
            required label="نام کاربری"></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="pt-0">
        <v-text-field v-model="password" :rules="passwordRules" required label="کلمه عبور"></v-text-field>
      </v-col>
    </v-row>

    <c-submit></c-submit>
  </v-form>
</template>

<script setup>
import {ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import CSubmit from "@/components/CSubmit";

const toast = useToast();
const store = useStore();
const router = useRouter();

const form = ref(null);
const fullName = ref("");
const userName = ref("");
const password = ref("");
const passwordRules = [
  v => !!v || 'کلمه عبور را وارد کنید',
  v => v.length > 4 || 'کلمه عبور باید بیشتر از 4 کاراکتر باشد'
]

function addUser() {
  form.value.validate().then(res => {
    if (res.valid === true) {
      store.dispatch("addUser", {
        fullName: fullName.value,
        userName: userName.value,
        password: password.value
      }).then(res => {
        if (res.status === 200) {
          toast.success("عملیات با موفقیت انجام شد")
          router.push("/admin/users")
        }
      }).catch(error => {
        toast.error("مشکلی در عملیات رخ داده است")
      })
    }
  });


}
</script>

<style scoped>

</style>
