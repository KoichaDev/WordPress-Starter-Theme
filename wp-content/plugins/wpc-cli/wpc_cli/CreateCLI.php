<?php

class CreateData {
    public $post_id;
    public $post_title;
    public $post_content;
    public $post_excerpt;
    
      public function post($args, $assoc_args) {

        if($assoc_args['post_type']) {

            $faker = Faker\Factory::create();
            $progress = \WP_CLI\Utils\make_progress_bar( 'Generating single post', $amount );

            $this -> post_title   = $faker -> firstName . ' ' . $faker -> lastName;
            $this -> post_content = $faker -> sentence($nbWords = rand(200, 500), $variableNbWords = true);
            $this -> post_excerpt = $faker -> sentence($nbWords = rand(50, 100), $variableNbWords = true);
            
            $this -> post_id = wp_insert_post([
                'post_type'     => $assoc_args['post_type'],
                'post_status'   => 'publish',
                'post_title'    => $this -> post_title,
                'post_content'  => $this -> post_content,
                'post_excerpt'  => $this -> post_excerpt,
            ]);

            $args = [
                'redirection' => 0 // Don't follow any 300-range redirections
            ];
                
            $response = wp_remote_get( 'https://picsum.photos/640/360', $args );

            $image_url = $response['headers']['location'];
            
            $feature_image = media_sideload_image(
                $image_url,
                $this  -> post_id,
                $this -> post_title,
                'id'
            );
            
            // wp_update_post($faker -> numberBetween(2, 10), array_rand( array_flip( $random_image ) ), $floorplan);
            set_post_thumbnail($this -> post_id, $feature_image);

            $progress -> tick();
            
            $progress -> finish();

            WP_CLI::success('A random post generated!');
        } else {
            $home_type_ids = array_map(function ($home_type) {
                return $home_type -> term_id;
            }, $home_type_terms);

            $faker = Faker\Factory::create();
            $progress = \WP_CLI\Utils\make_progress_bar( 'Generating single post', $amount );
            
            $this -> post_title   = $faker -> firstName . ' ' . $faker -> lastName;
            $this -> post_content = $faker -> sentence($nbWords = rand(200, 500), $variableNbWords = true);
            $this -> post_excerpt = $faker -> sentence($nbWords = rand(50, 100), $variableNbWords = true);
            
            $this -> post_id = wp_insert_post([
                'post_type'     => 'post',
                'post_status'   => 'publish',
                'post_title'    => $this -> post_title,
                'post_content'  => $this -> post_content,
                'post_excerpt'  => $this -> post_excerpt,
            ]);

            $args = [
                'redirection' => 0 // Don't follow any 300-range redirections
            ];
                
            $response = wp_remote_get( 'https://picsum.photos/640/360', $args );

            $image_url = $response['headers']['location'];
            
            $feature_image = media_sideload_image(
                $image_url,
                $this  -> post_id,
                $this -> post_title,
                'id'
            );
            
            // wp_update_post($faker -> numberBetween(2, 10), array_rand( array_flip( $random_image ) ), $floorplan);
            set_post_thumbnail($this -> post_id, $feature_image);

            $progress -> tick();
            

            $progress -> finish();

            WP_CLI::success( 'A random post generated!');
        }
    }

    public function posts($args, $assoc_args) {
        $amount = $assoc_args['total'];

        if($assoc_args['post_type']) {
            $home_type_terms = get_terms([
                'taxonomy'      => 'category',
                'hide_empty'    => false, // We want to bring all kind of 'category, even if it's not a post assocated with them
            ]);

            $home_type_ids = array_map(function ($home_type) {
                return $home_type -> term_id;
            }, $home_type_terms);

            $faker = Faker\Factory::create();
            $progress = \WP_CLI\Utils\make_progress_bar( 'Generating post(s)', $amount );
            
            for ($i=0; $i < $amount; $i++) {

                $this -> post_title   = $faker -> firstName . ' ' . $faker -> lastName;
                $this -> post_content = $faker -> sentence($nbWords = rand(200, 500), $variableNbWords = true);
                $this -> post_excerpt = $faker -> sentence($nbWords = rand(50, 100), $variableNbWords = true);
                
                $this -> post_id = wp_insert_post([
                    'post_type'     => $assoc_args['post_type'],
                    'post_status'   => 'publish',
                    'post_title'    => $this -> post_title,
                    'post_content'  => $this -> post_content,
                    'post_excerpt'  => $this -> post_excerpt,
                ]);

                $args = [
                    'redirection' => 0 // Don't follow any 300-range redirections
                ];
                    
                $response = wp_remote_get( 'https://picsum.photos/640/360', $args );

                $image_url = $response['headers']['location'];
                
                $feature_image = media_sideload_image(
                    $image_url,
                    $this  -> post_id,
                    $this -> post_title,
                    'id'
                );
                
                // wp_update_post($faker -> numberBetween(2, 10), array_rand( array_flip( $random_image ) ), $floorplan);
                set_post_thumbnail($this -> post_id, $feature_image);

                $progress -> tick();
            }

            $progress -> finish();

            WP_CLI::success($amount . ' random posts generated!');
        } else {
            $home_type_terms = get_terms([
            'taxonomy'      => 'category',
            'hide_empty'    => false, // We want to bring all kind of 'category, even if it's not a post assocated with them
            ]);

            $home_type_ids = array_map(function ($home_type) {
                return $home_type -> term_id;
            }, $home_type_terms);

            $faker = Faker\Factory::create();
            $progress = \WP_CLI\Utils\make_progress_bar( 'Generating post(s)', $amount );
            
            for ($i=0; $i < $amount; $i++) {

                $this -> post_title   = $faker -> firstName . ' ' . $faker -> lastName;
                $this -> post_content = $faker -> sentence($nbWords = rand(200, 500), $variableNbWords = true);
                $this -> post_excerpt = $faker -> sentence($nbWords = rand(50, 100), $variableNbWords = true);
                
                $this -> post_id = wp_insert_post([
                    'post_type'     => 'post',
                    'post_status'   => 'publish',
                    'post_title'    => $this -> post_title,
                    'post_content'  => $this -> post_content,
                    'post_excerpt'  => $this -> post_excerpt,
                ]);

                $args = [
                    'redirection' => 0 // Don't follow any 300-range redirections
                ];
                    
                $response = wp_remote_get( 'https://picsum.photos/640/360', $args );

                $image_url = $response['headers']['location'];
                
                $feature_image = media_sideload_image(
                    $image_url,
                    $this  -> post_id,
                    $this -> post_title,
                    'id'
                );
                
                // wp_update_post($faker -> numberBetween(2, 10), array_rand( array_flip( $random_image ) ), $floorplan);
                set_post_thumbnail($this -> post_id, $feature_image);

                $progress -> tick();
            }

            $progress -> finish();

            WP_CLI::success($amount . ' random posts generated!');
        }
    }
}

WP_CLI::add_command('create', 'CreateData' );

