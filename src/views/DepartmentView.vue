<template>
  <section class="department-view">
    <spinner class="spinner" v-if="!loaded" key="spinner"></spinner>
    <transition name="fade" mode="out-in" v-if="loaded" >
      <div>
        <figure class="department-header" :style="{ 'background-image': 'url(' + department.mainimg + ')' }"></figure>
        <div class="content-container">
          <img class="logo" :src="department.logo" />
          <h1>{{department.name}}</h1>
          <p>{{department.description}}</p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { router } from '../app'
import CourseListView from '../views/CourseListView.vue'

function fetchDepartment(store) {
  return store.dispatch('GET_DEPARTMENT_LIST')
    .then(() => {
      let departmentArray = ['compbio', 'csd',  'hcii', 'lti', 'mld', 'ri', 'isr', 'deans_office']
      /*
        temp dep array
        WIP: ping the collection with department codes to verify department
        let isDepartment = store.state.department.list.some((n) => n._id === store.state.route.params.department)
      */
      let isDepartment = departmentArray.some((n) => n == store.state.route.params.department)
      isDepartment
        ? getDeparmentData(store)
        : router.push('/')
    })
}



function getDeparmentData(store){
  return store.dispatch('GET_DEPARTMENT', store.state.route.params.department)
}

export default {
  name: 'department-view',

  preFetch: fetchDepartment,

  components: {
    Spinner,
    CourseListView
  },

  computed: {
    loaded() {
      return this.$store.state.department.department[this.$route.params.department] ? true : false
    },
    department(){
      return this.$store.state.department.department[this.$route.params.department]
    }
  },

  beforeMount () {
    fetchDepartment(this.$store)
  }

}
</script>

<style lang="stylus" scoped>
h1 {
  font-size 2em
}

.content-container {
  background white;
  margin 1em
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

.logo{
  background: white;
  max-width: 8em;
  top: 2em;
  left: -4em;
  position: absolute;
  border: 1px solid #eee;
}

.department-header {
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
    background rgb(196, 18, 48);
  }
}
</style>
