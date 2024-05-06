<div id="historialObra">
    <div class="row my-4">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <h1 class=" title-one">Historial de Obras</h1>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button id="OPlanificadas" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Planificadas</button>
                    <button id="ORalizadas" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Realizadas</button>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5">

        <div class="row" id="tablaOPlanificadas">
            <div class="col-xl-12 mx-auto">
                <?php require_once("historialObraPlanificadas.html"); ?>
            </div>
        </div>
        <div class="row" id="tablaORealizadas">
            <div class="col-xl-12 mx-auto">
                <?php require_once("historialObraRealizadas.html"); ?>
            </div>
        </div>

    </div>
</div>
<?php require_once('../BtnAdd/btnAdd.html') ?>