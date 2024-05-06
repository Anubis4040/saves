<?php namespace Modelo\Inspeccion;

    use Modelo\BaseDatos\ConexionBaseDatos;   
 
    class Inspeccion extends ConexionBaseDatos{

        protected $idInspeccion;  
        protected $idPlanificacionInspeccion;     

        protected $fechaAtencion; 

        protected $fechaRealizacion;  
        protected $codigo;          
        protected $informe;        
        protected $ancho;
        protected $uAncho;
        protected $largo;
        protected $uLargo;

        protected $danos;
        protected $materiales;        
        protected $maquinarias;
        
        protected $imagenes;
        
        protected $conexion;
        
        


        public function __construct($idInspeccion = '', $idPlanificacionInspeccion = ' ', $fechaAtencion = '', $fechaRealizacion = '',
                                    $informe = '', $codigo = '', $ancho = '' ,$uAncho = '', $largo = '', $uLargo = '', 
                                    $danos = '', $materiales = '', $maquinarias = '', $imagenes = ''){
            parent::__Construct();
            $this->conexion = self::$conexionBD;  
            $this->idInspeccion = $idInspeccion;  
            $this->idPlanificacionInspeccion = $idPlanificacionInspeccion;
            $this->fechaAtencion = $fechaAtencion;      
            $this->fechaRealizacion = $fechaRealizacion;               
            $this->informe = $informe;
            $this->codigo = $codigo;
            $this->ancho = $ancho;
            $this->uAncho = $uAncho;
            $this->largo = $largo;
            $this->uLargo = $uLargo;
            $this->danos = $danos;
            $this->materiales = $materiales;
            $this->maquinarias = $maquinarias;
            $this->imagenes = $imagenes;
        }

        function SetPlanificacionInspeccion($fechaAtencion){
            $this->fechaAtencion = $fechaAtencion;      
        }

        public function SetFinalizacionInspeccion($codigo, $fechaRealizacion, $informe, $ancho, $uAncho, $largo, $uLargo){
            $this->codigo = $codigo;
            $this->fechaRealizacion = $fechaRealizacion;  
            $this->informe = $informe;           
            $this->ancho = $ancho;
            $this->uAncho = $uAncho;
            $this->largo = $largo;
            $this->uLargo = $uLargo;     
        }

        public function SetMDM($danos, $materiales, $maquinarias){
            $this->danos = $danos;
            $this->materiales = $materiales;
            $this->maquinarias = $maquinarias;
        }

        public function SetImagenes($imagenes){
            $this->imagenes = $imagenes;
        }

        function PlanificarInspeccion($encargado,$codPet){
             // Inicio de la trasasccion
             $this->conexion->beginTransaction();

             $informe = array();
            
             try{    
                 
                $sql = "SELECT pet.idPeticion FROM peticion  AS pet WHERE codigo = :cod";
                 
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(
                     ":cod" => $codPet
                 ));
                 
                 $resultado = $query;   
                 
                 while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                     $idPeticion = $registro['idPeticion'];
                 }  

                 $sql = "INSERT INTO planificacion_inspeccion (fecha,idPeticion) VALUES (:f, :idPet)";
 
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(                     
                     ":f" => $this->fechaAtencion,                  
                     ":idPet" => $idPeticion           
                 ));	
                 
                 $this->idPlanificacionInspeccion = $this->conexion->lastInsertId();               

                 $cod = $codPet.$this->idPlanificacionInspeccion;
 
                 $sql = "UPDATE planificacion_inspeccion SET codigo = :codPet WHERE idPlanificacionInspeccion = :idPIns";                
 
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(                     
                     ":codPet" => $cod,
                     ":idPIns" => $this->idPlanificacionInspeccion                    
                 ));	 

                 $sql = "UPDATE peticion SET estatus = 2 WHERE idPeticion = :idPet";                
 
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(                     
                     ":idPet" => $idPeticion           
                 ));	 
 
                 $sql = "SELECT ing.idIngeniero FROM persona AS per 
                 JOIN usuario AS user ON per.idPersona =  user.idPersona
                 JOIN ingeniero AS ing ON user.idUsuario = ing.idUsuario
                 WHERE ci = :cd";
                 
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(
                     ":cd" => $encargado
                 ));
                 
                 $resultado = $query;   
                 
                 while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                     $idIngeniero = $registro['idIngeniero'];
                 }  
              
                 $sql = "INSERT INTO inspeccion_ingeniero (idIngeniero,idPlanificacionInspeccion) VALUES (:idI,:idPI)";
 
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(           
                     ":idI" => $idIngeniero,
                     ":idPI" => $this->idPlanificacionInspeccion
                 ));	       

                $resultado = $query;   
        
                 $rowAfIn = $resultado->rowCount();
                 
                 if ($rowAfIn == 0) {
                     $informe['rowAf']    = $rowAfIn;
                     $informe['errorSms'] = $resultado->errorInfo();
                 } else {
                     $informe['rowAf'] = $rowAfIn;
                 }             
 
                 //Realizar cambios a la Base de Datos
                 $this->conexion->commit();  
             }catch(\PDOException $e){
                //Calcelar consultas
                $this->conexion->rollback();
                die("Error: " . $e->getMessage() . '<br>' . $e->getFile() . ' - ' . $e->getLine());
                return $e->getMessage();               
             }             
           
          return $informe;
        }

        function FinalizarInspeccion(){
            // Inicio de la trasasccion
            $this->conexion->beginTransaction();

            $informe = array();
           
            try{            
                
                $sql = "SELECT plani.idPlanificacionInspeccion FROM planificacion_inspeccion  AS plani WHERE codigo = :cod";
                 
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cod" => $this->codigo
                ));
                
                $resultado = $query;   
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $idPlanificacion = $registro['idPlanificacionInspeccion'];
                }  

                // echo $idPlanificacion;
              
                $sql = "INSERT INTO inspeccion (fecha,informe,ancho,uAncho,largo,uLargo,idPlanificacionInspeccion) VALUES (:f, :info, :anch, :uAnch, :larg, :uLarg,:idPlani)";

                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(                    
                    ":f" => $this->fechaRealizacion,
                    ":info" => $this->informe,
                    ":anch" => $this->ancho,
                    ":uAnch" => $this->uAncho,
                    ":larg" => $this->largo,
                    ":uLarg" => $this->uLargo,                              
                    ":idPlani" => $idPlanificacion           
                ));	
                
                $this->idInspeccion = $this->conexion->lastInsertId();               

                $cod = $this->codigo . '-' . $this->idInspeccion;

                $sql = "UPDATE inspeccion SET codigo = :cod WHERE idInspeccion = :idPIns";                

                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(                     
                    ":cod" => $cod,
                    ":idPIns" => $this->idInspeccion                    
                ));	 

                $sql = "SELECT pet.idPeticion FROM planificacion_inspeccion AS plani 
                        JOIN peticion AS pet USING(idPeticion)
                        WHERE plani.codigo = :cod";
                 
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cod" => $this->codigo
                ));
                
                $resultado = $query;   
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $idPeticion = $registro['idPeticion'];
                } 

                $sql = "UPDATE peticion SET estatus = 3 WHERE idPeticion = :idPet";                

                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(                     
                    ":idPet" => $idPeticion           
                ));	 

                foreach($this->danos as $data){        
                    $sql = "INSERT INTO inspeccion_dano (idInspeccion,idDano) VALUES (:idInsp, :idDano)";

                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(                     
                        ':idInsp' => $this->idInspeccion,
                        ':idDano' => $data         
                    ));	
                }

                foreach($this->materiales as $data){        
                    $sql = "INSERT INTO inspeccion_material (idInspeccion,idMaterial) VALUES (:idInsp, :idMate)";

                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(                     
                        ':idInsp' => $this->idInspeccion,
                        ':idMate' => $data      
                    ));	
                }         
                
                foreach($this->maquinarias as $data){ 

                    $sql = "INSERT INTO inspeccion_maquinaria (idInspeccion,idMaquinaria) VALUES (:idInsp, :idMaqui)";

                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(                     
                        ':idInsp' => $this->idInspeccion,
                        ':idMaqui' => $data          
                    ));
                }                      
                
                foreach($this->imagenes as $data){  
                    $target_dir = "imagenes/" . $this->idInspeccion; 
                    if (!file_exists($target_dir)) {
                        mkdir($target_dir, 0777, true);
                    } 
                    $target_file = $target_dir .'/'. basename($data["name"]);
                    $check = getimagesize($data["tmp_name"]);
                    if($check !== false) {                    
                        if (move_uploaded_file($data["tmp_name"], $target_file)) {
                            $sql = "INSERT INTO imageninspeccion (img, idInspeccion) VALUES (:img, :idInsp)";

                            $query = $this->conexion->prepare($sql);
                            
                            $query->execute(array(  
                                ':img' => $this->idInspeccion.'/'.$data["name"],
                                ':idInsp' => $this->idInspeccion,        
                            ));
                        }else{
                            $this->conexion->rollback();
                            return 1;
                        }
                    } else {
                        $this->conexion->rollback();
                        return 0;
                    }
                    
                } 
         
               $resultado = $query;   
       
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['rowAf']    = $rowAfIn;
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                }             

                // Realizar cambios a la Base de Datos
                $this->conexion->commit();  
                return $informe;
            }catch(\PDOException $e){
               //Calcelar consultas
               $this->conexion->rollback();
               die("Error: " . $e->getMessage() . '<br>' . $e->getFile() . ' - ' . $e->getLine());
               return $e->getMessage();               
            }            
          
       }

        public  function HistoriaInspeccionPlanificadas(){
            try {           
                
                $inspeccion = array(); /* almacena lo que regresa el registro */       
                
                $sql = "SELECT pet.codigo as peticion, codigoPlan as codigo,
                concat(user.nombre,' ',user.apellido) as encargado, user.ci as ciEnc,
                concat(organismo,',',concat(pet.nombre,' ',pet.apellido)) as solicitante, 
                concat(pet.rif, ',',pet.ci) as codigos, tipoOrg as tipo, viaPet as informacion,  pet.estatusPet as estatus, plani.fechaPlan as fecha, plani.idPlanificacionINspeccion
                FROM peticiones as pet 
                join planificacioninspeccion as plani on pet.idPeticion = plani.idPeticion
                join usuarios as user on plani.idIngeniero = user.idIngeniero where pet.estatusPet = 2;";
                                               
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $inspeccion[] = $registro;
                }        
                 
                return $inspeccion;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        }

        public  function HistoriaInspeccionAtendia(){
            try {           
                
                $inspeccion = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT codigo as peticion, atencion as codigo, encargado, 
                ciEnc, solicitante, codigos,tipo,informacion,estatus,fecha,obra, 
                idPeticion as idPlanificacionInspeccion from inspecciones where estatus = 3;";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $inspeccion[] = $registro;
                }        
                 
                return $inspeccion;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        }

        public function imagenesInspeccion($a){
            try {           
                
                $Imagenes = array(); /* almacena lo que regresa el registro */                
          
                $sql = "SELECT img FROM imageninspeccion where idInspeccion = :id";         
                              
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":id" => $a
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $Imagenes[] = $registro;
                }        
                 
                return $Imagenes;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function reportePdfA($cod){
            try {           
                
                $reporte = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT * from inspecciones where codigo = '$cod';";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $reporte[] = $registro;
                }        
                 
                return $reporte;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

    }

?>