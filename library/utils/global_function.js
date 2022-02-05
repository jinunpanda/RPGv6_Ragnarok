/**
 *	January 3, 2021
 *	@Author Manuel Sintos
 */

/* savepoint function */
function savepoint(x, y) {
	var savepoint = {}
	savepoint.x = x;
	savepoint.y = y;

	setTimeout(function() {
	    $(SELECT.MAP).css({
			left: map_data.x_coordinate[x] + "px", // x coordinate
			top: map_data.y_coordinate[y] + "px",	// y coordinate
			transition: "0s",
		});
	    /* we set the value of x and y coordinates */
		walking_x = x;
		walking_y = y;

		/* and we display coordinates of player at mini map */
		$(SELECT.WALKING_X_DISPLAY).html(x);
		$(SELECT.WALKING_Y_DISPLAY).html(y);

		/* next is we set also the mini map arrow */
		$(SELECT.MINI_ARROW).css({
		 	left: mini_map.x_coordinate[x] + "px",
			top: mini_map.y_coordinate[y] + "px",
		 	transition: "0s",
		});

		/* change the image of the player to standing position base in job */
		// idle_change_image();

		return savepoint;
	}, 100);
}
savepoint(player.savepoint.x, player.savepoint.y);

function warp(x, y) {
	var savepoint = {}
	savepoint.x = x;
	savepoint.y = y;

	setTimeout(function() {
	    $(SELECT.MAP).css({
			left: map_data.x_coordinate[x] + "px", // x coordinate
			top: map_data.y_coordinate[y] + "px",	// y coordinate
			transition: "0s",
		});
	    /* we set the value of x and y coordinates */
		walking_x = x;
		walking_y = y;

		/* and we display coordinates of player at mini map */
		$(SELECT.WALKING_X_DISPLAY).html(x);
		$(SELECT.WALKING_Y_DISPLAY).html(y);

		/* next is we set also the mini map arrow */
		$(SELECT.MINI_ARROW).css({
		 	left: mini_map.x_coordinate[x] + "px",
			top: mini_map.y_coordinate[y] + "px",
		 	transition: "0s",
		});

		/* change the image of the player to standing position base in job */
		// idle_change_image();

		return savepoint;
	}, 100);
}

/* add comma to numbers */
function add_comma(num) {
	var number = num;
	return number.toLocaleString();
}

/* sending a chat message or commands functions */
function send_chat() {
	var forms_input = document.forms["myForm"]["chat_box"];
	var date1 = new Date();
	
	if (forms_input.value == "" || forms_input.value == null) {
		mes("", "error");
	}
	else if (forms_input.value.toLowerCase() == "@time") {
		mes("Current time : " + date1.toLocaleString(), "self");
	}
	else if (forms_input.value.toLowerCase() == "@halter") {
		if (SELECT.HAS_GM_STATUS == "GM-") {
			mes("There is no halter for GM.", "self");
		}
		else {
			halter();
		}
	}
	else if (forms_input.value.toLowerCase() == "/where") {
		mes("Current coordinates : " + walking_x + ", " + walking_y, "gm");
	}
	else if (forms_input.value.toLowerCase() == "/stand") {
		idle_change_image();
	}
	else if (forms_input.value.toLowerCase() == "/sit") {
		if (isSit == false) {
			sit_change_image();
		}
		else {
			idle_change_image();
		}
	}
	else {
		if (SELECT.HAS_GM_STATUS == "GM-") {
			gm_commands();
		}
		else {
			mes(player.name + " : " + forms_input.value, "self");
		}
	}
	/* reset the input value */
	forms_input.value = "";
}

/* different type of messages 
 * mes(your message, types);
 * for types: self, normal, error, event, lvlup
 */
function mes(mes, type) {
	var message = {};
	message.mes = mes;
	message.type = type;
	var max_length_chat = player.maxChat;
	var chat_container = $('#chat_container');
	var forms_input = document.forms["myForm"]["chat_box"];
	var x = $(".chat_container div").length;
	var types = ["self", "event", "lvlup", "error", "normal", "gm", "exp"];

	if (x > max_length_chat) {
		$(".chat_container div:first-child").remove();
	}

	if (type == types[0]) {
		$(SELECT.CHAT_CONTAINER).append(
			"<div class='" + SELECT.TCC0 + "'>" + mes + "</div>");
	}
	else if (type == types[1]) {
		$(SELECT.CHAT_CONTAINER).append(
			"<div class='" + SELECT.TCC1 + "'>" + mes + "</div>");
	}
	else if (type == types[2]) {
		$(SELECT.CHAT_CONTAINER).append(
			"<div class='" + SELECT.TCC2 + "'>" + mes + "</div>"); 
	}
	else if (type == types[3]) {	
		$(SELECT.CHAT_CONTAINER).append(
			"<div class='" + SELECT.TCC3 + "'>" + mes + "</div>");
	}
	else if (type == types[4]) {	
		$(SELECT.CHAT_CONTAINER).append(
			"<div class='" + SELECT.TCC4 + "'>" + mes + "</div>");
	}
	else if (type == types[5]) {	
		$(SELECT.CHAT_CONTAINER).append(
			"<div class='" + SELECT.TCC5 + "'>" + mes + "</div>");
	}
	else if (type == types[6]) {	
		$(SELECT.CHAT_CONTAINER).append(
			"<div class='" + SELECT.TCC7 + "'>" + mes + "</div>");
	}
	else {}
	chat_container[0].scrollTop = chat_container[0].scrollHeight; //scroll message 
	return message;
}


