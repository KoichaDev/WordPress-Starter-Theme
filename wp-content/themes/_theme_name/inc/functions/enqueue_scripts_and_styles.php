<?php 

function _theme_name_script_defer( $tag, $handle, $src ) {
    if ( 'index' !== $handle ) {
		return $tag;
	}
	return str_replace( ' src', ' defer src', $tag ); // defer the script
} 

function _theme_name_scripts_and_styles() {
    wp_enqueue_style( '_theme_name-style-sheet', get_template_directory_uri() . '/dist/index.css' );
    wp_enqueue_script( '_theme_name-javascript', get_template_directory_uri() . '/dist/index.js' );
}


add_filter( 'script_loader_tag', '_theme_name_script_defer', 10, 3 );
add_action( 'wp_enqueue_scripts', '_theme_name_scripts_and_styles' );