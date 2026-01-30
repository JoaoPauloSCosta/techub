<script setup lang="ts">
import TopBar from '~/components/TopBar.vue'
import FooterLinks from '~/components/FooterLinks.vue'
import BottomNav from '~/components/BottomNav.vue'
</script>

<template>
  <div id="default-layout" class="min-h-screen flex flex-col">
    <!-- Fixed Header -->
    <TopBar />

    <!-- Main Content - add top padding for fixed header -->
    <main class="flex-1 pt-28 md:pt-28 pb-20 md:pb-0">
      <slot />
    </main>

    <!-- Footer (desktop) -->
    <FooterLinks class="hidden md:block" />

    <!-- Mobile Bottom Navigation -->
    <BottomNav class="md:hidden" />
  </div>
</template>
