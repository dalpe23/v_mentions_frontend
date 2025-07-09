<script>
import { useDataStore } from '@/stores/store'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'MencionesView',
  data() {
    return {
      filtro: {
        fechaDesde: '',
        fechaHasta: '',
        alerta: '',
        valoracion: '',
        estado: '',
        pais: '',
      },
      paginaActual: this.paginaActual || parseInt(localStorage.getItem('paginaMenciones')) || 1,
      porPagina: 5,
    }
  },
  async mounted() {
    this.cargarFiltrosGuardados()
    await this.fetchAlertas()
    await this.fetchMenciones()
  },
  watch: {
    filtro: {
      deep: true,
      handler() {
        localStorage.setItem('filtrosMenciones', JSON.stringify(this.filtro))
        this.fetchMenciones()
      },
    },
    paginaActual(newPage) {
      localStorage.setItem('paginaMenciones', String(newPage))
    },
  },
  computed: {
    ...mapState(useDataStore, ['menciones', 'alertas']),
    paisesDisponibles() {
      const paises = new Set()
      this.menciones.forEach((m) => {
        if (m.fuente && m.fuente.includes(' - ')) {
          const pais = m.fuente.split(' - ').pop().trim()
          if (pais) paises.add(pais)
        }
      })
      return Array.from(paises).sort()
    },
    mencionesFiltradas() {
      return this.menciones
        .filter((mencion) => {
          const fechaValida =
            (!this.filtro.fechaDesde ||
              new Date(mencion.fecha) >= new Date(this.filtro.fechaDesde)) &&
            (!this.filtro.fechaHasta ||
              new Date(mencion.fecha) <= new Date(this.filtro.fechaHasta + 'T23:59:59'))
          const alertaValida = !this.filtro.alerta || mencion.alerta_id == this.filtro.alerta
          const valoracionValida =
            !this.filtro.valoracion || mencion.sentimiento === this.filtro.valoracion
          const estadoValido =
            !this.filtro.estado ||
            (this.filtro.estado === 'leida' && mencion.leida === '1') ||
            (this.filtro.estado === 'no_leida' && mencion.leida !== '1')
          const paisValido =
            !this.filtro.pais ||
            (mencion.fuente && mencion.fuente.endsWith(' - ' + this.filtro.pais))
          return fechaValida && alertaValida && valoracionValida && estadoValido && paisValido
        })
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    },
    mencionesPaginadas() {
      const start = (this.paginaActual - 1) * this.porPagina
      return this.mencionesFiltradas.slice(start, start + this.porPagina)
    },
    totalPaginas() {
      return Math.ceil(this.mencionesFiltradas.length / this.porPagina)
    },
    paginasVisibles() {
      const total = this.totalPaginas
      const actual = this.paginaActual
      const max = 5
      let start = Math.max(1, actual - Math.floor(max / 2))
      let end = start + max - 1
      if (end > total) {
        end = total
        start = Math.max(1, end - max + 1)
      }
      const paginas = []
      for (let i = start; i <= end; i++) {
        paginas.push(i)
      }
      return paginas
    },
  },
  methods: {
    ...mapActions(useDataStore, [
      'fetchMenciones',
      'fetchAlertas',
      'marcarMencionComoLeida',
      'marcarMencionComoNoLeida',
    ]),
    cargarFiltrosGuardados() {
      const f = localStorage.getItem('filtrosMenciones')
      if (f) this.filtro = JSON.parse(f)
      const p = localStorage.getItem('paginaMenciones')
      if (p) this.paginaActual = parseInt(p)
    },
    formatFecha(fecha) {
      const date = new Date(fecha)
      const dia = date.getDate().toString().padStart(2, '0')
      const mes = (date.getMonth() + 1).toString().padStart(2, '0')
      const anio = date.getFullYear()
      const hora = date.getHours().toString().padStart(2, '0')
      const minutos = date.getMinutes().toString().padStart(2, '0')
      return `${dia}/${mes}/${anio} ${hora}:${minutos}`
    },
    aplicarFiltros() {
      this.paginaActual = 1
      localStorage.setItem('filtrosMenciones', JSON.stringify(this.filtro))
      localStorage.setItem('paginaMenciones', String(this.paginaActual))
      this.fetchMenciones()
    },
    limpiarFiltros() {
      this.filtro = {
        fechaDesde: '',
        fechaHasta: '',
        alerta: '',
        valoracion: '',
        estado: '',
        pais: '',
      }
      localStorage.removeItem('filtrosMenciones')
      localStorage.removeItem('paginaMenciones')
      this.aplicarFiltros()
    },
    exportarExcel() {
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15)
      let csvContent = 'Título|Descripción|Temáticas|Fecha|Fuente|Sentimiento|Revisada|Enlace\r\n'
      this.mencionesFiltradas.forEach((mencion) => {
        let titulo = mencion.titulo ? mencion.titulo.replace(/\|/g, ' ') : ''
        let descripcion = mencion.descripcion ? mencion.descripcion.replace(/\|/g, ' ') : ''
        let tematica = mencion.tematica ? mencion.tematica.replace(/\|/g, ' ') : ''
        let fecha = this.formatFecha(mencion.fecha)
        let fuente = mencion.fuente ? mencion.fuente.replace(/\|/g, ' ') : ''
        let sentimiento = mencion.sentimiento || ''
        let leida = mencion.leida ? 'Sí' : 'No'
        let enlace = mencion.enlace ? mencion.enlace.replace(/\|/g, ' ') : ''
        csvContent += `${titulo}|${descripcion}|${tematica}|${fecha}|${fuente}|${sentimiento}|${leida}|${enlace}\r\n`
      })
      const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', `menciones_${timestamp}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    cambiarPagina(page) {
      this.paginaActual = page
      localStorage.setItem('paginaMenciones', String(page))
      document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <h2>Mis Menciones</h2>
      <section class="filtros">
        <div>
          <label><strong>Fecha desde:</strong></label>
          <input type="date" v-model="filtro.fechaDesde" />
        </div>
        <div>
          <label><strong>Fecha hasta</strong>:</label>
          <input type="date" v-model="filtro.fechaHasta" />
        </div>
        <div>
          <label><strong>Alerta:</strong></label>
          <select v-model="filtro.alerta">
            <option value="">Todas mis alertas</option>
            <option v-for="alerta in alertas" :key="alerta.id" :value="alerta.id">
              {{ alerta.nombre }}
            </option>
          </select>
        </div>
        <div>
          <label><strong>Valoración:</strong></label>
          <select v-model="filtro.valoracion">
            <option value="">Todas las valoraciones</option>
            <option value="positivo">Positivas</option>
            <option value="negativo">Negativas</option>
            <option value="neutro">Neutras</option>
          </select>
        </div>
        <div>
          <label><strong>Estado:</strong></label>
          <select v-model="filtro.estado">
            <option value="">Todos los estados</option>
            <option value="no_leida">No revisadas</option>
            <option value="leida">Revisadas</option>
          </select>
        </div>
        <div>
          <label><strong>País:</strong></label>
          <select v-model="filtro.pais" @change="paginaActual = 1">
            <option value="">Todos los países</option>
            <option v-for="pais in paisesDisponibles" :key="pais" :value="pais">{{ pais }}</option>
          </select>
        </div>
      </section>

      <div class="botones-filtros" style="display: flex; gap: 1rem">
        <button class="limpiarFiltro" @click="limpiarFiltros">
          <i class="bi bi-eraser"></i> <strong>Limpiar filtros</strong>
        </button>
        <button class="exportarFiltro" @click="exportarExcel">
          <i class="bi bi-file-earmark-arrow-down"></i> <strong>Exportar</strong>
        </button>
      </div>

      <ul v-if="mencionesPaginadas.length > 0">
        <li
          v-for="mencion in mencionesPaginadas"
          :key="mencion.id"
          :class="['mencion-item', { leida: mencion.leida === '1' }]"
        >
          <a
            :href="mencion.enlace"
            target="_blank"
            class="mencion-link"
            @click="marcarMencionComoLeida(mencion.id)"
          >
            <h3>{{ mencion.titulo }}</h3>
            <p><strong>Descripción:</strong> {{ mencion.descripcion }}</p>
            <p><strong>Temáticas:</strong> {{ mencion.tematica }}</p>
            <p><strong>Fecha:</strong> {{ formatFecha(mencion.fecha) }}</p>
            <p><strong>Fuente:</strong> {{ mencion.fuente }}</p>
          </a>
          <div class="sentimiento-icon">
            <span v-if="mencion.sentimiento === 'positivo'" title="Sentimiento positivo">👍</span>
            <span v-else-if="mencion.sentimiento === 'negativo'" title="Sentimiento negativo"
              >👎</span
            >
            <span v-else title="Sentimiento neutral">😐</span>
          </div>
          <button v-if="mencion.leida !== '1'" class="mencion-btn" @click="marcarMencionComoLeida(mencion.id)">
            <i class="bi bi-envelope-open"></i> Marcar como "Revisada"
          </button>
          <button v-else class="mencion-btn" @click="marcarMencionComoNoLeida(mencion.id)">
            <i class="bi bi-envelope"></i> Marcar como "No revisada"
          </button>
          <button class="mencion-btn-cambiar" @click="$router.push('/menciones/' + mencion.id)">
            <i class="bi bi-pencil-square"></i> Editar valoración
          </button>
        </li>
      </ul>

      <div class="pagination-buttons" v-if="totalPaginas > 1">
        <button :disabled="paginaActual === 1" @click="cambiarPagina(paginaActual - 1)">&lt;&lt;&lt;</button>
        <button
          v-for="pagina in paginasVisibles"
          :key="pagina"
          @click="cambiarPagina(pagina)"
          :class="{ active: pagina === paginaActual }"
        >
          {{ pagina }}
        </button>
        <button :disabled="paginaActual === totalPaginas" @click="cambiarPagina(paginaActual + 1)">
          &gt;&gt;&gt;
        </button>
      </div>
      <div v-else>
        <p v-if="!menciones.length" style="text-align: center; font-size: 20px">
          Cargando menciones...
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
html,
body,
#app {
  margin: 0;
  padding: 0;
}

