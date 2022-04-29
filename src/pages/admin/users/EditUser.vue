<template>
  <div>
    <h1>ویرایش جدید</h1>
    <hr/>
    <v-form
        ref="form"
        lazy-validation
        @submit.prevent="editUser"
    >
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field v-model="fullName"
                        :rules="[v=>!!v||'نام و نام خانوادگی را وارد کنید']"
                        required label="نام و نام خانوادگی"></v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="pt-0">
          <v-switch
              v-model="role"
              hide-details
              :value="1"
              color="primary"
              :label="`ادمین`"
          ></v-switch>
          <v-switch
              v-model="role"
              hide-details
              :value="0"
              color="primary"
              :label="`کاربر`"
          ></v-switch>
        </v-col>
      </v-row>

     <c-submit></c-submit>
    </v-form>
  </div>
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
const fullName = ref("");
const role = ref(1);
const userId = ref(0);

function editUser() {
  form.value.validate().then(res => {
    if (res.valid === true) {
      store.dispatch("editUser", {
        fullName: fullName.value,
        role: role.value,
        userId: userId.value
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

onMounted(async () => {
  const userIdParam = router.currentRoute.value.params.id;
  if (userIdParam) {
    await store.dispatch("getUserById", userIdParam);
    const user = store.state.userModule.singleUser;
    userId.value = userIdParam;
    if (user.userName === undefined) {
      router.push("/admin/users");
      toast.error("کاربر یافت نشد")
    }

    fullName.value = user.fullName;
    role.value = user.role;
  } else {
    router.push("/admin/users");
  }
})
</script>

<style scoped>

</style>
