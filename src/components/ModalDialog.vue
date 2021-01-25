<template>
  <div class="modal-dialog">
    <md-dialog :md-active.sync="visible" @md-clicked-outside="closeDialog()">
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

  export default {
    name: 'modal-dialog',
    data: () => ({
       component: null,
     }),
    computed: {
      ...mapState({
        visible: state => state.dialog.modalVisible,
        modalComponent: state => state.dialog.modalComponent,
      }),
    },
    watch: {
      modalComponent(componentName) {
        if (!componentName) return;

        const componentNamePath = componentName.split('-')
          .map(item => item[0].toUpperCase() + item.substring(1)).join('');

        Vue.component(componentName, () => import(`@/components/${componentNamePath}.vue`));
        this.component = componentName;
      },
    },
    methods: {
      closeDialog() {
        this.$store.dispatch('TOGGLE_SHOW_MODAL', '');
      },
      submitDialog() {
        this.$emit('submitDialog', this.modalComponent);
      }
    },
    created() {
      const escapeHandler = (e) => {
        if (e.key === 'Escape' && this.visible) {
          this.$store.dispatch('TOGGLE_SHOW_MODAL', '');
        }
      };

      document.addEventListener('keydown', escapeHandler);
      this.$once('hook:destroyed', () => {
        document.removeEventListener('keydown', escapeHandler);
      });
    }
  }
</script>

<style lang="scss">
  .md-dialog .md-dialog-container {
    max-width: 768px;
  }
</style>
