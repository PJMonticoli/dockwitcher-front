<template class="container">
  <div class="py-5">
    <div class="py-3 d-flex justify-content-between">
      <p class="fs-4 fw-medium m-0">Registrar Conductor</p>
    </div>
    <form @submit.prevent="submitForm" class="py-3">
      <div class="container"></div>
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="inputNombre" class="form-label">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="inputNombre"
              v-model="form.nombre"
              :class="{ 'is-invalid': errors.nombre }"
            />
            <div class="invalid-feedback" v-if="errors.nombre">
              {{ errors.nombre }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="inputIdentificacion" class="form-label">Identificación</label>
            <input
              type="text"
              class="form-control"
              id="inputIdentificacion"
              v-model="form.identificacion"
              :class="{ 'is-invalid': errors.identificacion }"
            />
            <div class="invalid-feedback" v-if="errors.identificacion">
              {{ errors.identificacion }}
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="inputlicencia" class="form-label">licencia</label>
            <input
              type="text"
              class="form-control"
              id="inputlicencia"
              v-model="form.licencia"
              :class="{ 'is-invalid': errors.licencia }"
            />
            <div class="invalid-feedback" v-if="errors.licencia">
              {{ errors.licencia }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="inputTelefono" class="form-label">Telefono</label>
            <input
              type="text"
              class="form-control"
              id="inputTelefono"
              v-model="form.telefono"
              :class="{ 'is-invalid': errors.telefono }"
            />
            <div class="invalid-feedback" v-if="errors.telefono">
              {{ errors.telefono }}
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="inputEmail"
              v-model="form.email"
              :class="{ 'is-invalid': errors.email }"
            />
            <div class="invalid-feedback" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="inputFechaCaducidad" class="form-label">Fecha de Caducidad</label>
            <input
              type="date"
              class="form-control"
              id="inputFechaCaducidad"
              v-model="form.fechaCaducidad"
              :class="{ 'is-invalid': errors.fechaCaducidad }"
            />
            <div class="invalid-feedback" v-if="errors.fechaCaducidad">
              {{ errors.fechaCaducidad }}
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-navigation-bar">Guardar</button>
    </form>
  </div>
</template>

<script is:inline>
import { driversService } from '@/_stores/driversRegister'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  data() {
    return {
      form: {
        nombre: '',
        identificacion: '',
        licencia: '',
        email: '',
        telefono: '',
        fechaCaducidad: ''
      },
      errors: {}
    }
  },
  methods: {
    validateForm() {
      this.errors = {}

      if (!this.form.nombre) {
        this.errors.nombre = 'El nombre es obligatorio.'
      }
      if (!this.form.identificacion) {
        this.errors.identificacion = 'La identificación es obligatoria.'
      }
      if (!this.form.licencia) {
        this.errors.licencia = 'La licencia es obligatoria.'
      }
      if (!this.form.email) {
        this.errors.email = 'El email es obligatorio.'
      }
      if (!this.form.telefono) {
        this.errors.telefono = 'El telefono es obligatorio.'
      }
      if (!this.form.fechaCaducidad) {
        this.errors.fechaCaducidad = 'La fecha caducidad es obligatoria.'
      }

      return Object.keys(this.errors).length === 0
    },
    submitForm() {
      if (this.validateForm()) {
        driversService
          .createDriver(this.form)
          .then(() => {
            this.showToatSuccess()
            setTimeout(() => {
              this.$router.push('/drivers')
            }, 2000)
          })
          .catch((error) => {
            console.error('Error al registrar el conductor:', error)
          })
      } else {
        this.showToatError()
        console.log('Errores en el formulario:', this.errors)
      }
    },
    showToatSuccess() {
      toast.success('¡Registro exitoso!', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        pauseOnHover: true
      })
    },
    showToatError() {
      toast.error('¡Error al registrar!', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        pauseOnHover: true
      })
    }
  }
}
</script>
