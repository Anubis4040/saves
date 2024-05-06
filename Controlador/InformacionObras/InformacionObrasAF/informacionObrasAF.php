<?php namespace Controlador\InformacionObras\InformacionObrasAF\informacionObrasAF;

    require_once('../../../autoload.php');
    use Modelo\Reparacion\Reparacion;  
    use Modelo\Inspeccion\Inspeccion;       

    $a = $_POST['COD']; 
    $b = $_POST['EST']; 

    if($a != NULL && $b != NULL){  
        $Reparacion = new Reparacion();  
        $Reparacion->SetCodigo($a);
        $info = $Reparacion->InformacionObrasAF($b); 
        $inspeccion = new Inspeccion();
        if($b == 1){
            $imgI = $inspeccion->imagenesInspeccion($info[0]['idInspeccion']);
            $info[] = $imgI;
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info);  
        }else if($b == 2){
            $imgI = $inspeccion->imagenesInspeccion($info[0]['idInspeccion']);
            $imgO = $Reparacion->imagenesReparacion($info[0]['idReparacion']);
            $info[] = $imgI;
            $info[] = $imgO;
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info);  
        } 
  
        
    }       
    
?>

