<?php namespace Controlador\PlanificarPetInsp;

    require_once('../../autoload.php');        
    use Modelo\Inspeccion\Inspeccion;   
    use Modelo\Reparacion\Reparacion;  

    //echo __FILE__; 
    $op = $_POST['OP'];  
    $a = $_POST['ENCARGADO'];
    $b = $_POST['COD'];    
    $c = $_POST['FECHA'];

    if($a != NULL && $b != NULL && $c != NULL){
        if($op == 1){
            $Inspeccion = new Inspeccion();
            $Inspeccion->SetPlanificacionInspeccion($c);     
            $info = $Inspeccion->PlanificarInspeccion($a,$b);                  
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info); 
        }else if($op == 2){
            $Reparacion = new Reparacion();
            $Reparacion->SetPlanificacionObra($c);     
            $info = $Reparacion->PlanificarObra($a,$b);          
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info); 
        }
        
    }

?>