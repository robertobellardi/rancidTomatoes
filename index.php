<?php 
    include("top.html");
    if (!isset($_SESSION)){
        session_start();
    if(!isset($_SESSION["flash"]))
        $_SESSION["flash"]="Prima di proseguire registrati oppure effettua il login";
    }
    include("login_logout/login.php");
    include("bottom.php");
?>