<?php

class DeleteCLI {

    public function all_posts($args, $assoc_args) {
            $progress = \WP_CLI\Utils\make_progress_bar( 'Updating...', $status );

        $posts = get_posts([
            'post_type'     => $assoc_args['post_type'],
            'fields'        => 'ids',
            'posts_per_page'   => -1,
        ]);

        foreach ($posts as $post) {
            setup_postdata( $post );
            wp_delete_post($post, true);
            $progress -> tick();
        }
        $progress -> finish();

        WP_CLI::success('All Post(s) deleted!');
    }
}

WP_CLI::add_command('delete', 'DeleteCLI' );
