<?php

class DeleteData {
    
    public function all_media_items($args, $assoc_args) {
        $progress = \WP_CLI\Utils\make_progress_bar( 'Deleting...', $status );

        $attachments = get_posts( array(
            'post_type' => 'attachment',
            'posts_per_page' => -1,
            'post_parent' => $post->ID,
            'exclude'     => get_post_thumbnail_id()
        ));

        foreach ($attachments as $attachment) {
            wp_delete_attachment( $attachment -> ID, true );
            $upload_info = wp_get_upload_dir();
            $file        = $upload_info['basedir'] . '/*.jpg';
            $progress -> tick();
        }

      
        $progress -> finish();

        WP_CLI::success('All Media Item(s) has been deleted!');
    }


    public function all_trash($args, $assoc_args) {
        $progress = \WP_CLI\Utils\make_progress_bar( 'Deleting...', $status );

        $posts = get_posts([
            'post_type'         =>  $assoc_args['post_type'],
            'post_status'       => 'trash',
            'fields'            => 'ids',
            'posts_per_page'    => -1,
        ]);

        foreach ($posts as $post) {
            setup_postdata( $post );
            wp_delete_post($post, true);
            $progress -> tick();
        }
        $progress -> finish();

        WP_CLI::success('All Post(s) deleted!');
    }

    public function all_posts($args, $assoc_args) {
        $progress = \WP_CLI\Utils\make_progress_bar( 'Deleting...', $status );

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

WP_CLI::add_command('delete', 'DeleteData' );
