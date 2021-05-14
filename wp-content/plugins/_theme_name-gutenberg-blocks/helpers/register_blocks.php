<?php

function themename_register_block_type($block_name = '', $args = []) {
    wp_register_script(
        'themename-register-block-editor-script',
        plugins_url('../dist/editor.js', __FILE__),
        ['wp-blocks', 'wp-i18n', 'wp-element']
    );

    wp_register_style(
        'themename-register-block-editor-style',
        plugins_url('../dist/editor.css', __FILE__),
        ['wp-edit-blocks'],
    );

    register_block_type(
        'mytheme-blocks/' . $block_name,
        array_merge(
            [
                'editor_script' => 'themename-register-block-editor-script',
                'editor_style'  => 'themename-register-block-editor-style',
                'script'        => '',
                'style'         => ''
            ],
            $args
        )
    );
}
