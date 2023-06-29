<?php
    try {
        // Load db data
        include "config.php";
        $connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

        if (mysqli_connect_errno()) {
            throw new Exception("DB connection failed: " . mysqli_connect_error() . " (" . mysqli_connect_errno() . ")");
        }

        $query = "SELECT * FROM tbl_67_books";
        $result = mysqli_query($connection, $query);

        if (!$result) {
            throw new Exception("DB query failed: " . mysqli_error($connection));
        }

        $data = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }

        mysqli_close($connection);
        header('Content-Type: application/json');       //what type of resonse the browser excpected for
        echo json_encode(utf8ize($data));
    } catch (Exception $e) {
        echo "An error occurred: " . $e->getMessage();
    }

    function utf8ize($d) {                      //to get books list response in the right format     //gpt sais :)
        if (is_array($d)) {
            foreach ($d as $k => $v) {
                $d[$k] = utf8ize($v);
            }
        } else if (is_string ($d)) {
            return mb_convert_encoding($d, 'UTF-8', 'ISO-8859-1');
        }
        return $d;
    }
?>