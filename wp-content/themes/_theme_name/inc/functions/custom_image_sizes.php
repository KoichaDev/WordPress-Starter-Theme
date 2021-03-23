<?php 

    if (!function_exists( '_theme_name_custom_image_sizes')){
        function _theme_name_custom_image_sizes() {
            // add_image_size( 'wgtwo_recent_article_custom_image', 699, 422, true );
        }
    }
    add_action( 'after_setup_theme', '_theme_name_custom_image_sizes' );
