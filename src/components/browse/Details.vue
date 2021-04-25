<template>
  <div>
    <p>The selected project is: {{ project.name }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Details",
  props: {
    project: Object,
  },
});
</script>
