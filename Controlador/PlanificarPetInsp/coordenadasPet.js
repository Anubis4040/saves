function CoordenadasPet($a,$b) {

    data = {
        COD: $a
    }

    x = $.ajax({
        url: "Controlador/PlanificarPetInsp/coordenadasPet.php",
        type: "POST",
        async: true,
        data: data
    })
        .done(function (dat, est, obj) {           
            //initializeMap($b, dat[0]['latitudPet'], dat[0]['longitudPet'], false, 17);
        })
        .fail(function (obj, est) {
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });

}