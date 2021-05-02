<template>
  <v-slide-y-transition>
    <v-card id="details-container" class="ma-8" outlined>
      <v-row>
        <v-col>
          <v-img src="..\assets\img\profile.jpg"
            ><div class="fill-height bottom-gradient"></div
          ></v-img>
        </v-col>
        <v-col>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="mb-1">
                Francisco Maranchello
              </v-list-item-title>
              <v-list-item-subtitle>About Me</v-list-item-subtitle>
              <v-list-item-content>
                <span style="white-space: pre-wrap">{{ description }}</span>
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn outlined rounded text @click="goHome"> Back </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-slide-y-transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "About",
  data: () => ({
    description:
      "As an Architect that codes, I have broadened my skill set through a passion for technology and innovation. I believe technology is the future of architecture and the built world. \n\nAlways learning and leveraging cutting-edge technologies to seek new answers, I bring a holistic approach when facing new challenges. \n\nI'm currently involved in BIM, software and architecture products, projects, and implementations across scales, from design automation to full-fledged apps in several countries. \n\nI like to participate in every part of the business and design process, having a broad background and interests. I'm passionate about design & technology, especially finding common ground between the two. \n\nOther interests of mine include photography, investing, traveling and skiing.",
  }),
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
});
</script>
