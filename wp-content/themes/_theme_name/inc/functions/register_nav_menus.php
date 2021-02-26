<?php

// More Information: 
// https://developer.wordpress.org/reference/functions/register_nav_menus/

if ( ! function_exists( 'iteo_register_nav_menu' ) ) {
 
    function iteo_register_nav_menu(){
        register_nav_menus( array(
            'primary_menu' => __( 'Primary Menu', '_theme_name' ),
            'secondary_menu'  => __( 'Secondary Menu', '_theme_name' ),
            'tertiary_menu'  => __( 'Tertiary Menu', '_theme_name' ),
        ) );
    }
    add_action( 'after_setup_theme', 'iteo_register_nav_menu', 0 );
}