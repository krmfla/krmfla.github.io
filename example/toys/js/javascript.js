// JavaScript Document

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

//選單menu
$(document).ready(function(e) {
	$(".channel_m").css('display','none');
	$('.channel_btn').click(function(){
		 if($('.channel_m').css("display") == "block"){
		 myimage.src="images/menu.jpg";
		 $(".channel_m").slideUp(300);
		 }
		 else{
		 myimage.src="images/close.jpg";
		 $(".channel_m").slideDown(300);
		 }	
	});
});

//fb_share
$(document).ready(function(e) {
	$('.share').click(function(){
		$(".result_bottom").css('display','none');
		$(".result_bottom2").css('display','block');
	});
});

//gift_bt 
$(document).ready(function(e) {
	$(".gift_bottom2").css('display','none');
	$('.giftb').click(function(){
		giftimage1.src="images/gifta_off.png";
		giftimage2.src="images/giftb_on.png";
		$(".gift_infoblock").fadeOut(300);
		$(".gift_bottom2").fadeIn(300);
	});
	$('.gifta').click(function(){
		giftimage1.src="images/gifta_on.png";
		giftimage2.src="images/giftb_off.png";
		$(".gift_bottom2").fadeOut(300);
		$(".gift_infoblock").fadeIn(300);
	});
});


//ask01
$(document).ready(function(e) {
	$("#lt01").css('display','none');
	$('#ask01').click(function(){
		 if($('#lt01').css("display") == "block"){
		 ask01.src="images/tosee.png";
		 $("#lt01").slideUp(300);
		 $("#lo01").css('background-color','white');
		 }
		 else{
		ask01.src="images/toclose.png";
		 $("#lt01").slideDown(300);
		 $("#lo01").css('background-color','#ecf5fb');
		 }	
	});
});

//ask02
$(document).ready(function(e) {
	$("#lt02").css('display','none');
	$('#ask02').click(function(){
		 if($('#lt02').css("display") == "block"){
		 ask02.src="images/tosee.png";
		 $("#lt02").slideUp(300);
		 $("#lo02").css('background-color','white');
		 }
		 else{
		ask02.src="images/toclose.png";
		 $("#lt02").slideDown(300);
		 $("#lo02").css('background-color','#ecf5fb');
		 }	
	});
});

//ask03
$(document).ready(function(e) {
	$("#lt03").css('display','none');
	$('#ask03').click(function(){
		 if($('#lt03').css("display") == "block"){
		 ask03.src="images/tosee.png";
		 $("#lt03").slideUp(300);
		 $("#lo03").css('background-color','white');
		 }
		 else{
		ask03.src="images/toclose.png";
		 $("#lt03").slideDown(300);
		 $("#lo03").css('background-color','#ecf5fb');
		 }	
	});
});

//ask04
$(document).ready(function(e) {
	$("#lt04").css('display','none');
	$('#ask04').click(function(){
		 if($('#lt04').css("display") == "block"){
		 ask04.src="images/tosee.png";
		 $("#lt04").slideUp(300);
		 $("#lo04").css('background-color','white');
		 }
		 else{
		ask04.src="images/toclose.png";
		 $("#lt04").slideDown(300);
		 $("#lo04").css('background-color','#ecf5fb');
		 }	
	});
});

//ask05
$(document).ready(function(e) {
	$("#lt05").css('display','none');
	$('#ask05').click(function(){
		 if($('#lt05').css("display") == "block"){
		 ask05.src="images/tosee.png";
		 $("#lt05").slideUp(300);
		 $("#lo05").css('background-color','white');
		 }
		 else{
		ask05.src="images/toclose.png";
		 $("#lt05").slideDown(300);
		 $("#lo05").css('background-color','#ecf5fb');
		 }	
	});
});

//ask06
$(document).ready(function(e) {
	$("#lt06").css('display','none');
	$('#ask06').click(function(){
		 if($('#lt06').css("display") == "block"){
		 ask06.src="images/tosee.png";
		 $("#lt06").slideUp(300);
		 $("#lo06").css('background-color','white');
		 }
		 else{
		ask06.src="images/toclose.png";
		 $("#lt06").slideDown(300);
		 $("#lo06").css('background-color','#ecf5fb');
		 }	
	});
});

//ask07
$(document).ready(function(e) {
	$("#lt07").css('display','none');
	$('#ask07').click(function(){
		 if($('#lt07').css("display") == "block"){
		 ask07.src="images/tosee.png";
		 $("#lt07").slideUp(300);
		 $("#lo07").css('background-color','white');
		 }
		 else{
		ask07.src="images/toclose.png";
		 $("#lt07").slideDown(300);
		 $("#lo07").css('background-color','#ecf5fb');
		 }	
	});
});

//ask08
$(document).ready(function(e) {
	$("#lt08").css('display','none');
	$('#ask08').click(function(){
		 if($('#lt08').css("display") == "block"){
		 ask08.src="images/tosee.png";
		 $("#lt08").slideUp(300);
		 $("#lo08").css('background-color','white');
		 }
		 else{
		ask08.src="images/toclose.png";
		 $("#lt08").slideDown(300);
		 $("#lo08").css('background-color','#ecf5fb');
		 }	
	});
});

//ask09
$(document).ready(function(e) {
	$("#lt09").css('display','none');
	$('#ask09').click(function(){
		 if($('#lt09').css("display") == "block"){
		 ask09.src="images/tosee.png";
		 $("#lt09").slideUp(300);
		 $("#lo09").css('background-color','white');
		 }
		 else{
		ask09.src="images/toclose.png";
		 $("#lt09").slideDown(300);
		 $("#lo09").css('background-color','#ecf5fb');
		 }	
	});
});

//ask10
$(document).ready(function(e) {
	$("#lt10").css('display','none');
	$('#ask10').click(function(){
		 if($('#lt10').css("display") == "block"){
		 ask10.src="images/tosee.png";
		 $("#lt10").slideUp(300);
		 $("#lo10").css('background-color','white');
		 }
		 else{
		ask10.src="images/toclose.png";
		 $("#lt10").slideDown(300);
		 $("#lo10").css('background-color','#ecf5fb');
		 }	
	});
});

