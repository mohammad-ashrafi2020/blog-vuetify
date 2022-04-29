<template>
  <v-btn type="submit" :disabled="isLoading" color="success" class="float-left">ثبت اطلاعات</v-btn>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const isLoading = computed(() => store.state.isLoading)
</script>

