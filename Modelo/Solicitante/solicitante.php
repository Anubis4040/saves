<?php namespace Modelo\Solicitante;

    use Modelo\Persona\Persona;
    use Modelo\Organizacion\Organizacion;
    use Modelo\Coordenada\Coordenada;

    class Solicitante extends Persona{     

        protected $idSolicitante;
        protected $estatus;
        protected $correo;       
        protected $objCoordenadas;
        protected $objOrganizacion;
  
        
        public function __construct($idPersona = '' ,$ci = '99999999', $nombre = '', 
                                    $apellido = '', $sexo = 1, $tlf = '00000000000', 
                                    $tTlf = 1, $organizacion = '', $rifOrg = '000000000000', 
                                    $tipoOrg = '1', $estatus = '', $correo = '', $latitud = '0', 
                                    $longitud = '0', $informacion = ''){

            parent::__Construct($idPersona, $ci, $nombre, $apellido ,$sexo ,$tlf ,$tTlf);  
            $this->objOrganizacion = new Organizacion(); 
            $this->objCoordenadas = new Coordenada();        
            $this->correo = htmlentities(addslashes($correo));
            
        }

        public function SetSolicitantePP($tipoOrg,$rifOrg,$organizacion,$correo){
            $this->objOrganizacion->SetOrganizacion($tipoOrg,$rifOrg,$organizacion);            
            $this->correo = htmlentities(addslashes($correo));  
        }

        public function SetSolicitanteP($tipoOrg,$correo){        
            $this->objOrganizacion->SetTipoOrg($tipoOrg);
            $this->correo = htmlentities(addslashes($correo));        
        }

        public function SetCoordenadas($lat,$long,$info){
          $this->objCoordenadas->SetCoordenadas($lat,$long,$info);        
        }

        public function SetTipoOrg($tipoOrg){
            $this->objOrganizacion->SetTipoOrg($tipoOrg);
        }

        public function SetRif($rifOrg){
            $this->objOrganizacion->SetRif($rifOrg);
        }
        
        public function SetOrganismo($organizacion){
            $this->objOrganizacion->SetOrganismo($organizacion);
        }

        public function SetCorreo($correo){
            $this->correo = htmlentities(addslashes($correo));
        }     
        
        public function SetEstatus($estatus){
            $this->estatus = $estatus;
        } 

        public function RegistrarSolicitantePP(){

            // Inicio de la trasasccion
            $this->conexion->beginTransaction();

            $informe = array();         

            try{               

                $this->objOrganizacion->AgregarOrganismo();

                $idOrganizacion = $this->objOrganizacion->GetIdOrganizacion();                 

                if($idOrganizacion == null){
                    return "idOrganizacion es NULL";
                }
                
                $this->objCoordenadas->AgregarCoordenada();

                $idCoordenada = $this->objCoordenadas->GetIdCoordenadas();

                if($idCoordenada == null){
                    return "idCoordenada es NULL";
                }                

                if($this->idPersona == "false"){
                    $sql = "INSERT INTO persona (ci,nombre,apellido,tlf,tTlf) VALUES (:ci, :n, :ln, :tlf, :tTlf)";
            
                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(
                        ":ci" => $this->ci,
                        ":n" => $this->nombre,
                        ":ln" => $this->apellido,        
                        ":tlf" => $this->tlf,  
                        ":tTlf" => $this->tTlf                        
                    ));

                    $this->idPersona = $this->conexion->lastInsertId(); 

                    $sql = "INSERT INTO solicitante (correo,idOrganizacion,idCoordenada,idPersona) VALUES (:cor, :idO, :idC, :idP)";
        
                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(                     
                        ":cor" => $this->correo,
                        ":idO" => $idOrganizacion,
                        ":idC" => $idCoordenada,     
                        ":idP" => $this->idPersona         
                    )); 
                }else{
                    $sql = "UPDATE persona SET ci = :ci, nombre = :n , apellido = :ln, tlf = :tlf, tTlf = :tTlf WHERE idPersona = :idp";

                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(
                        ":ci" => $this->ci,
                        ":n" => $this->nombre,
                        ":ln" => $this->apellido,        
                        ":tlf" => $this->tlf,  
                        ":tTlf" => $this->tTlf,
                        ":idp" => $this->idPersona                        
                    ));

                    $sql = "INSERT INTO solicitante (correo,idOrganizacion,idCoordenada,idPersona) VALUES (:cor, :idO, :idC, :idP)";
        
                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(                     
                        ":cor" => $this->correo,
                        ":idO" => $idOrganizacion,
                        ":idC" => $idCoordenada,     
                        ":idP" => $this->idPersona         
                    )); 
                }  

                $resultado = $query;
               
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                }

                //Realizar cambios a la Base de Datos
                $this->conexion->commit();  

            }catch(\PDOException $e){
                //Calcelar consultas
                $this->conexion->rollback();
                die("Error: " . $e->getMessage() . "<br>Archivo: " . $e->getFile());
                return $e->getMessage();
            }

            return $informe;

        }  

        public function RegistrarSolicitanteP(){

            // Inicio de la trasasccion
            $this->conexion->beginTransaction();

            $informe = array();         

            try{

                $this->objOrganizacion->AgregarOrganismo();

                $idOrganizacion = $this->objOrganizacion->GetIdOrganizacion();                 

                if($idOrganizacion == null){
                    return "idOrganizacion es NULL";
                }
                
                $this->objCoordenadas->AgregarCoordenada();

                $idCoordenada = $this->objCoordenadas->GetIdCoordenadas();

                if($idCoordenada == null){
                    return "idCoordenada es NULL";
                }   

                if($this->idPersona == "false"){
                    $sql = "INSERT INTO persona (ci,nombre,apellido,tlf,tTlf) VALUES (:ci, :n, :ln, :tlf, :tTlf)";
            
                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(
                        ":ci" => $this->ci,
                        ":n" => $this->nombre,
                        ":ln" => $this->apellido,        
                        ":tlf" => $this->tlf,  
                        ":tTlf" => $this->tTlf                        
                    ));

                    $this->idPersona = $this->conexion->lastInsertId(); 

                    $sql = "INSERT INTO solicitante (correo,idOrganizacion,idCoordenada,idPersona) VALUES (:cor, :idO, :idC, :idP)";
        
                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(                     
                        ":cor" => $this->correo,
                        ":idO" => $idOrganizacion,
                        ":idC" => $idCoordenada,     
                        ":idP" => $this->idPersona         
                    )); 
                }else{
                    $sql = "UPDATE persona SET ci = :ci, nombre = :n , apellido = :ln, tlf = :tlf, tTlf = :tTlf WHERE idPersona = :idp";

                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(
                        ":ci" => $this->ci,
                        ":n" => $this->nombre,
                        ":ln" => $this->apellido,        
                        ":tlf" => $this->tlf,  
                        ":tTlf" => $this->tTlf,
                        ":idp" => $this->idPersona                        
                    ));

                    $sql = "INSERT INTO solicitante (correo,idOrganizacion,idCoordenada,idPersona) VALUES (:cor, :idO, :idC, :idP)";
        
                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(                     
                        ":cor" => $this->correo,
                        ":idO" => $idOrganizacion,
                        ":idC" => $idCoordenada,     
                        ":idP" => $this->idPersona         
                    )); 
                }      
    
                $resultado = $query;
               
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                }

                //Realizar cambios a la Base de Datos
                $this->conexion->commit();  

            }catch(\PDOException $e){
                //Calcelar consultas
                $this->conexion->rollback();
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }

            return $informe;

        }     

        public function HistorialSolicitantePP(){
            try {           
                
                $solicitante = array(); /* almacena lo que regresa el registro */         
        
                $sql = "SELECT organismo as nombre, rif,concat(nombre,' ',apellido) as representante,concat(tlf,',',tTlf) as tlf, estatus, idSolicitante FROM solicitantes WHERE tipoOrg = :tipo AND estatus = 1";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(           
                    ":tipo" => $this->objOrganizacion->GetTipoOrg()         
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $solicitante[] = $registro;
                }        
                 
                return $solicitante;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function HistorialSolicitantePart(){
            try {           
                
                $solicitante = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT concat(nombre,' ',apellido) as solicitante, ci, concat(tlf,',',tTlf) as tlf, estatus, idSolicitante FROM solicitantes WHERE tipoOrg = 3 AND estatus = 1;";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $solicitante[] = $registro;
                }        
                 
                return $solicitante;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        }  
        
        public function HistorialSolicitanteInact($tipo){
            try {           
                
                $solicitante = array();; /* almacena lo que regresa el registro */             

                if($tipo == "true"){
                    $sql = "SELECT organismo as nombre, tipoOrg as tipo, rif, 
                    concat(nombre,' ',apellido)  as representante, concat(tlf,',',tTlf) as tlf, estatus, idSolicitante  FROM solicitantes 
                    WHERE tipoOrg = 1 AND estatus = 2 OR tipoOrg = 2 AND estatus = 2 ;";
                }else if($tipo == "false"){
                    $sql = "SELECT concat(nombre,' ',apellido) as solicitante, ci, 
                    concat(tlf,',',tTlf) as tlf, estatus, idSolicitante  FROM solicitantes 
                    WHERE tipoOrg = 3 AND estatus = 2;";                
                }               
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $solicitante[] = $registro;
                }        
                 
                return $solicitante;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        }  

        public function ValidarCedulaRepresentanteBD() {
			$informe = array();
			try {
				
				$sql = "SELECT ci from solicitantes WHERE ci = :ci";
				
				$query = $this->conexion->prepare($sql);
				
				$query->execute(array(
					":ci" => $this->ci
				));
				
				$resultado = $query;
				
				while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
					$informe['ciR'] = $registro['ci'];
				}
				
				$rowAfIn = $resultado->rowCount();
				
				if ($rowAfIn == 0) {
					$informe['rowAfR']    = $rowAfIn;
					$informe['errorSmsR'] = $resultado->errorInfo();
					
					$sql = "SELECT ci, idPersona, nombre,apellido , tlf, tTlf FROM usuarios where ci = :ci;";
					
					$query = $this->conexion->prepare($sql);
					
					$query->execute(array(
						":ci" => $this->ci
					));
					
					$resultado = $query;
					
					while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                        $informe['idPR'] = $registro['idPersona'];
                        $informe['ciR'] = $registro['ci'];                        
                        $informe['nombre'] = $registro['nombre'];
                        $informe['apellido'] = $registro['apellido'];    
                        $informe['tlf'] = $registro['tlf'];                                           
					}
					
					$rowAfIn = $resultado->rowCount();
					
					if ($rowAfIn == 0) {
						$informe['rowAfU']    = $rowAfIn;
						$informe['errorSmsU'] = $resultado->errorInfo();
						
					} else {
						$informe['rowAfU'] = $rowAfIn;
					}
					
				} else {
					$informe['rowAfR'] = $rowAfIn;
				}
				
			}
			catch (\PDOException $e) {
				die("Error: " . $e->getMessage());
				return $e->getMessage();
			}
			return $informe;
        }
        
        public function ValidarCorreoSolicitanteBD() {

            $informe = array();

            try{                
            
                $sql = "SELECT correo FROM solicitantes WHERE correo = :email";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":email" => $this->correo
                ));
                
                $resultado = $query;               
                
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['rowAf']    = $rowAfIn;
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                }

            }catch(\PDOException $e){
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }                  
            
            return $informe;
        }
        

        public function InformacionSolicitantesPP($tipoOrg){            
            try {           
                
                $solicitante =  array(); /* almacena lo que regresa el registro */             
           
                $sql = "SELECT idCoordenada, idSolicitante, idOrganizacion, idPersona,
                concat(nombre,' ',apellido) as representante, 
                ci, tlf, tTlf, correo, estatus, rif, 
                organismo as nombre, tipoOrg as tipo, 
                via as informacion ,latitud, longitud from solicitantes WHERE rif = :rif && tipoOrg = :t";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":rif" => $this->objOrganizacion->GetRif(),
                    ":t" => $tipoOrg
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $solicitante[] = $registro;
                }        
                 
                return $solicitante;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function InformacionSolicitantesP($tipoOrg){            
            try {           
                
                $solicitante = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT idCoordenada, idSolicitante, idOrganizacion, idPersona,
                concat(nombre,' ',apellido) as representante, 
                ci, tlf, tTlf, correo, estatus, rif, 
                organismo as nombre, tipoOrg as tipo, 
                via as informacion ,latitud, longitud from solicitantes WHERE ci = :ci && tipoOrg = :t";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":ci" => $this->ci,
                    ":t" => $tipoOrg
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $solicitante[] = $registro;
                }        
                 
                return $solicitante;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function EstatusSolicitante($tipo){
            $informe = array();   
            $this->conexion->beginTransaction();
            try{
                
                if($tipo == "true"){                 
                    $sqlUp = "UPDATE solicitante AS soli
                    JOIN organizacion AS org ON soli.idOrganizacion = org.idOrganizacion
                    SET soli.estatus = :est  WHERE org.rif = :rif";

                    $queryUp = $this->conexion->prepare($sqlUp);
                                    
                    $queryUp->execute(array(        
                        ":est" => $this->estatus,          
                        ":rif" => $this->objOrganizacion->GetRif()
                    ));
                } else if($tipo == "false"){                 
                    $sqlUp = "UPDATE solicitante AS soli
                    JOIN persona AS per ON soli.idPersona = per.idPersona
                    SET soli.estatus = :est WHERE per.ci = :ci ";

                    $queryUp = $this->conexion->prepare($sqlUp);
                                    
                    $queryUp->execute(array(        
                        ":est" => $this->estatus,          
                        ":ci" => $this->ci
                    ));
                }                     
                
                $resultadoUp = $queryUp;
                
                $rowAfUp = $queryUp->rowCount();
                
                if ($rowAfUp == 0) {
                    $informe['rowAf']    = $rowAfUp;
                    $informe['errorSms'] = $queryUp->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfUp;
                }                
                
                //Realizar cambios a la Base de Datos
                $this->conexion->commit();  

                return $informe;

            }catch(\PDOException $e){
                //Calcelar consultas
                $this->conexion->rollback();
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

    }