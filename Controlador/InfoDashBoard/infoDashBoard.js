function InfoDashBoard(a) {

    datos = {
        OP: a
    }

    x = $.ajax({
            url: "controlador/InfoDashBoard/infoDashBoard.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {
            console.log(dat);
            if (a == 1) {
                $('#dashBoardPetInsp-espera').text(dat['ESPERA']['espera']);
                $('#dashBoardPetInsp-planificadas').text(dat['PLANIFICADAS']['planificadas']);
                $('#dashBoardPetInsp-atendidas').text(dat['ATENDIDAS']['atendidas']);
            }else if (a == 2) {
                $('#dashBoardObra-espera').text(dat['ESPERA']['espera']);
                $('#dashBoardObra-planificadas').text(dat['PLANIFICADAS']['planificadas']);
                $('#dashBoardObra-atendidas').text(dat['ATENDIDAS']['atendidas']);
            }
        })
        .fail(function (obj, est) {
            toastr["warning"]("ERROR DE PETICION");
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}