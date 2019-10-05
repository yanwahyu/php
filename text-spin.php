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
// menghasilkan satu text
function spin($text) {
   //While there's pairs of square brackets, spin whats inside of them
   while (!(strpos($text,'{') === FALSE) && !(strpos($text,'}') === FALSE)) {
       //Find the first '['
       $leftb = strpos($text,'{');

       //Find the first ']'
       $rightb = strpos($text,'}');

       //Split the string up, then (psudo)randomise the item chosen
       $spintext = explode('|',substr($text,$leftb+1,$rightb-$leftb-1));
       $spinselect = trim($spintext[mt_rand(0,count($spintext)-1)]);

       //Get the whole string to replace including the brackets
       $brackettext = substr($text,$leftb,($rightb-$leftb)+1);

       //Replace the [blah,blah2] with whatever item is chosen
       $text = str_replace($brackettext,$spinselect,$text);
   }
   //return the block of modified text
   return $text;
}
echo spin($new_str);
