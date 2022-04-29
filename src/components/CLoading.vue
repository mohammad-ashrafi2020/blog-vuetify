<template>
  <div class="loading" v-if="isLoading">
    <v-progress-linear
        color="red accent-2"
        indeterminate
        rounded
        height="6"
    ></v-progress-linear>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const isLoading = computed(() => store.state.isLoading)
</script>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.27);
}
</style>
