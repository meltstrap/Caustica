<?php
require_once('lib/htm.php');
require_once('lib/htmUsers.php');

function hexToHsl($color, $returnAsArray=false){$color=str_replace('#', '', $color);$R=hexdec($color[0].$color[1]);$G=hexdec($color[2].$color[3]);$B=hexdec($color[4].$color[5]);$HSL=array();$var_R=($R/255);$var_G=($G/255);$var_B=($B/255);$var_Min=min($var_R, $var_G, $var_B);$var_Max=max($var_R, $var_G, $var_B);$del_Max=$var_Max-$var_Min;$L=($var_Max+$var_Min)/2;if($del_Max==0){$H=0;$S=0;}else{if($L<0.5)$S=$del_Max/($var_Max+$var_Min);else$S=$del_Max/(2-$var_Max-$var_Min);$del_R=((($var_Max-$var_R)/6)+($del_Max/2))/$del_Max;$del_G=((($var_Max-$var_G)/6)+($del_Max/2))/$del_Max;$del_B=((($var_Max-$var_B)/6)+($del_Max/2))/$del_Max;$H=0.5;if($var_R==$var_Max)$H=$del_B-$del_G;elseif($var_G==$var_Max)$H=(1/3)+$del_R-$del_B;elseif($var_B==$var_Max)$H=(2/3)+$del_G-$del_R;if($H<0)$H++;if($H>1)$H--;}$HSL['H']=round(($H*360));$HSL['S']=round(($S*100));$HSL['L']=round(($L*100));return$returnAsArray?$HSL:implode(",", $HSL);}

if($_SERVER['REQUEST_METHOD'] != 'POST'){
	$tabTitle = 'Caustica - Theme Settings';
	printHeader('');

	$get_user = $dbc->prepare('SELECT * FROM users INNER JOIN profiles ON profiles.user_id = users.user_id WHERE users.user_id = ? LIMIT 1');
	$get_user->bind_param('i', $_SESSION['user_id']);
	$get_user->execute();
	$user_result = $get_user->get_result();
	$user = $user_result->fetch_assoc();
	echo '<div id="sidebar" class="general-sidebar">';
	userContent($user, "");
	sidebarSetting();
	echo '</div>
	<div class="main-column">
	  <div class="post-list-outline">
		<h2 class="label">Theme Settings</h2>
			<center>
				<input id="light" onclick="lightTheme()" class="black-button" type="button" value="Light">
				<input id="dark" onclick="darkTheme()" class="black-button" type="button" value="Dark">
				<input id="translucent" onclick="translucentTheme()" class="black-button" type="button" value="Translucent">
				<input id="blur" onclick="blurTheme()" class="black-button" type="button" value="Blur">
	  		</center>
	  </div>
	</div>
  </div>
</div>
';