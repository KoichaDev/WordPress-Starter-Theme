<?php

/**
 * Template Name: Full width / Contained
 */

get_header();

global $post;
if (have_posts()) { ?>
    <main class="main-page-contained">
        <?php
        while (have_posts()) {
            the_post();
            $slug_name = $post->post_name;
            get_template_part('template-parts/page/page', $slug_name ? $slug_name : 'page');
        }; ?>
    </main>
<?php
} else {
    _e('Sorry, no page were found.', '_theme_name');
}
get_footer();
