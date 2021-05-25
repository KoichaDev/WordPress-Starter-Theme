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

include_once('inc/register_block.php');
include_once('inc/activate_alignment_block.php');

function themename_blocks_register() {
    themename_register_block_type('dummy-text');
    themename_register_block_type('hello-world');
    themename_register_block_type('rich-text');
    themename_register_block_type('team-members');
    themename_register_block_type('team-member');

    $attributes = [
        // This callback will be responsible for the function to display the dynamic Content
        'render_callback'   => 'themename_blocks_render_latests_posts_block',
        'attributes' => [
            'numberOfPosts' => [
                'type'      => 'number',
                'default'   => 5
            ],
            'postsCategories'   => [
                'type'  => 'string',
            ]
        ]
    ];
    themename_register_block_type('latest-posts', $attributes);
}

add_action('init', 'themename_blocks_register');

function themename_blocks_render_latests_posts_block($attributes) {
    return '<p>ijioasdjioasjod</p>';
}
