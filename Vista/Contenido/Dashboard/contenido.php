<div id="dashBoards">
    <div class="row my-4">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <h1 class=" title-one">Panel de Control</h1>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 d-flex">
            <div class="mx-auto">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" id="btnPetInsp" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Peticiones
                        / Inspecciones</button>
                    <button type="button" id="btnObra" class="btn btn-primary  btn-outline-primary btn-rounded waves-effect">Obras</button>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5">

        <div class="container">
            <div class="row" id="dashBoardPetInsp">
                <div class="col-xl-12 mx-auto">
                    <?php require_once("dashBoardPetInsp.html"); ?>
                </div>
            </div>
            <div class="row" id="dashBoardObra">
                <div class="col-xl-12 mx-auto">
                    <?php require_once("dashBoardObra.html"); ?>
                </div>
            </div>
        </div>

    </div>
</div>