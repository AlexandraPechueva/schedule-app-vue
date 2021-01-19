<template>
  <div class="day-schedule">
     <div class="icons-panel">
     </div>

    <div v-if="DAY_TASKS && DAY_TASKS.length" class="tasks">
      <div v-for="task in DAY_TASKS" :key="task.id" 
        class="task animation"
        :class="{'passed-time': task.isPassed}">
        
          <p class="task-name">{{task.time}}</p>
          <p class="task-content">{{task.content}}</p>

          <md-icon>delete</md-icon>
        </div>
      </div>
 
     <p v-else class = "notice">В списке еще нет задач</p>
  </div>
</template>

<script>
 import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  name: 'day-schedule',
    data() {
      return {
        activatedDay: 0,
      }
    },
  computed: {
      ...mapGetters([
        'DAY_TASKS',
        'ACTIVATED_DAY',
      ]),
    },
  methods: {
    ...mapActions([
      'GET_DAY_TASKS',
    ]),

     ...mapMutations(['CHECK_IS_PASSED']),

    isPassed(time) {
      const today = new Date();
      let currentDay = today.getDay() - 1;
      const currentTime = today.getHours() + ":" + today.getMinutes();

      if (currentDay < 0) {
        currentDay = currentDay + 6;
      }

      if(this.ACTIVATED_DAY < currentDay) {
        return true;
      }
      else if (this.ACTIVATED_DAY === currentDay) {
        return time < currentTime;
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
            this.CHECK_IS_PASSED(this.isPassed)
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
    height: 50px;
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
</style>
