<?php

class UpdateCLI {

    public $progress; 

    public function untrash_post($args, $assoc_args) {
        $id = $assoc_args['id'];

        switch (true) {
            case $assoc_args['publish']:
                wp_untrash_post( $id );
                wp_publish_post( $id );
                WP_CLI::line('Post ID: ' . $id);
                WP_CLI::line('Post Title: ' . get_the_title( $id ));
                WP_CLI::line('successfully published and untrashed!');
                break;
            case $assoc_args['draft']:
                wp_untrash_post( $id );
                WP_CLI::line('Post ID: ' . $id);
                WP_CLI::line('Post Title: ' . get_the_title( $id ));
                WP_CLI::line('successfully draft and untrashed!');
                break;
            case $assoc_args['info']:
                WP_CLI::line('');
                WP_CLI::line('DESCRIPTION:');
                WP_CLI::line('  Manage untrash post WordPress command-line');
                WP_CLI::line('');
                WP_CLI::line('SYPNOSIS:');
                WP_CLI::line('  wp update untrash_post');
                WP_CLI::line('');
                WP_CLI::line('PARAMETER:');
                WP_CLI::line('  --id=<post_id> [--publish|--draft]');
                break;
            default:
                WP_CLI::error('Invalid argument!', false);
                WP_CLI::line('For More info: wp untrash_post --info');
                break;
        }      
    }

    public function untrash_all_posts($args, $assoc_args) {

        $this -> progress = \WP_CLI\Utils\make_progress_bar( 'Updating...', $status );

        if( post_type_exists( $assoc_args['post_type'] ) ) {
            $posts = get_posts([
                'posts_per_page'    => -1,
                'post_status'       => 'trash',
                'post_type'         => $assoc_args['post_type'],
                'fields'            => 'ids', // Only get post ID's
            ]);

            if( isset( $assoc_args['publish'] ) ) {
                foreach ( $posts as $post ) {
                    wp_untrash_post( $post); // Set to False if you want to send them to Trash.   
                    wp_publish_post( $post );
                    $this -> progress -> tick();
                }
                $this -> progress -> finish();
                WP_CLI::success( 'Successfully published and untrashed the post(s)' );
            } else if( isset( $assoc_args['draft']) ) {
                foreach ( $posts as $post ) {
                    wp_untrash_post( $post); // Set to False if you want to send them to Trash.   
                    $progress -> tick();
                }
                $this -> progress -> finish();
                WP_CLI::success( 'Successfully drafted and untrashed the post(s)' );
            } else {
                WP_CLI::error( 'Invalid argument. wp update --help to retrieve list' );
            }
        } else {
            WP_CLI::error( 'Post Type does not exist!' );
        }      
        add_action( 'trash_to_publish',  'untrash_all_posts', 10, 1 );
    }
}

WP_CLI::add_command( 'update', 'UpdateCLI' );
