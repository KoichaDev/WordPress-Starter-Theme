<?php 

function _theme_name_script_defer( $url ) {
    if ( is_admin() ) {
        return $url; //don't break WP Admin
    } 

    if ( false === strpos( $url, '.js' ) ) {
        return $url;
    } 

    if ( strpos( $url, 'jquery.js' ) ) {
        return $url;
    } 
    return str_replace( ' src', ' defer src', $url );
} 

function _theme_name_scripts_and_styles() {
    wp_enqueue_style( '_theme_name-style-sheet', get_template_directory_uri() . '/dist/index.css', [], '_theme_name_version', 'all' );
    wp_enqueue_script( '_theme_name-javascript', get_template_directory_uri() . '/dist/index.js', ['jquery'], '_theme_name_version', false );
}

add_filter( 'script_loader_tag', '_theme_name_script_defer', 10 );
add_action( 'wp_enqueue_scripts', '_theme_name_scripts_and_styles' );
