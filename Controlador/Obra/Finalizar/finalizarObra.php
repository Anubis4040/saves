<?php namespace Controlador\Inspeccion\Finalizar;

    require_once('../../../autoload.php');        
    use Modelo\Reparacion\Reparacion;   
    
    $data = array();
    $mate = array();
    $maqi = array();
    $file = array();
    $i = 0;
    foreach($_POST as  $casilla => $datas){                       
        if($casilla == 'material'.$i){
            $mate[''.$casilla] = explode(',',$datas);  
            $i++;            
        }else if($casilla == 'maquinarias'){
            $maqi[''.$casilla] = explode(',',$datas);
        }else {
            $data[''.$casilla] = $datas;  
        }
    }  

    foreach($_FILES as  $casilla => $files){        
        $file[''.$casilla] = $files;     
    }

    // \var_dump($data);
    // \var_dump($mate);
    // \var_dump($maqi);
    // \var_dump($file);

    $Reparacion = new Reparacion();  
   
    $Reparacion->SetMM($maqi,$mate);
    $Reparacion->SetImagenes($file);
    $Reparacion->SetFinalizacionObra($data['codPlanRep'],$data['fecha'],$data['informe']);       

    $info = $Reparacion->FinalizarReparacion();  
               
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);  

?>