<div id="historialUsuarios">
    <div class="row my-4">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <h1 class=" title-one">Historial de Usuarios</h1>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button id="administradores" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Administradores</button>
                    <button id="ingenieros" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Ingenieros</button>
                    <button id="inactivos" type="button" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Inactivos</button>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5">
        <div class="row" id="tablaAdministrador">
            <div class="col-xl-10 mx-auto">
                <?php require_once("HistorialUsuarioAdm.html"); ?>
            </div>
        </div>
        <div class="row" id="tablaIngeniero">
            <div class="col-xl-10 mx-auto">
                <?php require_once("HistorialUsuarioIng.html"); ?>
            </div>
        </div>
        <div class="row" id="tablasInactivos">
            <div class="col-xl-10 mx-auto">
                <?php require_once("historialUsuarioInactivo.html"); ?>
            </div>
        </div>
    </div>
</div>
<?php  require_once('../BtnAdd/btnAdd.html');?>