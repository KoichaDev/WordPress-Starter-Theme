<?php 
    $custom_post_type_files = get_theme_file_path("../_theme_name/inc/functions/custom_post_types/*.php");
    
    // Autoload every files inside the custom post type folder
    auto_load_files_from_folder( $custom_post_type_files );