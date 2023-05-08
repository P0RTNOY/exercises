<!DOCTYPE html>
<html>
<head>
    <title>Edit Character</title>
</head>
<body>
    <h1>Edit Character</h1>

    <?php if(isset($_GET['char_type']) && isset($_GET['char_clothing']) && isset($_GET['char_weapon'])): ?>
    <p>You character is:</p>
    <ul>
        <li>Character Type: <?php echo $_GET['char_type']; ?></li>
        <li>Clothing Set: <?php echo $_GET['char_clothing']; ?></li>
        <li>Weapon: <?php echo $_GET['char_weapon']; ?></li>
    </ul>
    <!-- <?php else: ?>
    <p>Please make your selections and click the "Save Character" button.</p> -->
    <a href="./edit.html">go back</a>
    <?php endif; ?>
    
</body>
</html>