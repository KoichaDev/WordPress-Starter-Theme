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
    $custom_post_type_files = get_theme_file_path("../_theme_name/inc/inline-styles/*.php");
    
    // Load Regular CSS 
    wp_enqueue_style( '_theme_name-style-sheet', get_template_directory_uri() . '/dist/index.css', [], filemtime( get_stylesheet_directory() . '/dist/index.css' ), 'all' );

    // Autoload inline-styles
    auto_load_files_from_folder($custom_post_type_files);
  
    // Load regular JavaScript
    wp_enqueue_script( '_theme_name-javascript', get_template_directory_uri() . '/dist/index.js', ['jquery'], filemtime( get_stylesheet_directory() . '/dist/index.js' ), false );
}

add_filter( 'script_loader_tag', '_theme_name_script_defer', 10 );
add_action( 'wp_enqueue_scripts', '_theme_name_scripts_and_styles' );
