<template>
  <q-list highlight>
    <q-list-header>Profile</q-list-header>
    <q-item tag="label">
      <q-item-side>
        <q-item-tile avatar><img :src="profile.profile.provider_picture"></q-item-tile>
      </q-item-side>
      <q-item-main>
        <q-item-tile label>{{ `${ profile.profile.firstname } ${ profile.profile.lastname }` }}</q-item-tile>
        <q-item-tile sublabel>{{ profile.profile.email }}</q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { PROFILE_READ } from '@/store/actions.type'

export default {
  name: 'Profile',
  computed: {
    ...mapState(['profile'])
  },
  methods: {
    ...mapActions([PROFILE_READ]),
    logout () {
      this.$auth.logout()
    }
  },
  created () {
    this[PROFILE_READ]()
  }
}
</script>
