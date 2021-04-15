<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list
      nav
      dense
    >
      <v-list-item-group
        v-model="group"
        active-class="text--accent-4"
      >
        <v-list-item
          @click="onListClick(item)"
          v-for="(item, index) in listItems"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <component :is="currentComponent"></component>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VisionOCR from './VisonOCR.vue';

@Component({
  components: {
    VisionOCR
  }
})
export default class Index extends Vue {
  drawer = true;
  group = null;
  listItems = [
    { component: 'VisionOCR', title: '光学式文字認識（OCR）' },
    { component: '', title: 'クロップヒント検出' },
    { component: '', title: '顔検出' }
  ];
  title = '';
  currentComponent = '';

  onListClick(item: any) {
    this.title = item.title;
    this.currentComponent = item.component;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
