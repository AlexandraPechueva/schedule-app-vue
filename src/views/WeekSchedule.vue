<template>
  <div class="schedule-container">
     <h1 class="title">Список задач</h1>
       <div class="form-container">
         <day-schedule />

          <week-days />
       </div>
  </div>
</template>

<script>
import WeekDays from '@/components/WeekDays.vue';
import DaySchedule from '@/components/DaySchedule.vue';

export default {
  name: 'week-schedule',
  components: {
    WeekDays,
    DaySchedule,
  },
}
</script>

<style lang="scss">
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
}
</style>
