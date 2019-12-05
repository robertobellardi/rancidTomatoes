<?php
        if (isset($_SESSION["nome"])) {
?>
            <div id="logout">
                <form  action="login_logout/logout.php" method="post">
                    <input type="submit" value="Log out">
                    <input type="hidden" name="logout" value="true">
                </form>
            </div>
<?php
    }
?>
            <div id="w3c">
                <a href="http://validator.w3.org/check/referer">
                    <!--<img src="http://www.cs.washington.edu/education/courses/cse190m/12sp/homework/4/w3c-html.png" alt="Valid HTML"/>-->
                    <img src="img/htmlvalidator.png" alt="Valid HTML"/>
                </a>
                
                <a href="http://jigsaw.w3.org/css-validator/check/referer">
                    <!--<img src="http://jigsaw.w3.org/css-validator/images/vcss" alt="Valid CSS" />-->
                    <img src="img/cssvalidator.png" alt="Valid HTML"/>
                </a>
            </div>
	</body>
</html>
