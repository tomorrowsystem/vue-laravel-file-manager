/**
 * Rules for context menu items (show/hide)
 * {name}Rule
 */
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('fm', {
      extSettings: state => state.settings.extSettings,
    }),
  },
  methods: {
    /**
     * Open - menu item status - show or hide
     * @returns {boolean}
     */
    openRule() {
      return !this.multiSelect &&
          this.firstItemType === 'dir';
    },

    /**
     * Play audio - menu item status - show or hide
     * @returns {boolean}
     */
    audioPlayRule() {
      return this.selectedItems.every(elem => elem.type === 'file') &&
          this.selectedItems.every(elem => this.canAudioPlay(elem.extension));
    },

    /**
     * Play video - menu item status - show or hide
     * @returns {boolean}
     */
    videoPlayRule() {
      return !this.multiSelect &&
          this.canVideoPlay(this.selectedItems[0].extension);
    },

    /**
     * View - menu item status - show or hide
     * @returns {boolean|*}
     */
    viewRule() {
      return !this.multiSelect &&
          this.firstItemType === 'file' &&
          this.canView(this.selectedItems[0].extension);
    },

    /**
     * Edit - menu item status - show or hide
     * @returns {boolean|*}
     */
    editRule() {
      return this.extSettings.canManage &&
          !this.multiSelect &&
          this.firstItemType === 'file' &&
          this.canEdit(this.selectedItems[0].extension);
    },

    /**
     * Select - menu item status - show or hide
     * @returns {boolean|null}
     */
    selectRule() {
      return !this.multiSelect &&
          this.firstItemType === 'file' &&
          this.$store.state.fm.fileCallback;
    },

    /**
     * Download - menu item status - show or hide
     * @returns {boolean}
     */
    downloadRule() {
      return this.extSettings.canDownload &&
          !this.multiSelect &&
          this.firstItemType === 'file';
    },

    /**
     * Copy - menu item status - show or hide
     * @returns {boolean}
     */
    copyRule() {
      return this.extSettings.canManage;
    },

    /**
     * Cut - menu item status - show or hide
     * @returns {boolean}
     */
    cutRule() {
      return this.extSettings.canManage;
    },

    /**
     * Rename - menu item status - show or hide
     * @returns {boolean}
     */
    renameRule() {
      return this.extSettings.canManage &&
          !this.multiSelect;
    },

    /**
     * Paste - menu item status - show or hide
     * @returns {boolean}
     */
    pasteRule() {
      return this.extSettings.canManage &&
          !!this.$store.state.fm.clipboard.type;
    },

    /**
     * Zip - menu item status - show or hide
     * @returns {boolean}
     */
    zipRule() {
      return this.extSettings.canManage &&
          this.selectedDiskDriver === 'local';
    },

    /**
     * Unzip - menu item status - show or hide
     * @returns {boolean}
     */
    unzipRule() {
      return this.extSettings.canManage &&
          this.selectedDiskDriver === 'local' &&
          !this.multiSelect &&
          this.firstItemType === 'file' &&
          this.isZip(this.selectedItems[0].extension);
    },

    /**
     * Delete - menu item status - show or hide
     * @returns {boolean}
     */
    deleteRule() {
      return this.extSettings.canManage;
    },

    /**
     * Properties - menu item status - show or hide
     * @returns {boolean}
     */
    propertiesRule() {
      return this.extSettings.canManage &&
          this.extSettings.showProperties &&
          !this.multiSelect;
    },
  },
};
