<template>
  <div class="home">
    <LyricsGenerator/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LyricsGenerator from '@/components/LyricsGenerator.vue'; // @ is an alias to /src

@Component({
  components: {
    LyricsGenerator,
  },
})
export default class Home extends Vue {}
</script>
