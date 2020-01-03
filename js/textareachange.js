function $(e){return document.querySelector(e)}
var txt = $('#alltext') // textarea 

$('#text').onclick = () => { // dalam ul li
   const t=this.event||window.event;
   const tg=t.target||t.srcElement; // event click
   const tc =tg.textContent; // mendapatkan content dalam li
   if(typeof txt.selectionStart == 'number' && typeof txt.selectionEnd == 'number') {
      changetext(tc); // merubah teks dalam textarea ketikd di klik 
   }
}
function changetext(tc){
   let txv = txt.value // mendatpakan valu textarea
   st = txt.selectionStart, // awal text yang diselect
   en = txt.selectionEnd, // ahkir text yang diselect
   sel1 = txv.substring(st,en), // 
   currentSelection = {
      start: st,
      end: en
     },
   arr1 = sel1.split("\n"), // merubah menjadi array dipisah berdasarkan enter atau /n
   txvs = txv.substr(0, txt.selectionStart).split("\n").length, // mendatpakan posisi rows text
   lines = txt.value.split("\n"), // mendatapakan total row pada textarea
   narr = [] // membuat variable array
   for (let key in arr1){ /// looping array
      lineNum = parseInt(key)+parseInt(txvs) //
      lineNum--;
      var stpos = 0, endPos =txt.value.length;
      for(let x = 0; x < lines.length; x++) {
         if(x == lineNum) {break;}
         stpos += (lines[x].length+1); 
      }
      var enpos = lines[lineNum].length+stpos;
      var xa,xb; // variable merubah posisi highlight tetap pada teks ketika event onclick ditekan
      let sel = txv.substring(stpos, enpos) // hasil
      if(tc == 'bold'){
         if(sel.match(/\*{2}([^*]*)\*{2}/)){ // jika teks "**teks**""
            xa = -2;xb =-2
            narr.push(sel.replace(/\*{2}([^*]+)\*{2}/i,'$1')) 
         }else if(sel.match(/\*([^*]+)\*/)){ // jika teks "*teks"
            xa = 1;xb =1
            narr.push(sel.replace(/\*([^*]+)\*/i,'**$1**')) 
         }else if (sel.match(/\   +(.*)?/)){ // jika teks "   teks"
            xa = 2;xb =2
            narr.push(sel.replace(/\   +(.*)?/i,'   '+'**$1**')) 
         }else if(sel.match(/\ - (.*)?/)){ // jika teks " - teks"
            xa = 2;xb =2
            narr.push(sel.replace(/\- +(.*)?/i,'- '+'**$1**')) 
         }else if(sel){ // jika teks lainnya atau normal
            xa = 2;xb =2
            narr.push('**'+sel+'**') 
         }
      }
      if(tc == 'underline'){
         if(sel.match(/\*{2}([^*]*)\*{2}/)){
            xa = -1;xb =-1
            narr.push(sel.replace(/\*{2}([^*]+)\*{2}/i,'*$1*')) 
         }else if(sel.match(/\*([^*]+)\*/)){
            xa = -1;xb =-1
            narr.push(sel.replace(/\*([^*]+)\*/i,'$1')) 
         }else if (sel.match(/\   +(.*)?/)){
            xa = 1;xb =1
            narr.push(sel.replace(/\   +(.*)?/i,'   '+'*$1*')) 
         }else if(sel.match(/\ - (.*)?/)){
            xa = 1;xb =1
            narr.push(sel.replace(/\- +(.*)?/i,'- '+'*$1*')) 
         }else if(sel){
            xa = 1;xb =1
            narr.push('*'+sel+'*') 
         }
      }
      if(tc == 'code'){
         if (sel.match(/\   +(.*)?/)){
            xa = -3;xb =-3
            narr.push(sel.replace(/\   +(.*)?/i,'$1')) 
         }else if(sel.match(/\*([^*]+)\*/)){
            xa = 3;xb =3
            narr.push('   '+sel) 
         }else if(sel.match(/\*{2}([^*]*)\*{2}/)){
            xa = 3;xb =3
            narr.push('   '+sel) 
         }else if(sel.match(/\ - (.*)?/)){
            xa = 3;xb =3
            narr.push('   '+sel)
         }else if(sel){
            xa = 3;xb =3
            narr.push('   '+sel) 
         }
      }
      if(tc == 'ul'){
         if(sel.match(/\ - (.*)?/)){
            xa = -3;xb =-3
            narr.push(sel.replace(/\ - +(.*)?/i,'$1'))
         }else if(sel.match(/\*([^*]+)\*/)){
            xa = 3;xb =3
            narr.push(' - '+sel) 
         }else if(sel.match(/\*{2}([^*]*)\*{2}/)){
            xa = 3;xb =3
            narr.push(' - '+sel) 
         }else if (sel.match(/\   +(.*)?/)){
            xa = -3;xb =-3
            narr.push(sel.replace(/\   +(.*)?/i,'   '+' - $1')) 
         }else if(sel){
            xa = 3;xb =3
            narr.push(' - '+sel) 
         }
      }
   }
   var resetSelection = (selection,xa,xb) => { // fungsi mereset highlist saat select 1 text
      txt.setSelectionRange(selection.start + xa, selection.end + xb);
      txt.focus();
    }
   let = last = narr.join('\n'); // merubah array menjadi texks dipisaah dengan /n atau enter
   let newtxt=arr1.length == 1?txv.substring(0, stpos)+""+last+""+txv.substring(enpos, txv.length):txv.substring(0, st)+""+last+""+txv.substring(en, txv.length); // jika 1 select menggunakan stpos jika lebih menggunakan st
   if(sel1){txt.value=newtxt;arr1.length == 1?resetSelection(currentSelection,xa,xb):''; } // jika selected tidak kosonh lakukan fungsi dan isi textarea
   
}
