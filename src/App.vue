<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon
        v-if="isAuthenticated"
        @click="drawer = !drawer"
        data-automation-id="nav-drawer-toggle"
        aria-label="Open navigation drawer"
      />
      <v-app-bar-title>Profile</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-if="isAuthenticated"
      v-model="drawer"
      temporary
    >
      <v-list density="compact" nav>
        
        <v-list-subheader>PROFILE DOMAIN</v-list-subheader>
        <v-list-item
          to="/profiles"
          prepend-icon="mdi-view-list"
          title="List Profiles"
          data-automation-id="nav-profiles-list-link"
        />
        <v-list-item
          to="/profiles/new"
          prepend-icon="mdi-plus"
          title="New Profile"
          data-automation-id="nav-profiles-new-link"
        />

        <v-divider class="my-2" />
        
        <v-list-subheader>ORGANIZATION DOMAIN</v-list-subheader>
        <v-list-item
          to="/organizations"
          prepend-icon="mdi-view-list"
          title="List Organizations"
          data-automation-id="nav-organizations-list-link"
        />
        <v-list-item
          to="/organizations/new"
          prepend-icon="mdi-plus"
          title="New Organization"
          data-automation-id="nav-organizations-new-link"
        />

        <v-divider class="my-2" />
        
        
        <v-list-subheader>EVENT DOMAIN</v-list-subheader>
        <v-list-item
          to="/events"
          prepend-icon="mdi-view-list"
          title="List Events"
          data-automation-id="nav-events-list-link"
        />
        <v-list-item
          to="/events/new"
          prepend-icon="mdi-plus"
          title="New Event"
          data-automation-id="nav-events-new-link"
        />

        <v-divider class="my-2" />
        
        
        <v-list-subheader>IDENTITY DOMAIN</v-list-subheader>
        <v-list-item
          to="/identitys"
          prepend-icon="mdi-view-list"
          title="List Identitys"
          data-automation-id="nav-identitys-list-link"
        />
        
      </v-list>

      <template v-slot:append>
        <v-divider />
        <v-list density="compact" nav>
          <v-list-item
            v-if="hasAdminRole"
            to="/admin"
            prepend-icon="mdi-cog"
            title="Admin"
            data-automation-id="nav-admin-link"
          />
          <v-list-item
            @click="handleLogout"
            prepend-icon="mdi-logout"
            title="Logout"
            data-automation-id="nav-logout-link"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useConfig } from '@/composables/useConfig'
import { useRoles } from '@/composables/useRoles'

const router = useRouter()
const { isAuthenticated, logout } = useAuth()
const { loadConfig } = useConfig()
const { hasRole } = useRoles()
const drawer = ref(false)

const hasAdminRole = hasRole('admin')

// Close temporary drawer when route changes (e.g. after clicking nav link)
router.afterEach(() => {
  drawer.value = false
})

onMounted(async () => {
  // Load config if user is already authenticated (e.g., on page reload)
  if (isAuthenticated.value) {
    try {
      await loadConfig()
    } catch (error) {
      // Silently fail - config will be loaded on next login if needed
      console.warn('Failed to load config on mount:', error)
    }
  }
})

function handleLogout() {
  logout()
  drawer.value = false
  router.push('/login')
}
</script>