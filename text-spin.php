$str = "ini web adalah program agar membuat java sederhana";
$new_str = strtolower($str);
$replaceWith = [
   'java|web|situs',
   'agar|untuk',
   'sederhana|simple',
];

foreach ($replaceWith as $key) {
   
   $a = explode('|',$key);
   foreach ($a as $as =>$val) {
      if (strpos($str, $val) !== false) {
         
         $love = str_replace($val.'|','',$key);

         $pattern = sprintf('/{[^}]+}(*SKIP)(*F)|%s/', preg_quote($val, '/'));
         $new_str = preg_replace($pattern, '{'.$love.'}', $new_str);
     }
     
   }

}
print_r($new_str);
