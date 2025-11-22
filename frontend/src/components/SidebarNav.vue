<template>
  <aside class="flex w-64 min-h-screen flex-col border-r border-slate-200 bg-slate-50 text-slate-800 shadow-sm">
    <div class="flex items-center gap-3 px-5 py-6">
      <div class="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white">
        <img src="/hc_ufpe_icon.jpeg" alt="UTI Manager" class="h-11 w-11 object-cover" />
      </div>
      <div class="leading-tight">
        <p class="text-lg font-bold text-slate-600">UTI Manager</p>
      </div>
    </div>

    <nav class="flex-1 space-y-1 px-3 py-4">
      <RouterLink
        v-for="item in activeItems"
        :key="item.to"
        :to="item.to"
        class="group flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition"
        :class="isActive(item.to) ? 'sidebar-active' : 'text-slate-700 hover:bg-white hover:text-slate-900'"
      >
        <component :is="item.icon" class="h-5 w-5" />
        <span>{{ item.label }}</span>
      </RouterLink>

      <div
        v-for="item in disabledItems"
        :key="item.label"
        class="flex cursor-not-allowed items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-slate-400"
      >
        <span class="flex items-center gap-3">
          <component :is="item.icon" class="h-5 w-5" />
          {{ item.label }}
        </span>
        <span class="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-500">
          <LockClosedIcon class="h-4 w-4" />
          Em breve
        </span>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  Squares2X2Icon,
  InboxStackIcon,
  ArrowTrendingUpIcon,
  BellAlertIcon,
  ChartBarSquareIcon,
  ClockIcon,
  LockClosedIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();
const isActive = (path: string) => route.path === path;

const activeItems = [
  {
    label: 'Leitos',
    to: '/',
    icon: Squares2X2Icon,
  },
  {
    label: 'Solicitações de leito',
    to: '/solicitacoes',
    icon: InboxStackIcon,
  },
  {
    label: 'Solicitações de alta',
    to: '/altas',
    icon: ArrowTrendingUpIcon,
  },
  {
    label: 'Alertas',
    to: '/alertas',
    icon: BellAlertIcon,
  },
  {
    label: 'Indicadores',
    to: '/indicadores',
    icon: ChartBarSquareIcon,
  },
  {
    label: 'Historico',
    to: '/historico',
    icon: ClockIcon,
  },
];

const disabledItems: Array<{ label: string; icon: any }> = [];
</script>

<style scoped>
.sidebar-active {
  background-color: #1173d4;
  color: #ffffff;
}

.sidebar-active :deep(svg) {
  color: inherit;
}
</style>