/* AUTOUPDATE */
function autoupdate() {
	hp_data = Math.floor((player.lvl * player.hp/1.5) / 1.5);
	sp_data = Math.floor((player.lvl * player.sp/1.5) / 2);

	$(SELECT.PLAYER_LVL_DISPLAY).html(player.lvl);
	$(SELECT.PLAYER_JOB_DISPLAY).html(player.job);

	// need to update regarding this exp system
	// $(SELECT.PLAYER_EXP_DISPLAY).html("1%"); 

	$(SELECT.PLAYER_HP_DISPLAY).html($(SELECT.PLAYER_HP).val());
	$(SELECT.PLAYER_HP_DISPLAY_MAX).html($(SELECT.PLAYER_HP_DISPLAY_MAX).html());

	$(SELECT.PLAYER_SP_DISPLAY).html($(SELECT.PLAYER_SP).val());
	$(SELECT.PLAYER_SP_DISPLAY_MAX).html($(SELECT.PLAYER_SP_DISPLAY_MAX).html());

}
setInterval(autoupdate, 16);

// halter system
function halter() {
	if (isHalter == false) {
		isHalter = true;
		idle_change_image();
	}
	else {
		isHalter = false;
		idle_change_image();
	}
}

announceRemovalCount = 0;
function announce(mesAnnounce) {
	var announce = {};
	announce.mesAnnounce = mesAnnounce;

	// add a 8 seconds to display the announcement
	announceRemovalCount = 8;

	// remove the first announcement
	$(SELECT.ANNOUNCEMENT).remove();

	// add the new announcement
	$(SELECT.MAP).append(
		'<div class="announcement announcement_text_chat_color">' + mesAnnounce + '</div>'
	);
	mes(mesAnnounce, "gm");
	return mesAnnounce;
}

// AUTO REMOVAL FOR ANNOUNCEMENT
setInterval(function() {
	announceRemovalCount -= 1;
	if (announceRemovalCount == 0) {
		$(SELECT.ANNOUNCEMENT).remove();
	}
}, 1000);

// OnStart Message
function onStartMessage() {
	mes(date, "self");
	mes("For more information, kindly visit the player_data.js", "lvlup");
	setTimeout(function() {
		announce("Alert: This is an offline game. have a nice day!");
	}, 2000);
}

// loop message every 1 hr
function onLoopMessageInHour() {
	announce("Alert: This is an offline game. have a nice day!");
}
setInterval(onLoopMessageInHour, 1000*60*60);

// FadeOut Effect
function fadeOut_effect() {
	$(SELECT.BODY).append("<div class='fadeOut_effect'></div>");
	$(SELECT.FADEOUT_EFFECT).show();

	setTimeout(function() {
		$(SELECT.FADEOUT_EFFECT).fadeOut(200);
	}, 210);
	setTimeout(function() {
		$(SELECT.FADEOUT_EFFECT).remove();
	}, 500);
}

// ========================== SKILLS FUNCTION ====================================

var skill = {
	teleport: {
		sp_consumption: 100,
		cooldown: 2 * 1000, // 2 seconds
	},
};



function teleport() {
	var x = Math.floor(Math.random() * map_data.x_limit);
	var y = Math.floor(Math.random() * map_data.y_limit);

	/* callback the fadeOut effect */
	fadeOut_effect();

	$(SELECT.MAP).css({
		left: map_data.x_coordinate[x] + "px", // x coordinate
		top: map_data.y_coordinate[y] + "px",	// y coordinate
		transition: "0s",
	});
	/* we set the value of x and y coordinates */
	walking_x = x;
	walking_y = y;

	/* and we display coordinates of player at mini map */
	$(SELECT.WALKING_X_DISPLAY).html(x);
	$(SELECT.WALKING_Y_DISPLAY).html(y);

	/* next is we set also the mini map arrow */
	$(SELECT.MINI_ARROW).css({
		 left: mini_map.x_coordinate[x] + "px",
		top: mini_map.y_coordinate[y] + "px",
		 transition: "0s",
	});

	/* change the image of the player to standing position base in job */
	idle_change_image();

	/* add a message warp status */
	mes("Warped.", "self");

	return true;
}





function oncast_teleport() {

	/* append the popup option */
	$(SELECT.BODY).append(
		'<div class="window">' +
			'<div class="box_container_teleport">' +
				'<div class="box_con_in_border">' +
					'<div class="box_con_title_teleport">Select an Area to Warp</div>' +

						'<div class="box_con_option_teleport">' +
							'<div id="random" class="option_teleport option_teleport_active">Random Area</div>' +
							'<div id="cancel" class="option_teleport">Cancel</div>' +
						'</div>' +

					'<div class="btn_con_teleport">' +
						'<button class="ok_button"></button>' +
						'<button class="cancel_button"></button>' +
					'</div>' +

				'</div>' +
			'</div>' +
		'</div>'
	);
	/* add a drag feature for the container */
	var box_container_teleport = document.getElementsByClassName("box_container_teleport")[0];
	box_container_teleport.addEventListener("touchmove", touchmove_BCT);
}

function touchmove_BCT(event) {
	var x = event.touches[0].clientX;
	var y = event.touches[0].clientY;
	$(".box_container_teleport").css({
		top: y + 40 + 'px',
		left: x + 'px'
	});
}