<template>
  <section>
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <div class="news-view" >
      <transition name="fade" mode="out-in" v-if="loaded">
        <div>
          <figure class="news-header" :style="{ 'background-image': 'url(' + article.image + ')' }"></figure>
          <div class="content-container">
            <h1>{{article.title}}</h1>
            <h2>{{article.date | moment("dddd, MMMM Do YYYY")}}</h2>
            <article v-html="article.body" class="body"></article>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'

function fetchNews(store) {
  return store.dispatch('GET_NEWS_ARTICLE', store.state.route.params.article)
}

export default {
  name: 'news-view',

  preFetch: fetchNews,

  components: {
    Spinner
  },

  computed: {
    loaded() {
      let article = this.$route.params.article
      for (var uid in this.$store.state.news.articles)
        if(uid === article) return true
    },
    article(){
      let article = this.$route.params.article
      for (var uid in this.$store.state.news.articles)
        if(uid === article) return this.cleanHTML(this.$store.state.news.articles[uid])
    }
  },

  methods: {
    cleanHTML: function(data){
      return data
    }
  },

  beforeMount () {
    fetchNews(this.$store)
  }

}
</script>

<style lang="stylus">
@import '../assets/styles/content';
</style>

<style lang="stylus" scoped>
h1 {
  font-size: 2em;
}

.content-container {
  background: white;
  margin: 1em;
  padding: 3em 5em;
  display: block;
  z-index: 9;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  position: relative;
  top: 20.5em;
  margin-bottom: 20.5em;
}

.news-header {
  min-height: 36em;
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 100%;
  left: 0;
  top: -0.55em;
  margin: 0;
}

h2 {
  font-size: 1.2em;
  margin: 0;
  border-bottom: 1px solid #C41230;
  padding-bottom: .6em;
  font-weight: 300;
  position: relative;
  &:after {
    content: " ";
    display: block;
    width: 2em;
    height: 2px;
    position: absolute;
    bottom: -2px;
    background: rgb(196, 18, 48);
  }
}
</style>
