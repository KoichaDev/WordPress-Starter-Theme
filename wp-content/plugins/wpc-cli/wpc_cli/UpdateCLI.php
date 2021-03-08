<?php

class UpdateCLI {

    public $progress; 

    public function untrash_post($args, $assoc_args) {
        $id = $assoc_args['id'];
        wp_untrash_post( $id );
        WP_CLI::success('Post ID ' . $id  . ' successfully untrashed!');
    }

    public function untrash_all_posts($args, $assoc_args) {

        $this -> progress = \WP_CLI\Utils\make_progress_bar( 'Updating...', $status );

        $posts = get_posts([
            'posts_per_page'    => -1,
            'post_status'       => 'trash',
            'post_type'         => 'post',
            'fields'            => 'ids', // Only get post ID's
        ]);

        if(isset( $assoc_args['publish'])) {
            foreach ( $posts as $post ) {
                wp_untrash_post( $post); // Set to False if you want to send them to Trash.   
                wp_publish_post( $post );
                $this -> progress -> tick();
            }
            $this -> progress -> finish();
            WP_CLI::success('Successfully published and untrashed the post(s)');
        } else if(isset( $assoc_args['draft'])) {
            foreach ( $posts as $post ) {
                wp_untrash_post( $post); // Set to False if you want to send them to Trash.   
                $progress -> tick();
            }
            $this -> progress -> finish();
            WP_CLI::success('Successfully drafted and untrashed the post(s)');
        } else {
            WP_CLI::error('Invalid argument. wp update --help to retrieve list');
        }

        add_action( 'trash_to_publish',  'untrash_all_posts', 10, 1 );
    }
}

WP_CLI::add_command('update', 'UpdateCLI' );
