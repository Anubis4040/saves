<?php namespace Modelo\Ingeniero;

    use Modelo\Usuario\Usuario;

    class Ingeniero extends Usuario{

        protected $idIngeniero;
        protected $civ;

        public function __Construct($idPersona = '', $ci = 99999999, $nombre = '', $apellido = '', 
                                    $sexo = 1, $tlf = 00000000000, $tTlf = 1,
                                    $idUsuario = '', $login = '', $email = '', $pass = '', 
                                    $tUser = 1 , $estatus = 1, $idIngeniero = '', $civ = 9999999999){
            
            parent::__Construct($idPersona, $ci, $nombre, $apellido, $sexo, $tlf, $tTlf, 
                                $idUsuario, $login, $email, $pass, $tUser, $estatus);  
            
            $this->idIngeniero = $idIngeniero;            
            $this->civ = $civ;
            
        }

        public function SetIngenieroCiv($civ){
            $this->civ = $civ;
        }

        public function RegistrarUsuario(){             
            
             // Inicio de la trasasccion
             $this->conexion->beginTransaction();

             $informe = array();        
 
             $this->pass_cifrado = password_hash($this->pass, PASSWORD_DEFAULT, array(
                 "cost" => 12
             ));
 
             try{
 
                $sql = "INSERT INTO usuario (login,tUser,email,sexo,pass,idPersona) VALUES (:lg, :tu, :em, :sex, :pss, :id)";
        
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":lg" => $this->login,
                    ":tu" => $this->tUser,
                    ":em" => $this->email,
                    ":sex" => $this->sexo,
                    ":pss" => $this->pass_cifrado,
                    ":id" => $this->idPersona              
                ));

                $this->idUsuario = $this->conexion->lastInsertId(); 

                 $sql = "INSERT INTO ingeniero (idUsuario) VALUES (:id)";
         
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(             
                     ":id" => $this->idUsuario              
                 ));
     
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

        public function ValidarCivBD(){
            $informe = array();
            try{                
            
                $sql = "SELECT * FROM ingeniero WHERE civ = :civ";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":civ" => $this->civ
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

        public function ActualizarDatosCuenta(){
            $informe = array();
			$this->conexion->beginTransaction();
			try {
				
				$sqlUp = "UPDATE persona AS per 
                          JOIN usuario AS user 
                          USING (idPersona)
                          JOIN ingeniero AS ing
                          USING (idUsuario)
                          SET per.tlf = :tlf,
                          per.tTlf = :tTlf,
                          user.login = :lg,
                          user.email = :em,
                          user.tUser = :tUs,
                          ing.civ = :civ
                          WHERE per.idPersona = :id";
				
                $queryUp = $this->conexion->prepare($sqlUp);        

				$queryUp->execute(array(
					":tlf" => $this->tlf,
					":tTlf" => $this->tTlf,
                    ":lg" => $this->login,
                    ":em"=> $this->email,	
                    ":tUs"=> $this->tUser,	
                    ":civ"=> $this->civ,				
					":id" => $this->idPersona
				));
				
				$resultadoUp = $queryUp;
				
				$rowAfUp = $queryUp->rowCount();
				
				if ($rowAfUp == 0) {
					$informe['rowAf']    = $rowAfUp;
					$informe['errorSms'] = $queryUp->errorInfo();
				} else {
					$informe['rowAf'] = $rowAfUp;
				}
				
				$this->conexion->commit();
				
				return $informe;
				
			}
			catch (\PDOException $e) {
				$this->conexion->rollback();
				die("Error: " . $e->getMessage());
				return $e->getMessage();
			}
        }



    }   
    
?>