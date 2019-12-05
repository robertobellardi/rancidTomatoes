<?php
    include("../server_side/function.php");
    session_unset();
    session_destroy();
    session_start();
    redirect("../index.php", "Logout successful.");
?>
