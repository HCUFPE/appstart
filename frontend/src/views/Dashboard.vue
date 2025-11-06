<template>
  <div class="grid grid-cols-12 gap-6">
    <!-- Card 1 -->
    <div class="col-span-12 md:col-span-3">
      <Card>
        <template #header>
          <h2 class="text-lg font-semibold">Card 1</h2>
        </template>
        <p>Dummy content for card 1.</p>
      </Card>
    </div>

    <!-- Card 2 -->
    <div class="col-span-12 md:col-span-3">
      <Card>
        <template #header>
          <h2 class="text-lg font-semibold">Card 2</h2>
        </template>
        <p>Dummy content for card 2.</p>
      </Card>
    </div>

    <!-- Card 3 -->
    <div class="col-span-12 md:col-span-3">
      <Card>
        <template #header>
          <h2 class="text-lg font-semibold">Card 3</h2>
        </template>
        <p>Dummy content for card 3.</p>
      </Card>
    </div>

    <!-- Card 4 -->
    <div class="col-span-12 md:col-span-3">
      <Card>
        <template #header>
          <h2 class="text-lg font-semibold">Card 4</h2>
        </template>
        <p>Dummy content for card 4.</p>
      </Card>
    </div>

    <!-- Big Card -->
    <div class="col-span-12">
      <Card>
        <template #header>
          <h1 class="text-xl font-semibold">Exemplos de API</h1>
        </template>

        <p class="mb-6">Esta página demonstra como o frontend pode interagir com a API para buscar dados, usando os padrões definidos no framework.</p>

        <div class="grid grid-cols-12 gap-6">
          
          <!-- Listar Pacientes -->
          <div class="col-span-12 md:col-span-8">
            <h2 class="text-lg font-semibold mb-2">Listar Pacientes</h2>
            <p class="text-sm text-gray-600 mb-4">Clica no botão para buscar os primeiros 100 pacientes do banco de dados do AGHU.</p>
            <Button @click="fetchPacientes" :disabled="loadingPacientes" class="bg-blue-500 hover:bg-blue-600 text-white">
              <span v-if="loadingPacientes">Carregando...</span>
              <span v-else>Buscar Pacientes</span>
            </Button>
            <div v-if="errorPacientes" class="mt-4 p-2 bg-red-100 text-red-700 rounded text-sm">
              <strong>Erro:</strong> {{ errorPacientes }}
            </div>
            <div v-if="pacientes.length" class="mt-4">
              <h3 class="font-semibold">Resultados:</h3>
              <ul class="list-disc list-inside bg-gray-50 p-2 rounded mt-2 text-sm h-48 overflow-y-auto">
                <li v-for="paciente in pacientes" :key="paciente.pac_codigo">
                  {{ paciente.nome }} (Cód: {{ paciente.pac_codigo }})
                </li>
              </ul>
            </div>
          </div>

          <!-- Obter Paciente por Código -->
          <div class="col-span-12 md:col-span-4">
            <h2 class="text-lg font-semibold mb-2">Obter Paciente por Código</h2>
            <p class="text-sm text-gray-600 mb-4">Digite um código de paciente e clique em buscar.</p>
            <div class="form-group">
              <label for="pacienteCodigoInput" class="form-label">Código do Paciente</label>
              <div class="flex items-center space-x-2">
                <input id="pacienteCodigoInput" v-model="pacienteCodigoInput" type="number" placeholder="Digite o código do paciente" class="form-control">
                <Button @click="fetchPacientePorCodigo" :disabled="loadingPaciente" variant="success" class="whitespace-nowrap">
                  <span v-if="loadingPaciente">Buscando...</span>
                  <span v-else>Buscar por Código</span>
                </Button>
              </div>
            </div>
            <div v-if="errorPaciente" class="mt-4 p-2 bg-red-100 text-red-700 rounded text-sm">
              <strong>Erro:</strong> {{ errorPaciente }}
            </div>
            <div v-if="pacienteDetalhe" class="mt-4">
              <h3 class="font-semibold">Detalhes do Paciente:</h3>
              <pre class="mt-2 text-sm bg-gray-100 p-2 rounded whitespace-pre-wrap">{{ JSON.stringify(pacienteDetalhe, null, 2) }}</pre>
            </div>
          </div>

        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import api from '../services/api';

// State for listing patients
const pacientes = ref<any[]>([]);
const loadingPacientes = ref(false);
const errorPacientes = ref('');

// State for getting a single patient
const pacienteCodigoInput = ref(null);
const pacienteDetalhe = ref<any | null>(null);
const loadingPaciente = ref(false);
const errorPaciente = ref('');

const fetchPacientes = async () => {
  loadingPacientes.value = true;
  errorPacientes.value = '';
  pacientes.value = [];
  try {
    const response = await api.get('/api/pacientes');
    pacientes.value = response.data;
  } catch (err: any) {
    errorPacientes.value = err.response?.data?.detail || err.message;
  } finally {
    loadingPacientes.value = false;
  }
};

const fetchPacientePorCodigo = async () => {
  if (!pacienteCodigoInput.value) {
    errorPaciente.value = 'Por favor, digite um código.';
    return;
  }
  loadingPaciente.value = true;
  errorPaciente.value = '';
  pacienteDetalhe.value = null;
  try {
    const response = await api.get(`/api/pacientes/${pacienteCodigoInput.value}`);
    pacienteDetalhe.value = response.data;
  } catch (err: any) {
    errorPaciente.value = err.response?.data?.detail || err.message;
  } finally {
    loadingPaciente.value = false;
  }
};
</script>
