<template>
  <div>
    <div>
      <v-form @submit="sendComment" ref="form">
        <v-textarea
            v-model="commentText"
            label="نظر خود را وارد کنید" :rules="[v=>!!v||'نظر را وارد کنید']" required></v-textarea>
        <c-submit>ثبت نظر</c-submit>
        <br/>
        <br/>
      </v-form>
    </div>
    <div v-if="comments.length>=1">
      <div class="pa-2 elevation-2" v-for="item in comments">
        <h4>{{ item.userFullName }}
          <small>{{ new Date(item.creationDate).toLocaleDateString('fa-IR') }}</small>
        </h4>
        <p class="pr-4 text-pre-wrap">{{ item.text }}</p>
      </div>
    </div>

    <v-alert
        v-else
        border
    >
      برای این مقاله نظری ثبت نشده است
    </v-alert>

  </div>
</template>

<script setup>
import CSubmit from "@/components/CSubmit";
import {onMounted, ref, toRef} from "vue";
import {deleteComment, addComment, getComments} from "@/services/CommentService"
import {useToast} from "vue-toastification";
import {useStore} from "vuex";

const toast = useToast();
const store = useStore();

const form = ref(null);
const props = defineProps(['postId']);
const postId = toRef(props, 'postId')
const comments = ref([]);
const commentText = ref("");
const sendComment = async () => {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("اطلاعات نامعتبر است")
    return;
  }
  store.commit("setLoading", true);

  addComment({text: commentText.value, postId: postId.value, userId: 1}).then((res) => {
    if (res.status === 200) {
      toast.success("عملیات با موفقیت انجام شد")
      getPostComment();
    } else {
      toast.error("عملیات ناموفق")
    }
  }).finally(() => {
    store.commit("setLoading", false);

  })
}
const getPostComment = () => {
  getComments(postId.value).then(res => {
    if (res.status === 200) {
      comments.value = res.data;
    }
  })
}
onMounted(() => {
  getPostComment();
})
</script>

<style scoped>

</style>
