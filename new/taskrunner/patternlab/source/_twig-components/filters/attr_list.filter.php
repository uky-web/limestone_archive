<?php 

$filter = new Twig_SimpleFilter('attr_list', function ($arr) {
    $str = '';
    if (is_array($arr)) {
        $attributes = [];
        foreach($arr as $key=>$value){
        // while(list($key,$value) = each($arr)) {
            $key = str_replace('_','-',$key);
            $attributes[] = $key . '=' . $value;
        }
        if (!empty($attributes)) {
            $str = implode(' ', $attributes);
        }
    }
    return $str;
});
