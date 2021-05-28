<?php

// This is to rename the dropdown window that which has the title as "Default tempalte"
function rename_default_template_name($label, $context) {
    return __('Full width / Stretched', 'textdomain');
}

add_filter('default_page_template_title', 'rename_default_template_name', 10, 2);
