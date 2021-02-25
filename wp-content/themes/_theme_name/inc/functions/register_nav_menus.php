<?php

// More Information: 
// https://developer.wordpress.org/reference/functions/register_nav_menus/

if ( ! function_exists( '_theme_name_register_nav_menu' ) ) {
 
    function _theme_name_register_nav_menu(){
        register_nav_menus( array(
            'primary_menu' => __( 'Primary Menu', '_theme_name' ),
            'footer_menu'  => __( 'Footer Menu', '_theme_name' ),
        ) );
    }
    add_action( 'after_setup_theme', '_theme_name_register_nav_menu', 0 );
}