function activarDataTable(name) {
    table = $("#" + name).DataTable({
        "destroy": true,
        "autoWidth": true, //Calcula automaticamente el ancho de las columnas
        "paging": true, // Habilita o deshabilita la paginación de la tabla.
        "ordering": true, // Ordena los registros
        "searching": true, // Funciones de búsqueda 
        "info": true,
        "scrollX": false, // Desplazamiento horizontal
        "scrollY": false, // Desplazamiento vertical
        "language": {
            "lengthMenu": "_MENU_",
            "zeroRecords": "No se ha encontrado el registro",
            "info": "Pg _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(Filtrado entre  _MAX_ registros )"
        },
        "columnDefs": [{
            "orderable": false,
        }]
    });
    $('#' + name + '_wrapper').find('label').each(function () {
        $(this).parent().append($(this).children());
    });
    $('#' + name + '_wrapper .dataTables_filter').find('input').each(function () {
        $('#' + name + '_filter input').attr("placeholder", "Buscar");
        $('#' + name + '_filter input').removeClass('form-control-sm').addClass(" ml-3");
        $('#' + name + '_filter').prepend('<i class="fa fa-search" aria-hidden="true"></i>');
    });
    $('#' + name + '_wrapper .dataTables_length').addClass('d-flex flex-row');
    $('#' + name + '_wrapper .dataTables_filter').addClass('md-form');
    $('#' + name + '_wrapper select').removeClass('custom-select custom-select-sm form-control form-control-sm');
    $('#' + name + '_wrapper select').addClass('mdb-select col-md-2 mt-4');
    $('#' + name + '_wrapper .mdb-select').material_select();
    $('#' + name + '_wrapper .dataTables_filter').find('label').remove();

}