.limpiarFiltro {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.limpiarFiltro:hover {
  background-color: #d32f2f;
}

.exportarFiltro {
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 20px;
  font-weight: 600;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.exportarFiltro:hover {
  background-color: #388e3c;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  justify-content: center;
  align-items: stretch;
}
.filtros > div {
  flex: 1 1 180px;
  min-width: 150px;
  max-width: 220px;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
}
.filtros p {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
}
.filtros input[type='date'],
.filtros select {
  width: 100%;
  min-width: 120px;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.mencion-btn,
.mencion-btn-cambiar {
  background-color: #007bff;
  color: white;
  border: none;
  margin: 1rem;
  padding: 0.5rem 1rem;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.mencion-btn-cambiar {
  background-color: #f19f2c;
}

.mencion-btn:hover {
  background-color: #0056b3;
}

.mencion-btn-cambiar:hover {
  background-color: #da8b1d;
}

.main-content {
  flex-grow: 1;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 3rem;
}

ul {
  list-style: none;
  padding: 0;
}

.mencion-item {
  position: relative;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.mencion-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mencion-link {
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
}

.sentimiento-icon {
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
  font-size: 3rem;
}

.mencion-item.leida {
  background-color: #e0ffe0;
}

button {
  font-weight: 600;
}

@media (max-width: 1024px) {
  .app-container {
    padding: 0;
  }
  .main-content {
    padding: 0.5rem;
    box-shadow: none;
  }
  .main-content h2 {
    font-size: 2rem;
  }
  .filtros {
    flex-wrap: wrap;
    flex-direction: row;
    gap: 0.5rem;
    align-items: stretch;
    padding: 0.5rem 0;
    justify-content: center;
  }
  .filtros > div {
    flex: 1 1 180px;
    min-width: 150px;
    max-width: 220px;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
  }
  .filtros input[type='date'],
  .filtros select {
    width: 100%;
    min-width: 120px;
    font-size: 0.98rem;
    padding: 0.7rem;
    margin-bottom: 0.3rem;
    box-sizing: border-box;
  }
  .botones-filtros {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  button,
  .btn-submit,
  .btn-register,
  .btn-remove,
  .btn-view {
    font-size: 1.1rem !important;
  }

  .exportarFiltro,
  .limpiarFiltro,
  .mencion-btn-cambiar {
    font-size: 20px;
    font-weight: 600;
  }

  .exportarFiltro,
  .limpiarFiltro {
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    padding: 0.9rem 0.5rem;
    border-radius: 8px;
    width: 100%;
    margin: 0.5rem 0 0.5rem 0;
    box-sizing: border-box;
  }

  .mencion-btn,
  .mencion-btn-cambiar {
    margin: 0.5rem 0 0.5rem 0;
    margin-left: 1rem;
    font-size: 1.1rem;
    padding: 0.9rem 0.5rem;
    border-radius: 8px;
    font-weight: 600;
  }

  .exportarFiltro {
    font-size: 1.1rem;
    padding: 0.9rem 0.5rem;
    border-radius: 8px;
    font-weight: 600;
    width: 100%;
    margin: 0.5rem 0 0.5rem 0;
  }
  .mencion-btn {
    margin: 0.5rem 0 0.5rem 0;
    margin-left: 1rem;
    font-size: 1.1rem;
    padding: 0.9rem 0.5rem;
    border-radius: 8px;
    font-weight: 600;
  }
  .mencion-btn-cambiar {
    margin: 0 0 1rem 0;
    margin-left: 1rem;
    font-size: 1.1rem;
    padding: 0.9rem 0.5rem;
    border-radius: 8px;
    font-weight: 600;
  }

  .sentimiento-icon {
    position: absolute;
    bottom: 0.7rem;
    right: 0.7rem;
    font-size: 2.5rem;
  }
}

@media (min-width: 1025px) {
  .filtros {
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    justify-content: center;
    align-items: flex-end;
  }
  .botones-filtros {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 0.7rem;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }
  .limpiarFiltro,
  .exportarFiltro {
    font-size: 1rem;
    padding: 0.5rem 0.8rem;
    border-radius: 6px;
    width: 180px;
    min-width: 120px;
    max-width: 220px;
    box-sizing: border-box;
    margin: 0;
  }
}
.pagination-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.pagination-buttons button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.pagination-buttons button:hover {
  background-color: #e0e0e0;
}

.pagination-buttons button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.pagination-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
