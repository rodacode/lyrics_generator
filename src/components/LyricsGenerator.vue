
<template>
  <div class="container">
    <h1 class="main_title">Lyrics Generator</h1>

    <div class="songStyle__container">
      <h4>Lyric Style</h4>
      <div class="styles__container">
        <div class="style__tag">
          <md-switch v-model="style" value="love">Love</md-switch>
        </div>
        <div class="style__tag">
          <md-switch v-model="style" value="positive">Positive Vibes</md-switch>
        </div>
        <div class="style__tag">
          <md-switch v-model="style" value="rasta">Rasta Love</md-switch>
        </div>
        <div class="style__tag">
          <md-switch v-model="style" value="anti">Anti System</md-switch>
        </div>
      </div>
    </div>
    <div class="input dedicated">
      <md-field>
        <label>Dedicated to/ About</label>
        <md-input v-model="dedicated"></md-input>
      </md-field>
    </div>
    <div class="input words_to_add">
      <md-field>
        <label>Words to add(Comma separated)</label>
        <md-input v-model="words_to_add"></md-input>
      </md-field>
    </div>
    <md-button @click="generate(style)" class="md-raised md-primary">Generate</md-button>
    <div v-if="show_lyric" class="lyric_generated">
      <div class="verse">
        <p v-for="verse in verse1" v-bind:key="verse.id">{{ verse }}</p>
      </div>
      <div class="verse chorus">
        <p>(CHORUS)</p>
        <p v-for="chorus_phrase in chorus" v-bind:key="chorus_phrase.id">{{ chorus_phrase }}</p>
      </div>
      <div class="verse">
        <p v-for="verse in verse2" v-bind:key="verse.id">{{ verse }}</p>
      </div>
      <div class="verse">
        <p v-for="verse in verse3" v-bind:key="verse.id">{{ verse }}</p>
      </div>
      <div class="verse chorus">
        <p>(CHORUS)</p>
        <p v-for="chorus_phrase in chorus" v-bind:key="chorus_phrase.id">{{ chorus_phrase }}</p>
      </div>
      <md-button @click="reset()" class="md-raised md-primary">Reset</md-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class LyricsGenerator extends Vue {
  @Prop() private msg!: string;
  dedicated: string = "";
  style: string = "";
  words_to_add: string = "";
  words_processed: string[] = [];
  final_lyrics: string[] = [];
  show_lyric: Boolean = false;
  love_lyrics: string[] = [
    "every time I see you",
    "believe me",
    "i follow you",
    "you are my light",
    "when you look at me",
    "my babe",
    "my Darling",
    "Oh!... please",
    "Let me be your light",
    "you and me",
    "my love",
    "The day I met you",
    "Remember, remember...",
    "Yor are so sweet",
    "let's take a fly",
    "forever my love",
    "you make me fly over the sky",
    "you are wonderful",
    "you are my love",
    "my soul, my love",
    "let me take you to the moon",
    "let me be your love",
    "let's have a party, right now",
    "mm nahnanah..."
  ];
  positive_lyrics: string[] = [
    "We are one",
    "Stronger than the sun",
    "Every time growing",
    "Life is beautiful",
    "You have the power",
    "We have the power",
    "Every thing is going to be alright",
    "keep calm and relax",
    "the best is coming",
    "you know is true",
    "positive, positive",
    "good vibes all around",
    "we gonna make it",
    "we have the power",
    "all in one",
    "we are one"
  ];
  rasta_lyrics: string[] = [
    "Rastafari",
    "Rasta love",
    "I and I",
    "This one",
    "Liste to this",
    "Selassie I",
    "Rastafari",
    "Oh Jah",
    "King of kings",
    "Babylon is falling",
    "Babylon is dying",
    "we gonna bring rasta love",
    "Jah will provide",
    "Jah is love",
    "Guidance",
    "Love and Unity",
    "Waddada means love",
    "Rasta Love",
    "Jah!!!",
    "Fire",
    "Love and unity",
    "Guidance",
    "Oh babylon is falling down, falling down",
    "Love and respect to the almighty",
    "I and I"
  ];
  anti_lyrics: string[] = [
    "We gonna bring them down",
    "Fuck the police",
    "Fuck the molds",
    "We have the power",
    "This system is burning",
    "The old rich manipulating your mind",
    "they want you soul",
    "they don't love",
    "the end is coming",
    "this system is killing me",
    "this system has to ends",
    "capitalism sucks you know",
    "we are in prison",
    "stay free, stay fighting",
    "they control your fears",
    "oh oh oh nerver more...never more",
    "we gonna stop them",
    "fuck you! fuck you!",
    "we are more than then",
    "we have the power",
    "they have fear",
    "is falling down"
  ];
  dedicated_phrase1: string = "";
  dedicated_phrase2: string = "";
  dedicated_phrase3: string = "";
  dedicated_phrase4: string = "";
  dedicated_phrase5: string = "";
  phrases_for_chorus: string[] = [];
  phrases_for_verse: string[] = [];
  chorus: string[] = [];
  verse1: string[] = [];
  verse2: string[] = [];
  verse3: string[] = [];

  dedicationPhrases(style: string) {
    if (style == "love") {
      this.dedicated_phrase1 = this.dedicated + " my love";
      this.dedicated_phrase2 =
        "Oooohh... " + this.dedicated + " you are my love";
      this.dedicated_phrase3 = "give me your hand";
      this.dedicated_phrase4 = "I miss you baby";
      this.dedicated_phrase5 =this.dedicated +  "!, you are the one";
      this.phrases_for_chorus.push(this.dedicated);
      this.phrases_for_chorus.push(this.dedicated_phrase1);
      this.phrases_for_chorus.push(this.dedicated_phrase2);
      this.phrases_for_chorus.push(this.dedicated_phrase3);
      this.phrases_for_chorus.push(this.dedicated_phrase4);
      this.phrases_for_chorus.push(this.dedicated_phrase5);

    }
    if (style == "positive") {
      this.dedicated_phrase1 = this.dedicated + " all together";
      this.dedicated_phrase2 = "oh lala " + this.dedicated + " yeah!";
      this.phrases_for_chorus.push(this.dedicated);
      this.phrases_for_chorus.push(this.dedicated_phrase1);
      this.phrases_for_chorus.push(this.dedicated_phrase2);
    }
    if (style == "rasta") {
      this.dedicated_phrase1 = this.dedicated + " and Jah Love";
      this.dedicated_phrase2 = "rasta love! " + this.dedicated + " jah!";
      this.phrases_for_chorus.push(this.dedicated);
      this.phrases_for_chorus.push(this.dedicated_phrase1);
      this.phrases_for_chorus.push(this.dedicated_phrase2);
    }
    if (style == "anti") {
      this.dedicated_phrase1 = this.dedicated + " we going to get you";
      this.dedicated_phrase2 =
        "Hey you! " + this.dedicated + " Your time has gone";
      this.phrases_for_chorus.push(this.dedicated);
      this.phrases_for_chorus.push(this.dedicated_phrase1);
      this.phrases_for_chorus.push(this.dedicated_phrase2);
    }
  }
  verseMaker(style: string) {
    this.words_processed = this.words_to_add.split(",");

    // ADD WORDS TO ADD TO THE PHRASES FOR VERSE ARRAY
    for (let i = 0; i < this.words_processed.length; i++) {
      this.phrases_for_verse.push(this.words_processed[i]);
    }
    switch (style) {
      case "love":
        this.phrases_for_verse = this.love_lyrics;
        break;
      case "positive":
        this.phrases_for_verse = this.positive_lyrics;
        break;
      case "rasta":
        this.phrases_for_verse = this.rasta_lyrics;
        break;
      case "anti":
        this.phrases_for_verse = this.anti_lyrics;
        break;
    }
    // ADD WORDS TO ADD TO THE VERSE ARRAY
    for (let i = 0; i < this.words_processed.length; i++) {
      this.phrases_for_verse.push(this.words_processed[i]);
    }
    for (let i = 0; i < 8; i++) {
      this.verse1.push(
        this.phrases_for_verse[
          Math.floor(Math.random() * this.phrases_for_verse.length)
        ]
      );
      this.verse2.push(
        this.phrases_for_verse[
          Math.floor(Math.random() * this.phrases_for_verse.length)
        ]
      );
      this.verse3.push(
        this.phrases_for_verse[
          Math.floor(Math.random() * this.phrases_for_verse.length)
        ]
      );
    }
  }
  chorusMaker(style: string) {
    for (let i = 0; i < 4; i++) {
      this.chorus.push(
        this.phrases_for_chorus[
          Math.floor(Math.random() * this.phrases_for_chorus.length)
        ]
      );
    }
  }
  generate(style: string) {
    this.dedicationPhrases(style);
    this.chorusMaker(style);
    this.verseMaker(style);
    this.show_lyric = true;
  }
  reset() {
    this.verse1 = [];
    this.verse2 = [];
    this.verse3 = [];
    this.chorus = [];
    this.phrases_for_verse = [];
    this.phrases_for_chorus = [];
    this.show_lyric = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container {
  max-width: 100%;
  height: 100%;
}
.songStyle__container {
  width: 100%;
  padding: 0 15px;
}
.main_title {
  text-align: center;
}

.styles__container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;
}
.style__tag {
  padding: 5px;
  border: 1px solid green;
  border-radius: 5px;
  margin: 5px;
}
.input {
  max-width: 300px;
  margin: 20px auto;
}
.verse {
  margin: 40px 0;
}
.chorus {
  color: green;
}
</style>
