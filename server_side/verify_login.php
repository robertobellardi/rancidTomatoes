<?php 
    include("function.php");

     if(!isset($_SESSION)) {
         session_start();
     }
    $config=require("../db/config.php");

    if(isset($_POST["registrazione"])){
        unset($_POST["registrazione"]);
                        
        $nome=htmlspecialchars($_POST["nome"]);
        $cognome=htmlspecialchars($_POST["cognome"]);
        $passw=htmlspecialchars($_POST["password"]);
        $genere=htmlspecialchars($_POST["genere"]);
        $giorno=htmlspecialchars($_POST["giorno"]);
        $mese=htmlspecialchars($_POST["mese"]);
        $anno=htmlspecialchars($_POST["anno"]);

        $db=connection($config);
        
        if($db){        
            $pass=query_utente($db,$nome,$cognome);
            if(count($pass)==0){
                $passw=password_hash($passw,PASSWORD_BCRYPT); //cripto la password

                $qnome=$db->quote($nome);
                $qcognome=$db->quote($cognome);
                $qpassword=$db->quote($passw);
                $qgenere=$db->quote($genere);
                $qgiono=$db->quote($giorno);
                $qmese=$db->quote($mese);
                $qanno=$db->quote($anno);

                $db->query("insert into utenti(nome,cognome,password,genere,giorno,mese,anno) values ($qnome,$qcognome,$qpassword,$qgenere,$qgiono,$qmese,$qanno)"); 

                $_SESSION["nome"]=$nome;
                $_SESSION["cognome"]=$cognome;

                if($genere=="M")
                    $_SESSION["login"]="Benvenuto";
                else
                    $_SESSION["login"]="Benvenuta";

                if($db)
                    $erroredb="false";
                else
                    $erroredb="true";

                $json=array("erroredb" => $erroredb,"registrazione" =>"true");
                header('Content-type: application/json');
                print json_encode($json);
            }
            else{
                $json=array("erroredb" => "false","registrazione" =>"false");
                header('Content-type: application/json');
                print json_encode($json);
            }
        }else{
            $json=array("erroredb" => "true","registrazione" =>"false");
            header('Content-type: application/json');
            print json_encode($json);
        }
    }
    if(isset($_POST["accesso"])){
        unset($_POST["accesso"]);
        
        $nome=$_POST["nome"];
        $cognome=$_POST["cognome"];
        $passw=$_POST["password"];
        
        $db=connection($config);
        
        if($db){
            $vet=query_utente($db,$nome,$cognome);
            if($vet == true || $vet == false){
                if(count($vet)==0){            
                    $json=array("erroredb" =>"false","vuoto" =>"true");
                    header('Content-type: application/json');
                    print json_encode($json);            
                }
                else{
                    if(password_verify($passw,$vet[0]["password"])==true){
                        if (isset($_SESSION)) {
                            session_regenerate_id(TRUE);
                        }
                        $_SESSION["nome"] = $nome;
                        $_SESSION["cognome"]=$cognome;

                        if($vet[0]["genere"]=="M")
                            $_SESSION["login"]="Bentornato";
                        else
                            $_SESSION["login"]="Bentornata";

                        $json=array("erroredb" =>"false","login" =>"true");
                        header('Content-type: application/json');
                        print json_encode($json);
                    }
                    else{
                        $json=array("erroredb" =>"false","login" =>"false");
                        header('Content-type: application/json');
                        print json_encode($json);
                    }           
                }
            }else{
                $json=array("erroredb" =>"true");
                header('Content-type: application/json');
                print json_encode($json);
            }
        }
        else{
            $json=array("erroredb" =>"true");
            header('Content-type: application/json');
            print json_encode($json);
        }
    }