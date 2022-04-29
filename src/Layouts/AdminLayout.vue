<template>
  <v-card>
    <v-layout>
      <v-app-bar
          color="primary"
          prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify"></v-btn>

        <v-btn variant="text" icon="mdi-filter"></v-btn>

        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          bottom
          theme="dark"
          position="right"
          permanent
      >
        <v-list color="transparent">
          <router-link to="/admin">
            <v-list-item prepend-icon="mdi-view-dashboard" v-ripple title="Dashboard"></v-list-item>
          </router-link>
          <router-link to="/admin/users">
            <v-list-item prepend-icon="mdi-account-box" title="مدیریت کاربران"></v-list-item>
          </router-link>
          <router-link to="/admin/categories">
            <v-list-item prepend-icon="mdi-card-outline" title="دسته بندی ها"></v-list-item>
          </router-link>
          <router-link to="/admin/posts">
            <v-list-item prepend-icon="mdi-file-outline" title="مدیریت پست ها"></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <div class="py-7 px-7">
          <router-view></router-view>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
