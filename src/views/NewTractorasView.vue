<template>
  <div>
    <!-- v-model => directiva de Vue.js
      permite la sincronización bidireccional entre el campo de entrada y el estado. -->
    <!-- :class="{ 'is-invalid': errors.campo } agrega la clase is-invalid al campo de entrada si errors.pma tiene un valor -->
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="inputMatricula" class="form-label">Matricula</label>
        <input
          type="text"
          class="form-control"
          id="inputMatricula"
          v-model="form.matricula"
          :class="{ 'is-invalid': errors.matricula }"
        />
        <div class="invalid-feedback" v-if="errors.matricula">
          {{ errors.matricula }}
        </div>
      </div>
      <div class="mb-3">
        <label for="inputMarca" class="form-label">Marca</label>
        <input
          type="text"
          class="form-control"
          id="inputMarca"
          v-model="form.marca"
          :class="{ 'is-invalid': errors.marca }"
        />
        <div class="invalid-feedback" v-if="errors.marca">
          {{ errors.marca }}
        </div>
      </div>
      <div class="mb-3">
        <label for="inputPMA" class="form-label">PMA</label>
        <input
          type="text"
          class="form-control"
          id="inputPMA"
          v-model="form.pma"
          :class="{ 'is-invalid': errors.pma }"
        />
        <div class="invalid-feedback" v-if="errors.pma">
          {{ errors.pma }}
        </div>
      </div>
      <div class="mb-3">
        <label for="inputNombre" class="form-label">Nombre Conductor</label>
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
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        matricula: '',
        marca: '',
        pma: '',
        nombre: ''
      },
      errors: {}
    }
  },
  methods: {
    validateForm() {
      this.errors = {}

      if (!this.form.matricula) {
        this.errors.matricula = 'La matricula es obligatoria.'
      }
      if (!this.form.marca) {
        this.errors.marca = 'La marca es obligatoria.'
      }
      if (!this.form.pma) {
        this.errors.pma = 'El PMA es obligatorio.'
      }
      if (!this.form.nombre) {
        this.errors.nombre = 'El nombre del conductor es obligatorio.'
      }

      return Object.keys(this.errors).length === 0
    },
    submitForm() {
      if (this.validateForm()) {
        console.log('Formulario válido:', this.form)
      } else {
        console.log('Errores en el formulario:', this.errors)
      }
    }
  }
}
</script>

<!-- <template>
    <div>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="inputMatricula" class="form-label">Matricula</label>
          <input
            type="text"
            class="form-control"
            id="inputMatricula"
            v-model="form.matricula"
            :class="{'is-invalid': errors.matricula}"
            @blur="validateField('matricula')"
            @focus="clearError('matricula')"
          />
          <div class="invalid-feedback" v-if="errors.matricula">
            {{ errors.matricula }}
          </div>
        </div>
        <div class="mb-3">
          <label for="inputMarca" class="form-label">Marca</label>
          <input
            type="text"
            class="form-control"
            id="inputMarca"
            v-model="form.marca"
            :class="{'is-invalid': errors.marca}"
            @blur="validateField('marca')"
            @focus="clearError('marca')"
          />
          <div class="invalid-feedback" v-if="errors.marca">
            {{ errors.marca }}
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPMA" class="form-label">PMA</label>
          <input
            type="text"
            class="form-control"
            id="inputPMA"
            v-model="form.pma"
            :class="{'is-invalid': errors.pma}"
            @blur="validateField('pma')"
            @focus="clearError('pma')"
          />
          <div class="invalid-feedback" v-if="errors.pma">
            {{ errors.pma }}
          </div>
        </div>
        <div class="mb-3">
          <label for="inputNombre" class="form-label">Nombre Conductor</label>
          <input
            type="text"
            class="form-control"
            id="inputNombre"
            v-model="form.nombre"
            :class="{'is-invalid': errors.nombre}"
            @blur="validateField('nombre')"
            @focus="clearError('nombre')"
          />
          <div class="invalid-feedback" v-if="errors.nombre">
            {{ errors.nombre }}
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          matricula: '',
          marca: '',
          pma: '',
          nombre: ''
        },
        errors: {}
      };
    },
    methods: {
      validateField(field) {
        if (!this.form[field]) {
          this.errors[field] = `El campo ${field} es obligatorio.`;
        } else {
          this.clearError(field);
        }
      },
      clearError(field) {
        delete this.errors[field];
      },
      validateForm() {
        this.errors = {};
  
        if (!this.form.matricula) {
          this.errors.matricula = 'La matricula es obligatoria.';
        }
        if (!this.form.marca) {
          this.errors.marca = 'La marca es obligatoria.';
        }
        if (!this.form.pma) {
          this.errors.pma = 'El PMA es obligatorio.';
        }
        if (!this.form.nombre) {
          this.errors.nombre = 'El nombre del conductor es obligatorio.';
        }
  
        return Object.keys(this.errors).length === 0;
      },
      submitForm() {
        if (this.validateForm()) {
          console.log('Formulario válido:', this.form);
        } else {
          console.log('Errores en el formulario:', this.errors);
        }
      }
    }
  };
  </script> -->
