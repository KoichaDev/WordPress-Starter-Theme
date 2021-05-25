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
    themename_register_block_type('latest-posts');
    themename_register_block_type('rich-text');
    themename_register_block_type('team-members');
    themename_register_block_type('team-member');
}

add_action('init', 'themename_blocks_register');
