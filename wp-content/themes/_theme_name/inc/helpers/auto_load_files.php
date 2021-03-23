<?php 

function auto_load_files_from_folder($folder_path = '') {
    // autoload every files a folder
    foreach (glob($folder_path) as $file_name) {
        require $file_name;
    }
}