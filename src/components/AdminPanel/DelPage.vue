<template>
  <div class="del-section" >
    <div class="del-section__header">
      <div v-if="$store.state.role==='super.admin'">
        <span v-text="'Институты'" />
        <img src="@/assets/add.svg" style="margin-left: 10px" class="add-form__iconadd" v-b-modal="'modal-inst'" width="24px">
      </div>
      <div v-else>
        <span v-text="'Направления'" />
        <img src="@/assets/add.svg" style="margin-left: 10px" class="add-form__iconadd" v-b-modal="'modal-dir'">
      </div>
    </div>
    <!-- Modals -->
    <b-modal id="modal-inst" 
            size="lg"
            title="Создание института" 
            cancel-title="Отмена"
            header-class="header-preview"
            centered
            content-class="modal-add"
            ok-title="Создать"
            @ok="addInst()"
          >
          <b-form-input v-model="modalAddInstitute" placeholder="Введите новое название института" required/>
    </b-modal>
    <b-modal id="modal-dir" 
            size="lg"
            title="Создание направления" 
            cancel-title="Отмена"
            header-class="header-preview"
            centered
            content-class="modal-add"
            ok-title="Создать"
            @ok="addDir()"
          >
            <b-form-input v-model="modalAddDirection" placeholder="Введите новое название направления" required/>
    </b-modal>
    <b-modal id="modal-prof" 
            size="lg"
            title="Создание профиля" 
            cancel-title="Отмена"
            header-class="header-preview"
            centered
            content-class="modal-add"
            ok-title="Создать"
            @ok="addProf()"
          >
          <b-form-input v-model="modalAddProfile" placeholder="Введите новое название профиля" required/>
         </b-modal>
    <b-modal id="modal-del-inst" 
            size="xl"
            cancel-title="Отмена"
            header-class="header-preview"
            centered
            content-class="modal-delete"
            ok-title="Удалить"
            @ok="deleteInstitute()"
          >
          <div class="delete-modal-body"> Вы действительно хотите удалить институт {{selectedInstitute ? selectedInstitute.name : null}}?</div>
    </b-modal>
    <b-modal id="modal-del-direction" 
            size="xl"
            cancel-title="Отмена"
            header-class="header-preview"
            centered
            content-class="modal-delete"
            ok-title="Удалить"
            @ok="deleteDirection()"
          >
          <div class="delete-modal-body"> Вы действительно хотите удалить направление {{selectedDirection ? selectedDirection.name : null}}?</div>
    </b-modal>
    <b-modal id="modal-del-profile" 
            size="xl"
            cancel-title="Отмена"
            header-class="header-preview"
            centered
            content-class="modal-delete"
            ok-title="Удалить"
            @ok="deleteProfile()"
          >
          <div class="delete-modal-body"> Вы действительно хотите удалить профиль {{selectedProfile ? selectedProfile.name : null}}?</div>
    </b-modal>
    <!-- Accordion SuperAdmin -->
    <div v-if="$store.state.role === 'super.admin'">
      <div class="accordion" role="tablist" v-for="inst in institutes" :key="inst.id">
          <div block v-b-toggle="`accordion-inst${inst.id}`" class="accordion-item">
            <span>{{inst.name}}</span>
            <div style="display: flex">
              <span v-b-modal="'modal-del-inst'" @click="selectedInstitute=inst" class="accordion-delete-label"> <img src="@/assets/delete.svg"  style="margin-right: 12px"> Удалить</span>
              <span class="accordion-chevron"> <img v-if="inst.directions" src="@/assets/chevron.svg" /> </span> 
            </div>
          </div>
          <b-collapse v-if="inst.directions" :id="`accordion-inst${inst.id}`" role="tabpanel">
              <div v-for="dir in inst.directions" :key="dir.id">
                <div block v-b-toggle="`accordion-dir${dir.id}`" class="accordion-item accordion-subitem" >
                  <span>{{dir.name}}</span>
                  <div style="display: flex">
                    <span v-b-modal="'modal-del-direction'" @click="selectedDirection=dir" class="accordion-delete-label"> <img src="@/assets/delete.svg" style="margin-right: 12px"> Удалить</span>
                    <span class="accordion-chevron"> <img v-if="dir.profiles" src="@/assets/chevron.svg" /> </span>
                  </div>
                </div>
                <b-collapse v-if="dir.profiles" :id="`accordion-dir${dir.id}`" role="tabpanel">
                    <div no-body v-for="prof in dir.profiles" :key="prof.id" >
                        <div block v-b-toggle="`accordion-prof${prof.id}`" class="accordion-item accordion-sub-subitem">
                          <span>{{prof.name}}</span>
                          <div style="display: flex">
                            <span v-b-modal="'modal-del-profile'" @click="selectedProfile=prof" class="accordion-delete-label"> <img src="@/assets/delete.svg"  style="margin-right: 12px"> Удалить</span>
                            <span class="accordion-chevron"/>
                          </div>
                        </div>
                    </div>
                </b-collapse>
              </div>
          </b-collapse>
      </div>
    </div>
    <!-- Accordion Admin institute -->
    <div v-else class="accordion" role="tablist" v-for="dir in directionListByInst" :key="dir.id">
        <div class="add-dir" v-b-modal="'modal-prof'" @click="setDirectionItem(dir)"/>
        <div block v-b-toggle="`accordion-dir${dir.id}`" class="accordion-item accordion-subitem" >
          <span>{{dir.name}}</span>
          <div style="display: flex">
            <span v-b-modal="'modal-del-direction'" @click="selectedDirection=dir" class="accordion-delete-label"> <img src="@/assets/delete.svg" style="margin-right: 12px"> Удалить</span>
            <span class="accordion-chevron"> <img  v-if="dir.profiles" src="@/assets/chevron.svg" /> </span> 
          </div>
        </div>
        <b-collapse v-if="dir.profiles" :id="`accordion-dir${dir.id}`" role="tabpanel">
            <div no-body v-for="prof in dir.profiles" :key="prof.id" >
                <div block v-b-toggle="`accordion-prof${prof.id}`" class="accordion-item accordion-sub-subitem">
                  <span>{{prof.name}}</span>
                  <div style="display: flex">
                    <span v-b-modal="'modal-del-profile'" @click="selectedProfile=prof" class="accordion-delete-label"><img src="@/assets/delete.svg"  style="margin-right: 12px"> Удалить</span>
                    <span class="accordion-chevron"/> 
                  </div>
                </div>
            </div>
        </b-collapse>

    </div>
  </div>
