<template>
  <div class="add-edit">
    <form class="form">
      <md-field :class="{
        'md-invalid' : validationClass.time
      }">
        <md-input name="time" id="time" type="time" v-model="form.time" @input="onInput('time')" />
        <span class="md-error" v-if="!$v.form.time.required">Это обязательное поле</span>
      </md-field>

      <md-field :class="{
        'md-invalid' : validationClass.task
      }">
        <md-input name="task" id="task" v-model="form.task" @input="onInput('task')" />
        <span class="md-error" v-if="!$v.form.task.required">Это обязательное поле</span>
        <span class="md-error" v-else-if="!$v.form.task.minlength">Минимальная длина 3 символа</span>
      </md-field>
    </form>
  </div>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators';
  import {mapActions, mapState} from 'vuex';

  export default {
    name: 'add-edit',
    data: () => ({
      form: {
        time: null,
        task: null,
      },
      validationClass: {},
    }),
    props: {
      isEdit: Boolean,
    },
    validations: {
      form: {
        time: { required },
        task: {
          required,
          minLength: minLength(3)
        },
      },
    },
    computed: {
      ...mapState({
        modalData: state => state.dialog.modalData,
      })
    },
    mounted() {
      if(this.isEdit) {
        this.form = this.modalData;
      }
    },
    methods: {
      ...mapActions([
        'GET_IS_VALID',
        'GET_MODAL_DATA',
      ]),
      onInput(fieldName) {
        const field = this.$v.form[fieldName];

        if (field) {
          field.$touch();
          this.validationClass[fieldName] = field.$invalid && field.$dirty;
        }

        this.GET_IS_VALID(!this.$v.form.$invalid);

        if(!this.$v.form.$invalid) {
          this.GET_MODAL_DATA(this.form);
        }
      }
    },
  }
</script>

<style lang="scss">
.form {
  padding: 20px;
}
</style>
