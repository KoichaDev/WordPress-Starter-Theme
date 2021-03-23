<?php

if( !function_exists( '_theme_name_sidebar_widgets' )) {

    function _theme_name_sidebar_widgets() {
        register_sidebar([
            'id' => 'primary-sidebar',
            'name' => esc_html__('Primary Sidebar', '_theme_name'),
            'description' => esc_html__('This sidebar appears in the blog post page', '_theme_name'),
            // %1$s WP will create automatically an ID and %2$s WP will create a placeholder
            'before_widget' => '<section id="%1$s" class="widget %2$s">', // This will be any HTMl print before the widget
            'after_widget' => '</section>',
            'before_title' => '<h2>',
            'after_title' => '</h2>'
        ]);
    }
    add_action('widgets_init', '_theme_name_sidebar_widgets');

}