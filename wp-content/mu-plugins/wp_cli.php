<?php

if ( ! defined( 'ABSPATH' ) ) {
    die;
}

// We don't do anything, unless we are absolutely on the CLI by doing 'truthy' if we are activaly using the WP CLI 
if( defined('WP_CLI') && WP_CLI) {
    require_once 'wpc-cli/vendor/fzaninotto/Faker/src/autoload.php';
    $folder_path = glob( dirname(__FILE__)  . '/wpc-cli/*.php' ); 
    foreach ($folder_path as $file_name) {
        require $file_name;
    }
}

