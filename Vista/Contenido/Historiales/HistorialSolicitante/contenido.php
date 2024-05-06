<div id="historialSolicitante">
    <div class="row my-4">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <h1 class=" title-one">Historial de Solicitantes</h1>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button id="Privados" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Privados</button>
                    <button id="Publicos" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Publicos</button>
                    <button id="particulares" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Particulares</button>
                    <button id="Inactivos" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Inactivos</button>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5">
        <div class="row" id="tablaPrivados">
            <div class="col-xl-11 mx-auto">
                <?php require_once("historialSolicitantePriv.html"); ?>
            </div>
        </div>
        <div class="row" id="tablaPublicos">
            <div class="col-xl-11 mx-auto">
                <?php require_once("historialSolicitantePubl.html"); ?>
            </div>
        </div>
        <div class="row" id="tablaParticular">
            <div class="col-xl-10 mx-auto">
                <?php require_once("historialSolicitantePart.html"); ?>
            </div>
        </div>
        <div class="row" id="tablasInactivos">
            <div class="col-xl-10 mx-auto">
                <?php require_once("historialSolicitanteInactivo.html"); ?>
            </div>
        </div>
    </div>
</div>

<?php  require_once('../BtnAdd/btnAdd.html');?>