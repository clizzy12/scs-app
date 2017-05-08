import Vue from 'vue'
import apollo from '../api'
import gql from 'graphql-tag'

export default {
  state: {
    list: []
  },
  actions: {
    GET_DIRECTORY: ({ commit, state }, department = '') => {
      if (state.all_directory && state.all_directory.length > 0) {
        commit('SET_DIRECTORY', { data: state.all_directory, department: department });
        Promise.resolve(state.list);
      }
      else {
        return apollo.query({
          query: gql`
            {
              directory {
                _id
                given_name
                family_name
                full_name
                positions {
                  title
                  department
                  room
                  building
                }
                relationship
                relationship_class
                relationship_desc
                research_areas
                scid
              }
            }
          `
        }).then((res,err) => {
          if (res) {
            commit('SET_DIRECTORY', { data: res.data, department: department })
            return res.data
          } else {
            Promise.reject(":err :directory graphql failed")
          }
        }).catch((err) => {
          console.error(err.locations)
          console.error(`GraphQL Error: ${err.message}`)
        });
      }
    }
  },
  mutations: {
    SET_DIRECTORY: (state, data) => {
      if (data.department) {
        let filtered_list = {};
        filtered_list = data.data.directory.filter(function(item){
          return item.positions.find(position => position.department === data.department);
        });

        state.list = filtered_list;
      }
      else {
        state.list = data.data.directory;
      }

      if (!state.all_directory) {
        state.all_directory = data.data;
      }
    }
  }
}
