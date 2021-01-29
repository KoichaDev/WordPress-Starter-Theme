<?php 

function theme_scripts_and_styles() {
    wp_enqueue_style( 'working-group-two-style-sheet', get_template_directory_uri() . '/dist/index.css' );
    wp_enqueue_script( 'working-group-two-javascript', get_template_directory_uri() . '/dist/index.js' );
}

add_action( 'wp_enqueue_scripts', 'theme_scripts_and_styles' );