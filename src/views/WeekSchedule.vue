<template>
  <div class="schedule-container">
     <h1 class="title">Список задач</h1>
       <div class="form-container">
         <!-- day component -->

          <div class="days">
            <p v-for="day in WEEKDAYS" :key="day.id" class="day">
              {{ day.shortName }}
            </p>
          </div>
       </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'week-schedule',
  computed: {
    ...mapGetters(['WEEKDAYS']),
  },
  methods: {
    ...mapActions([
      'GET_WEEKDAYS',
    ]),
  },

  mounted() {
    this.GET_WEEKDAYS()
      .then(res => {
        if(res) {
          console.log(res.data);
        }
      });
    },
  }
</script>

<style lang="scss">
@import '@/assets/styles/scss/mixins/_border.scss';

  .schedule-container {
    background-color: $app-background-color;
    margin: 80px auto;
    padding: 80px 50px;
    width: 85%;
    max-width: 768px;

    @media screen and (max-width: 767px) {
      width: 100%;
      padding: 80px 20px;
    }
}

.title {
  color: $title-color;
  text-align: center;
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: normal;
}

.form-container {
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 459px) {
    flex-direction: column;
  }

  .days {
    @include app-border();

    padding: 10px;

    .day {
      width: 20px;
      margin: 10px 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        color: $hover-color;
        font-weight: bold;
      }

      &:focus {
        font-size: 16px;
        outline: none;
      }

    @media screen and (max-width: 459px) {
        margin: 0;
      }
    }

    @media screen and (max-width: 459px) {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
