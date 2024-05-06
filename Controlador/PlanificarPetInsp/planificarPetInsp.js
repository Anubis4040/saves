function PlanificarPetInsp(e, a) {

    var id = e.parent().parent().parent().parent().parent().parent().attr('id');

    d = capturarInputs(e);

    datos = {
        OP: a,
        ENCARGADO: d[1],
        COD: d[2],
        FECHA: d[5]
    }

    console.table(datos);

    notificacion();
    x = $.ajax({
            url: "Controlador/PlanificarPetInsp/planificarPetInsp.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            if (typeof (dat) == "string" || dat['rowAf'] == 0) {
                toastr["error"]("ERROR DE DB");
            } else {              
                toastr["success"]("Su planificacion fue registrada exitosamente");
                if(a==1){
                    planificarInspeccion();
                } else if(a == 2){
                    formObra();
                }               
                console.log("Registrado");
            }
            console.log(dat);
            console.log("Estado de peticion= " + est);
            console.log("DONE");
            console.log("---------------------------------------------------------");
            status = est;
        })
        .fail(function (obj, est) {
            toastr["warning"]("ERROR DE PETICION");
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });

}