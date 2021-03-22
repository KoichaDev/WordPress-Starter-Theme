<?php

if ( ! defined( 'ABSPATH' ) ) {
    die;
}

$folder_path = glob(plugin_dir_path( __FILE__ ) . '**/*.php'); 

foreach ($folder_path as $file_name) {
    require $file_name;
}


