function añadirMaquina(e) {

    var d = capturarInputs(e);

    datos = {
        NAME: d[0],
        DESCP: d[1],
    }

    x = $.ajax({
            url: "Controlador/Maquina/AnadirMaquina/anadirMaquina.php",
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
                var i = parseInt($("#secMaq").children().children().children('a').children().attr("vl"));
                i++;
                resetModalEquipos(e);
                $("#secMaq").children().children().children('a').children().html('Maquinarias <span class="badge badge-pill badge-light">' + i + '</span>');
                $("#modalMaterial").modal("hide");
                $("#modalMaquina").modal("hide");
                toastr["success"]("Fue registrado exitosamente");
                dats = {
                    nombre: d[0],
                    descripcion: d[1]
                }
                addCardMDM(dats, 'addMaq');
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