<template>
  <v-app>
    <v-main>
      <c-loading></c-loading>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import CLoading from "@/components/CLoading";
export default {
  name: 'App',
  components: {CLoading},
  data: () => ({
    //
  }),
}
</script>
<style>
.v-application{
  direction: rtl !important;
}
</style>
