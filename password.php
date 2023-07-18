
<html lang="en">
<head>
    <title>My password</title>
    <link href="style.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <h1>Password:</h1>
    <p><?php echo $_GET['password'];?></p>
    <h2>Comment: <?php print_r($_GET['comment'])?></h2>
    <a href='index.html'>Reset</a>
</body>
</html>
