<template>
  <Index />
</template>

<script lang="ts">
import Vue from 'vue';
import Index from './components/Index.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Index,
  },
});
</script>