</template>

<script>
import api from "../../services/api";

export default {
  name: "DelPage",
  data () {
    return {
      delValueInst: '',
      delValueProfile: '',
      delValueDirect: '',

      modalAddInstitute: '',
      modalAddDirection: '',
      modalAddProfile: '',

      selectedInstitute: null,
      selectedDirection: null,
      selectedProfile: null,

      sectorList: [],

      instituteList: [],
      directionList: [],
      profileList: [],

      addDirectionItem: null,
    }
  },
  computed: {
    institutes () {
      return this.$store.state.institutes
    },
    directionListByInst () {
      if (this.$store.state.adminInstituteId) {
        return this.institutes.find((inst) => inst.id === this.$store.state.adminInstituteId).directions
      }
      return []
    }
  },
  methods: {
    setDirectionItem(profile) {
      this.addDirectionItem = profile;
    },
    deleteInstitute() {
      api.deleteInstituteFromApi(this.selectedInstitute.id)
    },
    deleteDirection() {
      api.deleteDirectionFromApi(this.selectedDirection.id)
      this.directionList.find(item => {
        if (item.id === this.selectedDirection.id){
          this.directionList.indexOf(item, 1)
        }
      })
    },
    deleteProfile() {
      api.deleteProfileFromApi(this.selectedProfile.id)
      this.profileList.find(item => {
        if (item.id === this.selectedProfile.id){
          this.profileList.indexOf(item, 1)
        }
      })
    },
    getAllDataFromApi() {
      // get institutes
      api.getInstitutesFromApi().then(data => {
        this.instituteList = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })

      // get directions
      api.getDirectionsFromApi().then(data => {
        this.directionList = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })


      // get profiles
      api.getProfilesFromApi().then(data => {
        this.profileList = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })
    },

    async addInst() {
      const data = {
        institute: {
          name: this.modalAddInstitute
        }
      }
      await api.postSectorsToApi(data)
      this.getAllDataFromApi()
      this.modalAddInstitute = ''

    },
    async addDir() {
      const data = {
        direction: {
          name: this.modalAddDirection
        },
        institute: {
          id: this.$store.state.adminInstituteId,
        }
      }
      await api.postSectorsToApi(data)
      this.getAllDataFromApi()
      this.modalAddDirection = ''
    },
    async addProf() {
      const data = {
        direction: {
          id: this.addDirectionItem.id,
        },
        institute: {
          id: this.$store.state.adminInstituteId,
        },
        profile: {
          name: this.modalAddProfile
        }
      }
      await api.postSectorsToApi(data)
      this.getAllDataFromApi()
      this.modalAddProfile = ''

    },
  },
  mounted() {
    this.getAllDataFromApi();
  }
}
</script>

<style scoped lang="scss">
.form-control{
  margin-bottom: 15px;
}
.del-section {
  &__header {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    text-align: center;
    padding: 20px;
  }
}
.del-form {
  margin-bottom: 30px;
}

.selects-row__item {
  margin-bottom: 10px;
}

.delete-modal-body {
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
}
.add-dir {
  position: relative;
  &::after {
    content: url('../../assets/add.svg');
    cursor: pointer;
    width: 20px;
    position: absolute;
    right: -30px;
    height: 20px;
    top: 30px;
  }
}
</style>
