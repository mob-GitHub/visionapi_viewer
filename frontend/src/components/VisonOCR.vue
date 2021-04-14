<template>
  <v-app
    class="ma-5"
  >
    <v-form
      ref="form"
      lazy-validation
    >
      <v-file-input
        outlined
        label="画像ファイルを選択してください。"
        required
        @change="fileUpload"
      ></v-file-input>
      <v-btn
        color="success"
        @click="onAnalyzeClick"
      >
        解析する
      </v-btn>
    </v-form>
    <v-img
      :src="imageSource"
      max-width="500"
      class="mt-5"
    ></v-img>
    <v-textarea
      class="mt-5"
      :value="apiResult"
      outlined
    ></v-textarea>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class VisionOCR extends Vue {
  // ファイルサイズ上限（5MB）
  FILE_SIZE_LIMIT = 5000000;

  imageSource: string | ArrayBuffer = '';
  apiResult = '';

  async fileUpload(file: File) {
    if (this.checkFile(file)) {
      const encodedImage = await this.encodeBase64(file);
      this.imageSource = encodedImage;
    }
  }

  checkFile(file: File): boolean {
    if (!file) {
      return false;
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      return false;
    }

    if (file.size > this.FILE_SIZE_LIMIT) {
      return false;
    }

    return true;
  }

  encodeBase64(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result != null ? reader.result : '');
      reader.onerror = error => reject(error);
    });
  }

  async onAnalyzeClick() {
    const params = {
      encodedImage: this.imageSource
    };

    try {
      const apiResult = await axios.post('http://localhost:3000/visionapi', params);
      this.apiResult = apiResult.data.responses[0].textAnnotations[0].description;
    } catch (e) {
      this.apiResult = 'API Failed.';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
