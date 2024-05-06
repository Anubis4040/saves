function listarMaquina(a) {

    x = $.ajax({
            url: "Controlador/Maquina/ListarMaquina/listarMaquina.php",
            type: "POST",
            async: true,
        })
        .done(function (dat, est, obj) {
            var maquinaria = dat;
            notificacion();
            console.log(typeof (dat));
            if (typeof (dat) == "string" || dat == '') {
                toastr["error"]("ERROR DE DB");
            } else {
                $("#secMaq").children().children().children('a').children().html('Maquinarias <span class="badge badge-pill badge-light">' + maquinaria["length"] + '</span>').attr("vl", maquinaria["length"]);
                if (a == 1) {
                    loadCardMDM(maquinaria, 'addMaq');
                } else if (a == 2) {
                    ListSelectMDM(maquinaria, 'InspeccionMaquinarias', 'Maquinarias');
                } else if (a == 3) {
                    ListSelectMDM(maquinaria, 'ReparacionMaquinarias','Maquinarias');
                }
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