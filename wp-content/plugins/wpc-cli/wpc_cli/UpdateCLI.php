<?php

class UpdateCLI {

    public function untrash_posts($args, $assoc_args) {
        $id = $assoc_args['id'];
        wp_untrash_post( $id );
        WP_CLI::success('Post ID ' . $id  . ' successfully untrashed!');
    }
}

WP_CLI::add_command('update', 'UpdateCLI' );
