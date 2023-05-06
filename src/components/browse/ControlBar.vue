<template>
  <v-slide-y-reverse-transition hide-on-leave>
    <v-row class="vo-control-bar">
      <v-col cols="10">
        <v-text-field
          class="d-flex"
          prepend-icon="fa-solid fa-magnifying-glass"
          v-model="tempSearchText"
          clearable
          outlined
          color="primary"
          label="Search"
          placeholder="Type your search..."
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
            <font-awesome-icon icon="fa-solid fa-grip-vertical" size="xl" />
          </v-btn>
          <v-btn>
            <font-awesome-icon icon="fa-solid fa-list" size="xl" />
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
