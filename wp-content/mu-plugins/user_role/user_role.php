<?php 

class UserRole {
    protected $function_name = [
        'disable_none_admin_capabilities',
        'disable_update_notification_none_admin_user',
    ];

    function __construct(){
        $this -> initiate_hooks($this -> function_name);
    }

    function initiate_hooks($callbacks = []) {
        foreach ($callbacks as $key => $callback) { 
            if( !function_exists( $callback ) ) {
                // $this is is used to find the function outside of a class
                add_action( 'init', [ $this, $callback ] );
            } else {
                add_action( 'after_setup', [ $this, $callback ] );
            }
        }
    }

    function disable_none_admin_capabilities() {
        // Check the DB if the user role has been setup.
        // It's to optimize by not re-adding user role through the DB by figuring out if the user roles which makes it slower
        if( !get_option( 'wpc_roles_created ' )) {
            $site_owner_capability = get_role( 'administrator' ) -> capabilities;

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
    }

    function disable_update_notification_none_admin_user() {
            $admin_role = wp_get_current_user() -> roles[0];
            
            if( $admin_role !== 'administrator' ) {
            // hide update notifications
            function remove_core_updates(){
                global $wp_version;
                return (object) [
                    'last_checked'   => time(),
                    'version_checked'=> $wp_version,
                ];
            }
            add_filter('pre_site_transient_update_core','remove_core_updates'); //hide updates for WordPress itself
            add_filter('pre_site_transient_update_plugins','remove_core_updates'); //hide updates for all plugins
            add_filter('pre_site_transient_update_themes','remove_core_updates'); //hide updates for all themes
        }
    }
}

new UserRole();




