<?php

add_action('after_setup_theme', function() {

    // Check the DB if the user role has been setup.
    // It's to optimize by not re-adding user role through the DB by figuring out if the user roles which makes it slower
    if( !get_option( 'wpc_roles_created ' )) {
        $site_owner_capability = get_role( 'administrator' ) -> capabilities;
        var_dump($site_owner_capability);

        $remove_capabilities = [
            'switch_themes'         => 1,
            'edit_themes'           => 1,
            'edit_theme_options'    => 1,
            'update_core'           => 1,
            'delete_themes'         => 1,
            'activate_plugins'      => 1,    
            'delete_plugins'        => 1,
            'install_plugins'       => 1,
            'update_plugins'        => 1,
            'edit_plugins'          => 1,
        ];

        // Returns difference between the arrays
        $site_owner_capability = array_diff_key( $site_owner_capability, $remove_capabilities );

        add_role('site_owner', 'Site Owner', $site_owner_capability);

        update_option( 'wpc_roles_created', true);
    }
});