<?php
    // load json categories
    $filePath = '../data/books.json';
    if (file_exists($filePath)) {
        $jsonData = file_get_contents($filePath);
        $data = json_decode($jsonData, true);
        $categories = $data['categories'];
        echo json_encode($categories);
    } else {
        echo "File not found.";
    }
?>