<div id="historialPeticiones">
<div class="row my-4">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <h1 class=" title-one">Historial de Peticiones</h1>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button id="Espera" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Espera</button>
                    <button id="Planificadas" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Planificadas</button>
                    <button id="Finalizadas" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Atendidas</button>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5">
        <div class="row" id="TablaEspera">
            <div class="col-xl-12 mx-auto">
                <?php require_once("historialPeticionesEspera.html"); ?>
            </div>
        </div>
        <div class="row" id="TablaPlanificadas">
            <div class="col-xl-12 mx-auto">
                <?php require_once("historialPeticionesPlanificadas.html"); ?>
            </div>
        </div>
        <div class="row" id="TablaFinalizadas">
            <div class="col-xl-12 mx-auto">
                <?php require_once("historialPeticionesFinalizadas.html"); ?>
            </div>
        </div>
    </div>
</div>

<?php  require_once('../BtnAdd/btnAdd.html');?>