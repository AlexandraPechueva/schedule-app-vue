<template>
  <div class="day-schedule">
     <modal-dialog @submitDialog="submitDialog" />

     <div class="icons-panel">
        <div class="icon"><md-icon>open_in_new</md-icon></div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field class="list">
              <!-- https://github.com/vuematerial/vue-material/issues/2285 console errors Cannot read property 'badInput' of undefined"-->
              <md-select v-model="currentTasksState" name="filter" id="filter" placeholder="Вид задачи" md-dense>
                <md-option v-for="(state,index) in taskStates" :key="index" :value="state">{{state}}</md-option>
              </md-select>
            </md-field>
          </div>
        </div>

        <div class="icon"><md-icon @click.native="addTask()">add</md-icon></div>
     </div>

    <div v-if="FILTERED_DAY_TASKS && FILTERED_DAY_TASKS.length" class="tasks">
      <div v-for="task in FILTERED_DAY_TASKS" :key="task.id"
        class="task animation"
        :class="{'passed-time': task.isPassed}">

          <p class="task-name">{{task.time}}</p>
          <p class="task-content">{{task.content}}</p>

          <md-icon @click.native="deleteTaskConfirm(task.id)">delete</md-icon>
        </div>
      </div>
 
     <p v-else class = "notice">В списке еще нет задач</p>
  </div>
</template>

<script>
 import {mapActions, mapGetters, mapMutations} from 'vuex';
 import ModalDialog from '@/components/ModalDialog.vue';

export default {
  name: 'day-schedule',
    data() {
      return {
        activatedDay: 0,
        taskStates: ['Все','Активные','Прошедшие'],
        taskToDelete: 0,
        newTask: null,
       }
    },
  components: {
    ModalDialog,
  },
  computed: {
      ...mapGetters([
        'ACTIVATED_DAY',
        'FILTERED_DAY_TASKS',
      ]),
      currentTasksState: {
        get () {
          return this.$store.getters['CURRENT_TASKS_STATE'];
        },
        set (value) {
          this.$store.commit('SET_CURRENT_TASKS_STATE', value);
        }
      },
    },
  methods: {
    ...mapActions([
      'GET_DAY_TASKS',
      'ADD_DAY_TASK',
      'DELETE_DAY_TASK',
    ]),

    ...mapMutations([
      'CHECK_IS_PASSED',
      'SET_SHOW_MODAL',
    ]),

    deleteTaskConfirm(taskId) {
       this.$store.commit('SET_SHOW_MODAL', 'delete-confirm');
       this.taskToDelete = taskId;
    },

    addTask() {
      this.$store.commit('SET_SHOW_MODAL', 'add-edit');
      this.newTask = this.makeNewTask();
    },

    makeNewTask() {
      return {
        id:Date.now(),
        time: '11:00',//data.time,
        content: 'mock task',//data.content,
        dayId: this.ACTIVATED_DAY,
        isPassed: this.isPassed('11:00'),//this.isPassed(data.time),
      }
    },

    submitDialog(data) {
      if (data === 'delete-confirm') {
        this.DELETE_DAY_TASK(this.taskToDelete);

        this.$store.dispatch('TOGGLE_SHOW_MODAL', '');
      }

      if (data === 'add-edit') {
        this.ADD_DAY_TASK(this.newTask);

        this.$store.dispatch('TOGGLE_SHOW_MODAL', '');
      }
    },

    isPassed(time) {
      const today = new Date();
      let currentDay = today.getDay() - 1;
      const timeParts = time.split(':');

      if (currentDay < 0) {
        currentDay = currentDay + 6;
      }

      if(this.ACTIVATED_DAY < currentDay) {
        return true;
      }
      else if (this.ACTIVATED_DAY === currentDay) {
        if (timeParts[0] === today.getHours().toString()) {
          return timeParts[0] < today.getMinutes().toString();
        }
        else {
          return timeParts[0] < today.getHours().toString();
        }
      }
      else {
        return false;
      }
    },
   },
  watch: {
    ACTIVATED_DAY() {
      this.GET_DAY_TASKS(this.ACTIVATED_DAY)
        .then(res => {
          if(res) {
            this.CHECK_IS_PASSED(this.isPassed);
          }
      });
    },
  },
}
</script>

<style lang="scss">
  @import '@/assets/styles/scss/mixins/_border.scss';

  .day-schedule {
    @include app-border();

    flex-grow:1;
    margin-right: 20px;

    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;
  }

  .icons-panel {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .icon :hover {
    cursor: pointer;
  }

  .tasks {
    display: flex;
    flex-direction: column;
    flex-basis: 0;
    flex-grow: 1;
  }

  .task {
  text-align: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  > * {
    margin-bottom: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .task-name {
    width: 20%;
  }

  .task-content {
    width: 80%;
    text-align: left;
  }
}

  .passed-time {
    > p {
      color: $warning-color;
    }
  }

  @keyframes AddRecords {
    0% {
      padding-left: 100px;
    }
    100% {
      padding-left: 0px;
    }
  }

  .animation {
    animation: AddRecords 400ms;
  }

  .list {
    margin-top: -24px;
  }
</style>
