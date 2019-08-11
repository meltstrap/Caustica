<?php
require_once('lib/htm.php');
require_once('lib/htmUsers.php');


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