<?php

// For more information:
// https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/

if ( function_exists( 'add_theme_support' ) ) {
    add_theme_support( 'post-thumbnails' );
    set_post_thumbnail_size( 150, 150, true ); // default Featured Image dimensions (cr
}

