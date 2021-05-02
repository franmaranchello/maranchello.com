<template>
  <v-slide-y-reverse-transition>
    <v-row class="vo-control-bar">
      <v-col cols="10">
        <v-text-field
          class="d-flex"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          v-model="tempSearchText"
          clearable
        ></v-text-field>
      </v-col>
      <v-spacer />
      <v-col>
        <v-btn-toggle
          mandatory
          v-model="tempDisplayToggle"
          class="vo-toggle-buttons"
        >
          <v-btn>
            <v-icon>mdi-view-grid</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-view-list</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-slide-y-reverse-transition>
</template>
<script lang="ts">
import { Vue, Component, PropSync } from "vue-property-decorator";
@Component({
  name: "ControlBar",
})
export default class ControlBar extends Vue {
  @PropSync("searchText", { type: String }) tempSearchText!: string;
  @PropSync("displayToggle", { type: Number }) tempDisplayToggle!: number;
}
</script>
