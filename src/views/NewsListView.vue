<template>
  <section>
    <div class="news-view">
      <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
      <transition name="fade" mode="out-in" v-if="loaded">
        <section class="page">
          <div class="card-holder">
            <div class="card" :style="{ 'background-image': 'url(' + news_item.image + ')' }" v-for="news_item in news" :key="news_item.uid">
              <router-link  :to="'/news/' + news_item.uid">
                <div class="content">
                  <h2>{{news_item.date | moment("dddd, MMMM Do YYYY")}}</h2>
                  <h3>{{news_item.title}}</h3>
                 </div>
              </router-link>
            </div>
          </div>
        </section>
      </transition>
    </div>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'

function fetchNewsList(store) {
  return store.dispatch('GET_NEWS_LIST')
}

export default {
  name: 'news-list-view',

  preFetch: fetchNewsList,

  components: {
    Spinner
  },

  computed: {
    loaded() {
      return this.$store.state.news.list.length > 0 ? true : false
    },
    news() {
      return this.$store.state.news.list
    }
  },

  beforeMount () {
    fetchNewsList(this.$store)
  }
}
</script>

<style lang="stylus" scoped>
.card-holder {
  display: flex;
  flex-wrap: row wrap;
  flex-flow: row wrap;
  width: calc(100% + 2vw);
  position: relative;
  left: -1vw;
  /*h1 {
    font-size: 1em;
    a {
      text-decoration: none;
    }
  }*/
  p {
    font-size: .8em;
    em {
      color: #C41230;
    }
  }
}

.card {
  position: relative;
  background-position: center;
  background-size: cover;
  flex: 1;
  padding: 2vw;
  transition: .4s all;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1vw;
  position: relative;
  z-index: 1;
  a {
    z-index: 9;
    text-decoration: none;
  }
  .content {
    padding: 2vw;
    min-width: 19em;
    display: block;
    background: white;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  }
  aside {
    display: block;
    vertical-align: center;
    border-top: 1px solid #C41230;
  }
  &:after {
    display: block;
    background: rgba(255, 255, 255, 0);
    width: 100%;
    height: 100%;
    content: ' ';
    position: absolute;
    transition: .4s background;
  }
  &:hover {
    background: white;
    background-position: center;
    background-size: cover;
    transition: .4s all;
    &:after {
      transition: .4s background;
      background: rgba(255, 255, 255, 0.6);
    }
  }
  h2 {
    font-size: .8em;
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
  h3 {
    font-size: 1.5em;
    margin-bottom: .4em;
    font-weight: 300;
  }
  p {
    font-size: .85em;
    margin-top: 1em;
  }
}
</style>
