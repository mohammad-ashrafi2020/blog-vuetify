<template>
  <v-card>
<!--    <div class="search">-->
<!--      <div class="content">-->
<!--        <v-text-field label="جستوجو"/>-->
<!--        <v-btn>جسجو کن</v-btn>-->
<!--      </div>-->
<!--    </div>-->
    <v-layout>
      <v-app-bar
          color="primary"
          prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link to="/">کدیاد بلاگ</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify" @click="search"></v-btn>
        <v-text-field v-model="searchValue" type="search" class="mt-10" label="جستوجو" @keydown.enter="search"/>

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
          <router-link v-for="item in categories" :to="`search?categorySlug=${item.slug}`">
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
import {GetCategories} from "@/services/CategoryService"

export default {
  data: () => ({
    drawer: false,
    categories: [],
    searchValue:""
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
  methods:{
    search(){
      this.$router.push({path:"/search",query:{q:this.searchValue}})
    }
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
