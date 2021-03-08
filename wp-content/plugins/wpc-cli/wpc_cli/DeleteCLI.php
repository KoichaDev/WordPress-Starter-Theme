<?php

class DeleteCLI {

    public function posts($args, $assoc_args) {
        $amount = $assoc_args['amount'];
        // wp_delete_post(309);

        $posts = get_posts([
            'post_type'     => 'post',
            'fields'        => 'ids',
            'numberposts'   => -1,
        ]);

        foreach ($posts as $post) {
            setup_postdata( $post );
            var_dump($post);
            $progress -> tick();
        }



        

        $progress -> finish();

        WP_CLI::success($amount . ' random posts generated!');
    }
}

WP_CLI::add_command('delete', 'DeleteCLI' );
