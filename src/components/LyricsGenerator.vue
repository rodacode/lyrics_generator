
<template>
  <div class='container'>
    <h1 class='main_title'>Lyrics Generator</h1>

    <div class='songStyle__container'>
      <h4>Lyric Style</h4>
      <div class='styles__container'>
        <div class='style__tag'>
          <md-switch v-model='style' value='love'>Love</md-switch>
        </div>
        <div class='style__tag'>
          <md-switch v-model='style' value='positive'>Positive Vibes</md-switch>
        </div>
        <div class='style__tag'>
          <md-switch v-model='style' value='rasta'>Rasta Love</md-switch>
        </div>
        <div class='style__tag'>
          <md-switch v-model='style' value='anti'>Anti System</md-switch>
        </div>
      </div>
    </div>
    <div class='input dedicated'>
      <md-field>
        <label>Dedicated to/ About</label>
        <md-input v-model='dedicated'></md-input>
      </md-field>
    </div>
    <div class='input words_to_add'>
      <md-field>
        <label>Words to add(Comma separated)</label>
        <md-input v-model='wordsToAdd'></md-input>
      </md-field>
    </div>
    <md-button @click='generate(style)' class='md-raised md-primary'>Generate</md-button>
    <div v-if='showLyric' class='lyric_generated'>
      <div class='verse'>
        <p v-for='verse in verse1' v-bind:key='verse.id'>{{ verse }}</p>
      </div>
      <div class='verse chorus'>
        <p>(CHORUS)</p>
        <p v-for='chorus_phrase in chorus' v-bind:key='chorus_phrase.id'>{{ chorus_phrase }}</p>
      </div>
      <div class='verse'>
        <p v-for='verse in verse2' v-bind:key='verse.id'>{{ verse }}</p>
      </div>
      <div class='verse'>
        <p v-for='verse in verse3' v-bind:key='verse.id'>{{ verse }}</p>
      </div>
      <div class='verse chorus'>
        <p>(CHORUS)</p>
        <p v-for='chorus_phrase in chorus' v-bind:key='chorus_phrase.id'>{{ chorus_phrase }}</p>
      </div>
      <md-button @click='reset()' class='md-raised md-primary'>Reset</md-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LyricsGenerator extends Vue {
  @Prop() private msg!: string;
  private dedicated: string = '';
  private style: string = '';
  private wordsToAdd: string = '';
  private wordsProcessed: string[] = [];
  private finalLyrics: string[] = [];
  private showLyric: Boolean = false;
  private loveLyrics: string[] = [
    'every time I see you',
    'believe me',
    'i follow you',
    'you are my light',
    'when you look at me',
    'my babe',
    'my Darling',
    'Oh!... please',
    'Let me be your light',
    'you and me',
    'my love',
    'The day I met you I will never forget',
    'my love!',
    'your eyes are my guide',
    'Remember, remember...',
    'Yor are so sweet',
    'let\'s take a fly',
    'forever my love',
    'you make me fly over the sky',
    'you are wonderful',
    'you are my love',
    'my soul, my love',
    'let me take you to the moon',
    'let me be your love',
    'let\'s have a party, right now',
    'mm nahnanah...',
  ];
  private positiveLyrics: string[] = [
    'We are one',
    'Stronger than the sun',
    'Every time growing',
    'Life is beautiful',
    'You have the power',
    'We have the power',
    'Everything is going to be alright',
    'keep calm and relax',
    'the best is coming',
    'you know is true',
    'we will make it',
    'positive, positive',
    'good vibes all around',
    'we gonna make it',
    'we have the power',
    'all in one',
    'we are one',
    'like birds in the sky',
    'let you soul fly',
  ];
  private rastaLyrics: string[] = [
    'Rastafari',
    'Rasta love',
    'I and I',
    'This one',
    'Liste to this',
    'Selassie I',
    'Rastafari',
    'Oh Jah',
    'King of kings',
    'Babylon is falling',
    'Babylon is dying',
    'we gonna bring rasta love',
    'Jah will provide',
    'Jah is love',
    'Guidance',
    'Love and Unity',
    'Waddada means love',
    'Rasta Love',
    'Jah!!!',
    'Fire',
    'Love and unity',
    'Guidance',
    'Oh babylon is falling down, falling down',
    'Love and respect to the almighty',
    'I and I',
  ];
  private antiLyrics: string[] = [
    'We gonna bring them down',
    'Fuck the police',
    'Fuck the molds',
    'We have the power',
    'This system is burning',
    'The old rich manipulating your mind',
    'they want you soul',
    'they don\'t love',
    'the end is coming',
    'this system is killing me',
    'this system has to ends',
    'capitalism sucks you know',
    'we are in prison',
    'stay free, stay fighting',
    'they control your fears',
    'oh oh oh nerver more...never more',
    'we gonna stop them',
    'fuck you! fuck you!',
    'we are more than then',
    'we have the power',
    'they have fear',
    'is falling down',
  ];
  private dedicatedPhrase1: string = '';
  private dedicatedPhrase2: string = '';
  private dedicatedPhrase3: string = '';
  private dedicatedPhrase4: string = '';
  private dedicatedPhrase5: string = '';
  private phrasesForChorus: string[] = [];
  private phrasesForVerse: string[] = [];
  private chorus: string[] = [];
  private verse1: string[] = [];
  private verse2: string[] = [];
  private verse3: string[] = [];

  private dedicationPhrases(style: string) {
    if (style === 'love') {
      this.dedicatedPhrase1 = this.dedicated + ' my love';
      this.dedicatedPhrase2 =
        'Oooohh... ' + this.dedicated + ' you are my love';
      this.dedicatedPhrase3 = 'give me your hand';
      this.dedicatedPhrase4 = 'I miss you baby';
      this.dedicatedPhrase5 = this.dedicated + '!, you are the one';
      this.phrasesForChorus.push(this.dedicated);
      this.phrasesForChorus.push(this.dedicatedPhrase1);
      this.phrasesForChorus.push(this.dedicatedPhrase2);
      this.phrasesForChorus.push(this.dedicatedPhrase3);
      this.phrasesForChorus.push(this.dedicatedPhrase4);
      this.phrasesForChorus.push(this.dedicatedPhrase5);
    }
    if (style === 'positive') {
      this.dedicatedPhrase1 = this.dedicated + ' all together';
      this.dedicatedPhrase2 = 'oh lala ' + this.dedicated + ' yeah!';
      this.phrasesForChorus.push(this.dedicated);
      this.phrasesForChorus.push(this.dedicatedPhrase1);
      this.phrasesForChorus.push(this.dedicatedPhrase2);
    }
    if (style === 'rasta') {
      this.dedicatedPhrase1 = this.dedicated + ' and Jah Love';
      this.dedicatedPhrase2 = 'rasta love! ' + this.dedicated + ' jah!';
      this.phrasesForChorus.push(this.dedicated);
      this.phrasesForChorus.push(this.dedicatedPhrase1);
      this.phrasesForChorus.push(this.dedicatedPhrase2);
    }
    if (style === 'anti') {
      this.dedicatedPhrase1 = this.dedicated + ' we going to get you';
      this.dedicatedPhrase2 =
        'Hey you! ' + this.dedicated + ' Your time has gone';
      this.phrasesForChorus.push(this.dedicated);
      this.phrasesForChorus.push(this.dedicatedPhrase1);
      this.phrasesForChorus.push(this.dedicatedPhrase2);
    }
  }
  private verseMaker(style: string) {
    this.wordsProcessed = this.wordsToAdd.split(',');

    // ADD WORDS TO ADD TO THE PHRASES FOR VERSE ARRAY
    for (let i = 0; i < this.wordsProcessed.length; i++) {
      this.phrasesForVerse.push(this.wordsProcessed[i]);
    }
    switch (style) {
      case 'love':
        this.phrasesForVerse = this.loveLyrics;
        break;
      case 'positive':
        this.phrasesForVerse = this.positiveLyrics;
        break;
      case 'rasta':
        this.phrasesForVerse = this.rastaLyrics;
        break;
      case 'anti':
        this.phrasesForVerse = this.antiLyrics;
        break;
    }
    // ADD WORDS TO ADD TO THE VERSE ARRAY
    for (let i = 0; i < this.wordsProcessed.length; i++) {
      this.phrasesForVerse.push(this.wordsProcessed[i]);
    }
    for (let i = 0; i < 8; i++) {
      this.verse1.push(
        this.phrasesForVerse[
          Math.floor(Math.random() * this.phrasesForVerse.length)
        ]
      );
      this.verse2.push(
        this.phrasesForVerse[
          Math.floor(Math.random() * this.phrasesForVerse.length)
        ]
      );
      this.verse3.push(
        this.phrasesForVerse[
          Math.floor(Math.random() * this.phrasesForVerse.length)
        ]
      );
    }
  }
  private chorusMaker(style: string) {
    for (let i = 0; i < 4; i++) {
      this.chorus.push(
        this.phrasesForChorus[
          Math.floor(Math.random() * this.phrasesForChorus.length)
        ]
      );
    }
  }
  private generate(style: string) {
    this.dedicationPhrases(style);
    this.chorusMaker(style);
    this.verseMaker(style);
    this.showLyric = true;
  }
  private reset() {
    this.verse1 = [];
    this.verse2 = [];
    this.verse3 = [];
    this.chorus = [];
    this.phrasesForVerse = [];
    this.phrasesForChorus = [];
    this.showLyric = false;
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
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
