<script setup>
import DockwitcherLogo from './icons/DockwitcherLogo.vue';

</script>

<template>
    <div class="sidebar">
        <div class="title-container">
            <h2 class="title">dockwitcher</h2>
        </div>
        <div class="line"></div>
        <div class="side-options">
            <ul>
                <li>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="">
                            <img id="planification-icon" src="../assets/images/icons8-todo-list-24.png">
                            Planificacion
                        </div>
                        <button class="btn btn-primary" id="collapse-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <img id="collapse-icon" src="../assets/images/icons8-chevron-abajo-24.png" width="15">
                        </button>
                    </div>
                    <div class="collapse" id="collapseExample">
                        <div>
                            <p>Panel</p>
                            <p>Recepciones</p>
                        </div>
                    </div>
                </li>
                <li>
                    <img id="control-muelle-icon" src="../assets/images/icons8-rampa-para-camiones-50.png" width="24">
                    Control de muelle
                </li>
                <li>
                    <img id="camion-icon" src="../assets/images/icons8-camión-50.png" width="24">
                    Transporte
                </li>
                <li>
                    <img id="configuration-icon" src="../assets/images/icons8-ajustes-rojo-50.png" width="24">
                    Configuración
                </li>
            </ul>
        </div>
    </div>
</template>
