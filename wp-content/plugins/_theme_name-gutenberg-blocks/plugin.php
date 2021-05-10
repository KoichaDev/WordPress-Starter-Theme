<?php

/**
 * Plugin Name: Gutenberg Dummy Block
 * Plugin URI: http://iteo.no/
 * Description: Dummy Block for Gutenberg
 * Author: Khoi Hoang
 * Author URI: http://iteo.no/
 */

if (!defined('ABSPATH')) {
    exit;
}

function myfirst_blocks_register() {

    wp_register_script(
        'myfirst-blocks-editor',
        plugins_url('blocks/FirstBlock/FirstBlock.js', __FILE__),
        ['wp-blocks', 'wp-i18n']
    );


    register_block_type(
        'mytheme-blocks/firstblock',
        [
            'editor_script' => 'myfirst-blocks-editor',
            // 'editor_style',
            // 'script',
            // 'style',
        ]
    );
}


add_action('init', 'myfirst_blocks_register');
