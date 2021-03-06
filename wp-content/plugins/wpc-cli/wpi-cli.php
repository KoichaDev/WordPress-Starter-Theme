<?php 
/**
 * Plugin Name:       WPI CLI 
 * Plugin URI:        http://iteo.no/
 * Description:       Custom WP-CLI Commands
 * Version:           1.0.0
 * Author:            Khoi Hoang
 * Author URI:        http://iteo.no/
 */

if ( ! defined( 'ABSPATH' ) ) {
    die;
}

// We don't do anything, unless we are absolutely on the CLI by doing 'truthy' if we are activaly using the WP CLI 
if( defined('WP_CLI') && WP_CLI) {
    require_once plugin_dir_path(__FILE__) . '/vendor/fzaninotto/Faker/src/autoload.php';
    $folder_path = glob(plugin_dir_path( __FILE__ ) . 'wpc_cli/*.php'); 

    foreach ($folder_path as $file_name) {
        require $file_name;
    }

}

