<?php

function themename_register_block_type($block_name = '', $args = []) {
    // Enqueuing Script and styles for the Gutenberg Block on the editor as "back-end"
    wp_register_script(
        'themename-register-block-editor-script',
        plugins_url('../dist/entry.js', __FILE__),
        ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-blob', 'wp-data']
    );

    wp_register_style(
        'themename-register-block-editor-style',
        plugins_url('../dist/entry.css', __FILE__),
        ['wp-edit-blocks'],
    );

    register_block_type(
        'themename-block/' . $block_name,
        array_merge(
            [
                // Enquing Script and styles for "back-end"
                'editor_script' => 'themename-register-block-editor-script',
                'editor_style'  => 'themename-register-block-editor-style',
                // Enquing Script and styles for "front-end"
                'script'        => 'themename-register-block-editor-script',
                'style'         => 'themename-register-block-editor-style'
            ],
            $args
        )
    );
}
