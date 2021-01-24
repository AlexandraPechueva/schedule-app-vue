<template>
  <div class="modal-dialog">
    <md-dialog :md-active.sync="visible">
      <!-- <md-dialog-title>Preferences</md-dialog-title> -->

      <component :is="component"></component>

      <md-dialog-actions>
          <md-button class="md-primary" @click="submitDialog()">OK</md-button>
          <md-button class="md-primary" @click="closeDialog()">Отмена</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Vue from 'vue';
  import DeleteConfirm from '@/components/DeleteConfirm.vue'

  export default {
    name: 'modal-dialog',
    data: () => ({
       component: null,
     }),
    components: {
      DeleteConfirm,
    },
    computed: {
      ...mapState({
        visible: state => state.dialog.modalVisible,
        modalComponent: state => state.dialog.modalComponent,
      }),
    },
    watch: {
      modalComponent(componentName) {
        if (!componentName) return;

        Vue.component(componentName, () => import(`@/components/${componentName}`));
        this.component = this.modalComponent;
      },
    },
    methods: {
      closeDialog() {
        this.$store.commit('SET_SHOW_MODAL', '');
      },
      submitDialog() {
        this.$emit('submitDialog', this.modalComponent);
      }
    }
  }
</script>

<style lang="scss">
  .md-dialog /deep/.md-dialog-container {
    max-width: 768px;
  }
</style>