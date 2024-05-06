<?php namespace Controlador\Inspeccion\Finalizar;

    require_once('../../../autoload.php');        
    use Modelo\Inspeccion\Inspeccion;   
    
    $data = array();
    $file = array();
    
    foreach($_POST as  $casilla => $datas){
        $data[''.$casilla] = $datas;    
    }

    foreach($_FILES as  $casilla => $files){        
        $file[''.$casilla] = $files;     
    }

    $inspeccion = new Inspeccion();

    $danos = \explode(',',$data['danos']);  
    $materiales = \explode(',',$data['materiales']); 
    $maquinarias = \explode(',',$data['maquinarias']); 
   

    $inspeccion->SetFinalizacionInspeccion($data['codPlanInsp'],$data['fecha'],$data['informe'],$data['ancho'],$data['aUni_'],$data['largo'],$data['lUni_']);
    $inspeccion->SetMDM($danos,$materiales,$maquinarias);
    $inspeccion->SetImagenes($file);

    $info = $inspeccion->FinalizarInspeccion();  
               
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($info);  

?>