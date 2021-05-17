<template>
  <v-slide-y-transition hide-on-leave>
    <v-container fluid>
      <v-spacer></v-spacer>
      <v-row align="center" justify="center" class="ma-8">
        <div id="name">Manage Posts</div>
      </v-row>
      <v-spacer></v-spacer>
      <v-form class="ma-4">
        <v-text-field
          label="Name"
          v-model="post.name"
          single-line
          full-width
        ></v-text-field>
        <v-date-picker
          label="Date"
          v-model="date"
          full-width
          landscape
        ></v-date-picker>
        <v-combobox
          v-model="post.tags"
          label="Add tags"
          multiple
          tags
          chips
          deletable-chips
          :delimiters="[', ', ';', ' ']"
        ></v-combobox>
        <v-text-field
          label="Description"
          v-model="post.description"
          single-line
          full-width
        ></v-text-field>
        <tiptap-vuetify
          v-model="post.content"
          :extensions="extensions"
          :toolbar-attributes="toolbarAttrs"
        />
        <v-textarea
          v-model="post.content"
          label="Content output"
          counter
          full-width
        ></v-textarea>
        <v-file-input
          accept="image/*"
          label="Upload images"
          counter
          multiple
          show-size
          truncate-length="15"
          v-model="files"
          @change="updatePreviews"
        ></v-file-input>
        <v-carousel
          :src="imageUrls[0]"
          v-if="imageUrls && imageUrls.length > 0"
        >
          <v-carousel-item
            v-for="(item, i) in imageUrls"
            :key="i"
            :src="item"
          />
        </v-carousel>
      </v-form>
      <v-row align="center" justify="center">
        <v-btn
          outlined
          class="ma-8"
          width="100"
          color="primary"
          :loading="isLoading"
          @click="createPost"
          >Create</v-btn
        >
      </v-row>
      <v-spacer></v-spacer>
    </v-container>
  </v-slide-y-transition>
</template>

<script lang="ts">
import Vue from "vue";
import { Post } from "@/types/post";
import db from "../../store/db";
import firebase from "firebase/app";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default Vue.extend({
  name: "ManagePosts",
  components: { TiptapVuetify },
  data: () => ({
    post: {} as Post,
    date: new Date().toISOString().substr(0, 10),
    files: [] as File[],
    imageUrls: [] as any[],
    isLoading: false,
    extensions: [
      History,
      Blockquote,
      Underline,
      Strike,
      Italic,
      ListItem,
      Link,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
  }),
  computed: {
    toolbarAttrs(): unknown {
      return this.$vuetify.theme.dark
        ? { color: "black", dark: true }
        : { color: "white", dark: false };
    },
  },
  methods: {
    sortFiles() {
      this.files.sort((a, b) =>
        a.name.localeCompare(
          b.name,
          navigator.languages[0] || navigator.language,
          { numeric: true, ignorePunctuation: true }
        )
      );
    },
    updatePreviews() {
      this.sortFiles();
      this.imageUrls = [];
      this.files.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", () => {
          if (!this.imageUrls.includes(fileReader.result))
            this.imageUrls.push(fileReader.result);
        });
      });
    },
    createPost() {
      this.isLoading = true;
      let key = "";
      this.post.date = firebase.firestore.Timestamp.fromDate(
        new Date(this.date)
      );
      this.post.gallery = [];
      db.posts
        .add(this.post)
        .then((data) => {
          key = data.id;
          return key;
        })
        .then((key) => {
          this.sortFiles();
          this.files.forEach((file) => {
            firebase
              .storage()
              .ref(`post-assets/${key}/${file.name}`)
              .put(file)
              .then((upload) => {
                upload.ref.getDownloadURL().then(async (url) => {
                  console.log("pushing url: ", url);
                  await db.posts.doc(key).update({
                    gallery: firebase.firestore.FieldValue.arrayUnion(url),
                  });
                });
              });
          });
        })
        .then(() => {
          this.isLoading = false;
          alert("Post created successfully!");
        })
        .catch((error) => {
          console.error("Error creating post: ", error);
        });
    },
  },
});
</script>
<style lang="scss" scoped>
#name {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: xx-large;
}
</style>
