<?php 

    if (!function_exists( '_theme_name_custom_image_sizes')){
        function _theme_name_custom_image_sizes() {
            // add_image_size( '_theme_name_custome_image_size_title', 699, 422, true );
        }
    }
    add_action( 'after_setup_theme', '_theme_name_custom_image_sizes' );
