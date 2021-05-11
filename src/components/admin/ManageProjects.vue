<template>
  <v-slide-y-transition hide-on-leave>
    <v-container fluid>
      <v-spacer></v-spacer>
      <v-row align="center" justify="center" class="ma-8">
        <div id="name">Manage Projects</div>
      </v-row>
      <v-spacer></v-spacer>
      <v-form class="ma-4">
        <v-text-field
          label="Name"
          v-model="project.name"
          single-line
          full-width
        ></v-text-field>
        <v-text-field
          label="Type"
          v-model="project.type"
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
          v-model="project.tags"
          label="Add tags"
          multiple
          tags
          chips
          deletable-chips
          :delimiters="[', ', ';', ' ']"
        ></v-combobox>
        <v-text-field
          label="Collection"
          v-model="project.collection"
          single-line
          full-width
        ></v-text-field>
        <v-text-field
          label="Description"
          v-model="project.description"
          single-line
          full-width
        ></v-text-field>
        <v-textarea
          v-model="project.content"
          label="Content"
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
          @click="createProject"
          >Create</v-btn
        >
      </v-row>
      <v-spacer></v-spacer>
    </v-container>
  </v-slide-y-transition>
</template>

<script lang="ts">
import Vue from "vue";
import { Project } from "@/types/project";
import db from "../../store/db";
import firebase from "firebase/app";

export default Vue.extend({
  name: "ManageProjects",
  data: () => ({
    project: {} as Project,
    date: new Date().toISOString().substr(0, 10),
    files: [],
    imageUrls: [] as any[],
  }),
  methods: {
    updatePreviews() {
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
    writeProject() {
      db.projects
        .add(this.project)
        .then(() => alert("Project created successfully!"))
        .catch((error) => {
          console.error("Error creating project: ", error);
        });
    },
    createProject() {
      (this.project.date = firebase.firestore.Timestamp.fromDate(
        new Date(this.date)
      )),
        // this.files.forEach((file) => {
        //   this.project.gallery.push(file);
        // });
        this.writeProject();
    },
  },
});
</script>
<style lang="scss" scoped>
#name {
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-size: xx-large;
}
</style>
