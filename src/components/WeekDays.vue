<template>
  <div class="week-days">
    <p v-for="day in WEEKDAYS" :key="day.id" 
      class="day"
      :class="{ 'day-activated': day.id === ACTIVATED_DAY }"
      @click="getDay(day.id)"
    >
      {{ day.shortName }}
    </p>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: 'week-days',
    computed: {
      ...mapGetters([
        'WEEKDAYS',
        'ACTIVATED_DAY',
      ]),
    },
    methods: {
      ...mapActions([
        'GET_WEEKDAYS',
        'GET_ACTIVATED_DAY',
      ]),
      getDay(id) {
        this.GET_ACTIVATED_DAY(id);
      }
    },

    mounted() {
      const today =  new Date().toLocaleDateString('ru-Ru', { weekday: 'short' });

      this.GET_WEEKDAYS()
        .then(res => {
          if(res) {
            const todayId = this.WEEKDAYS.find(day => day.shortName === today).id
            this.GET_ACTIVATED_DAY(todayId);
          }
      });
    },
  }
</script>

<style lang="scss">
  @import '@/assets/styles/scss/mixins/_border.scss';

  .week-days {
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

      &-activated {
        color: $main-color;
        font-weight: bold;
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
</style>
