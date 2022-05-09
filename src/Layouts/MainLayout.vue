<template>
  <v-card>
    <v-layout>
      <v-app-bar
          color="primary"
          prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>کدیاد بلاگ</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify"></v-btn>

        <v-btn variant="text" icon="mdi-account" @click="$router.push('/admin')"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          bottom
          theme="dark"
          position="right"
          permanent
      >
        <v-list color="transparent">
          <router-link v-for="item in categories" to="/admin">
            <v-list-item prepend-icon="mdi-view-dashboard" v-ripple :title="item.title"></v-list-item>
          </router-link>

        </v-list>
      </v-navigation-drawer>
      <v-main style="min-height: 100vh">
        <div class="py-7 px-7">
          <router-view></router-view>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import {GetCategories} from "../Services/CategoryService"

export default {
  data: () => ({
    drawer: false,
    categories: []
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
  mounted() {
    GetCategories().then(res => {
      if(res.status===200){
        this.categories=res.data;
      }
    })
  }
}
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
