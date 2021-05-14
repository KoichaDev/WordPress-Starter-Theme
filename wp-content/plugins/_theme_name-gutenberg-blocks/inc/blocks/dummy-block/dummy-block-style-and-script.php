<?php

function themename_blocks_register() {

    wp_register_script(
        'themename-blocks-editor',
        plugins_url('../../../dist/editor.js', __FILE__),
        ['wp-blocks', 'wp-i18n', 'wp-element']
    );


    register_block_type(
        'mytheme-blocks/dummy-block',
        [
            'editor_script' => 'themename-blocks-editor',
            // 'editor_style',
            // 'script',
            // 'style',
        ]
    );
}


add_action('init', 'themename_blocks_register');
