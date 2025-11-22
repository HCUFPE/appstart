<template>
  <section class="space-y-6">
    <div class="space-y-3 mb-12">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold text-slate-900">Resumo dos Leitos</h2>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div
          v-for="card in overviewCards"
          :key="card.title"
          class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <p class="text-sm font-medium text-slate-600">{{ card.title }}</p>
          <p :class="['mt-2 text-3xl font-bold', card.color]">{{ card.value }}</p>
          <p v-if="card.caption" class="mt-1 text-xs text-slate-500">{{ card.caption }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-3xl font-bold text-slate-900">Visao Geral dos Leitos</h2>
      </div>
      <UiButton variant="outline" size="sm" class="shadow-sm">
        <FunnelIcon class="h-5 w-5 text-slate-500" />
        Filtrar
      </UiButton>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <BedCard
        v-for="leito in mockLeitos"
        :key="leito.leitoNumero"
        v-bind="leito"
        @solicitar-alta="handleSolicitarAlta(leito)"
        @cancelar-alta="handleCancelarAlta(leito)"
        @cancelar-reserva="handleCancelarReserva(leito)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { FunnelIcon } from '@heroicons/vue/24/outline';
import BedCard from '../components/BedCard.vue';
import UiButton from '../components/ui/Button.vue';
import { useToast } from 'vue-toastification';

type BedStatus = 'disponivel' | 'ocupado' | 'higienizacao' | 'desativado' | 'alta';
type BedType = 'cirurgico' | 'hem' | 'obstetrico' | 'outro' | 'nao_definido';

type Patient = {
  prontuario: string;
  idade: number;
  especialidade: string;
};

type Leito = {
  leitoNumero: string;
  status: BedStatus;
  tipo: BedType;
  pacienteAtual?: Patient;
  proximoPaciente?: Patient;
  tipoReserva?: string;
  sinalizacaoTransferencia?: boolean;
};

const mockLeitos: Leito[] = [
  {
    leitoNumero: '01',
    status: 'ocupado',
    tipo: 'cirurgico',
    pacienteAtual: {
      prontuario: '123456',
      idade: 67,
      especialidade: 'Cardiologia',
    },
    proximoPaciente: {
      prontuario: '654321',
      idade: 54,
      especialidade: 'Neurologia',
    },
    tipoReserva: 'Cirurgico',
  },
  {
    leitoNumero: '02',
    status: 'disponivel',
    tipo: 'cirurgico',
  },
  {
    leitoNumero: '03',
    status: 'alta',
    tipo: 'hem',
    pacienteAtual: {
      prontuario: '456789',
      idade: 45,
    especialidade: 'Oncologia',
    },
    sinalizacaoTransferencia: true,
  },
  {
    leitoNumero: '04',
    status: 'higienizacao',
    tipo: 'cirurgico',
  },
  {
    leitoNumero: '05',
    status: 'ocupado',
    tipo: 'hem',
    pacienteAtual: {
      prontuario: '789012',
      idade: 52,
      especialidade: 'Hematologia',
    },
  },
  {
    leitoNumero: '06',
    status: 'desativado',
    tipo: 'nao_definido',
  },
  {
    leitoNumero: '07',
    status: 'ocupado',
    tipo: 'obstetrico',
    pacienteAtual: {
      prontuario: '234567',
      idade: 29,
      especialidade: 'Obstetricia',
    },
  },
  {
    leitoNumero: '08',
    status: 'disponivel',
    tipo: 'outro',
    proximoPaciente: {
      prontuario: '345678',
      idade: 61,
      especialidade: 'Pneumologia',
    },
    tipoReserva: 'Emergencia',
  },
  {
    leitoNumero: '09',
    status: 'disponivel',
    tipo: 'outro',
    proximoPaciente: {
      prontuario: '345678',
      idade: 61,
      especialidade: 'Pneumologia',
    },
    tipoReserva: 'Emergencia',
  },
  {
    leitoNumero: '10',
    status: 'disponivel',
    tipo: 'outro',
    proximoPaciente: {
      prontuario: '345678',
      idade: 61,
      especialidade: 'Pneumologia',
    },
    tipoReserva: 'Emergencia',
  },
];

const overviewCards = [
  { title: 'Taxa de Ocupacao Global', value: '66%', color: 'text-emerald-600', caption: '10 de 15 leitos ocupados' },
  { title: 'Leitos Disponiveis', value: '5', color: 'text-emerald-600' },
  { title: 'Leitos em Uso', value: '6', color: 'text-emerald-600' },
  { title: 'Leitos em Higienizacao', value: '2', color: 'text-emerald-600' },
  { title: 'Leitos Desativados', value: '0', color: 'text-emerald-600' },
  { title: 'Reservas Pendentes', value: '7', color: 'text-emerald-600' },
];

const toast = useToast();

const handleSolicitarAlta = (leito: Leito) => {
  toast.info(`Alta solicitada para o leito ${leito.leitoNumero}.`);
};

const handleCancelarAlta = (leito: Leito) => {
  toast.warning(`Alta cancelada para o leito ${leito.leitoNumero}.`);
};

const handleCancelarReserva = (leito: Leito) => {
  toast.error(`Reserva cancelada para o leito ${leito.leitoNumero}.`);
};
</script>
