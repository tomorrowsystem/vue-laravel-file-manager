<template>
    <div v-if="extSettings.showDiskList" class="fm-disk-list">
        <ul class="list-inline">
            <li class="list-inline-item" v-for="(disk, index) in disks" v-bind:key="index">
                <span class="badge"
                      v-on:click="selectDisk(disk)"
                      v-bind:class="[disk === selectedDisk ? 'badge-secondary' : 'badge-light']">
                    <i class="fa-fw far fa-hdd"></i> {{ disk }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'DiskList',
  props: {
    // manager name - left or right
    manager: { type: String, required: true },
  },
  computed: {
    ...mapState('fm', {
      extSettings: state => state.settings.extSettings,
    }),
    /**
     * Disk list
     * @returns {Array}
     */
    disks() {
      return this.$store.getters['fm/diskList'];
    },

    /**
     * Selected Disk for this manager
     * @returns {default.computed.selectedDisk|(function())|default.selectedDisk|null}
     */
    selectedDisk() {
      return this.$store.state.fm[this.manager].selectedDisk;
    },
  },
  methods: {
    /**
     * Select disk
     * @param disk
     */
    selectDisk(disk) {
      if (this.selectedDisk !== disk) {
        this.$store.dispatch('fm/selectDisk', {
          disk,
          manager: this.manager,
        });
      }
    },
  },
};
</script>

<style lang="scss">
    .fm-disk-list {

        ul.list-inline {
            margin-bottom: 0.5rem;
        }

        .badge.badge-light {
            cursor: pointer;
        }
    }
</style>
