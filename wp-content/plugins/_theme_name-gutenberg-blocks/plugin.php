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
    $args = [
        'posts_per_page' => $attributes['numberOfPosts']
    ];
    $query = new WP_Query($args);
    $posts = '';

    if ($query->have_posts()) {
        $posts .= '<ul class="wp-blocks-mytheme-blocks-latest-posts">';
        while ($query->have_posts()) {
            $query->the_post();
            $posts .= '<li><a href="' . esc_url(get_the_permalink()) . '">' . get_the_title() . '</a></li>';
        }
        $posts .= '</ul>';
        wp_reset_postdata();
        return $posts;
    } else {
        return '<div>' . __('No WP Posts found', 'themename-blocks') . ' </div>';
    }
}
