<div id="historialInspeccion" >
    <div class="row my-4">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <h1 class=" title-one">Historial de Inspeccion</h1>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button id="IPlanificadas" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Planificadas</button>
                    <button id="IRalizadas" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Atendidas</button>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5">

        <div class="row" id="tablaIPlanificadas">
            <div class="col-xl-12 mx-auto">
                <?php require_once("historialInspeccionPlanificadas.html"); ?>
            </div>
        </div>
        <div class="row" id="tablaIRealizadas">
            <div class="col-xl-12 mx-auto">
                <?php require_once("historialInspeccionRealizadas.html"); ?>
            </div>
        </div>
    
    </div>
</div>
<?php require_once('../BtnAdd/btnAdd.html') ?>

