import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state () {
    return {
      isAdmin: true,

      markdown: '',
      selectedSector: null,
      title: null,
      sectorList: [],

      institutes: [],

      isAuth: false,
      role: null,
      token: null,
      login: null,
      adminInstituteId: null,

      adminList: [],
      superAdminList: [],
    }
  },
  mutations: {
    SET_INSTITUTES_TO_STATE: (state, institutes) => {
      state.institutes = institutes
    },
    SET_MARKDOWN_TO_STATE: (state, markdown) => {
      state.markdown = markdown
    },
    SET_SECTOR_TO_STATE: (state, selectedSector) => {
      state.selectedSector = selectedSector
    },
    SET_TITLE_TO_STATE: (state, title) => {
      state.title = title
    },
    SET_SECTORLIST_TO_STATE: (state, sectorList) => {
      state.sectorList = sectorList
    },

    // Auth
    SET_AUTH_TO_STATE: (state, value) => {
      state.isAuth = value
    },
    SET_ROLE_TO_STATE: (state, role) => {
      state.role = role
    },
    SET_TOKEN_TO_STATE: (state, token) => {
      state.token = token
    },
    SET_LOGIN_TO_STATE: (state, login) => {
      state.login = login
    },
    SET_INSTITUTEID_TO_STATE: (state, adminInstituteId) => {
      state.adminInstituteId = adminInstituteId
    },

    // Admins
    SET_ADMINS_TO_STATE: (state, adminList) => {
      state.adminList = adminList
    },
    SET_SUPERADMINS_TO_STATE: (state, superAdminList) => {
      state.superAdminList = superAdminList
    },
  },
  actions: {
    changeMarkdown: ({commit}, markdown) => {
      commit('SET_MARKDOWN_TO_STATE', markdown)
    },
    changeselectedSector: ({commit}, selectedSector) => {
      commit('SET_SECTOR_TO_STATE', selectedSector)
    },
    changeTitle: ({commit}, title) => {
      commit('SET_TITLE_TO_STATE', title)
    },
    changeInstitutes: ({commit}, institutes) => {
      commit('SET_INSTITUTES_TO_STATE', institutes)
    },
    fetchSectors: ({commit}, sectors) => {
      commit('SET_SECTORLIST_TO_STATE', sectors)
    },

    // Auth
    changeIsAuth: ({commit}, isAuth) => {
      commit('SET_AUTH_TO_STATE', isAuth)
    },
    changeRole: ({commit}, role) => {
      commit('SET_ROLE_TO_STATE', role)
    },
    changeToken: ({commit}, token) => {
      commit('SET_TOKEN_TO_STATE', token)
    },
    changeLogin: ({commit}, login) => {
      commit('SET_LOGIN_TO_STATE', login)
    },
    changeInstituteId: ({commit}, adminInstituteId) => {
      commit('SET_INSTITUTEID_TO_STATE', adminInstituteId)
    },
    signOut: ({commit}) => {
      commit('SET_TOKEN_TO_STATE', null)
      commit('SET_ROLE_TO_STATE', null)
      commit('SET_AUTH_TO_STATE', null)
      commit('SET_INSTITUTEID_TO_STATE', null)
      localStorage.clear();
    },

    // Admins
    changeAdminList: ({commit}, adminList) => {
      commit('SET_ADMINS_TO_STATE', adminList)
    },
    changeSuperAdminList: ({commit}, superAdminList) => {
      commit('SET_SUPERADMINS_TO_STATE', superAdminList)
    },
  }
})