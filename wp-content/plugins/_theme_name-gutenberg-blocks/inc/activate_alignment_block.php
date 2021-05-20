<?php

if (!function_exists('activate_alignment_block')) {

    function activate_alignment_block() {
        add_theme_support('align-wide');
    }
    add_action('after_setup_theme', 'activate_alignment_block');
}
