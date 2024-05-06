function añadirMaterial(e) {

    var d = capturarInputs(e);

    datos = {
        NAME: d[0],
        DESCP: d[1],
    }

    x = $.ajax({
            url: "Controlador/Material/AnadirMaterial/anadirMaterial.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {
            notificacion();
            console.log(typeof (dat));
            if (typeof (dat) == "string" || dat['rowAf'] == 0 || dat == '') {
                toastr["error"]("ERROR DE DB");
            } else {
                var i = parseInt($("#secMat").children().children().children('a').children().attr("vl"));
                i++;
                resetModalEquipos(e);
                $("#secMat").children().children().children('a').children().html('Materiales <span class="badge badge-pill badge-light">' + i + '</span>');
                $("#modalMaterial").modal("hide");
                toastr["success"]("Fue registrado exitosamente");
                dats = {
                    nombre: d[0],
                    descripcion: d[1]
                }
                addCardMDM(dats, 'addMat');
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