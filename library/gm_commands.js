/**
 *	January 14, 2021
 *	@Author Manuel Sintos
 */

function gm_commands() {
	var forms_input = document.forms["myForm"]["chat_box"];
	var at_item = forms_input.value.toLowerCase().substr(0, 5);

	var digit4_id_num = forms_input.value.toLowerCase().substr(6, 4);
	var digit4_id_value = forms_input.value.toLowerCase().substr(11, forms_input.value.length);

	var digit3_id_num = forms_input.value.toLowerCase().substr(6, 3);
	var digit3_id_value = forms_input.value.toLowerCase().substr(10, forms_input.value.length);

	var broadcast_side_txt = forms_input.value.toLowerCase().substr(0, 10);
	var txt_to_broadcast = forms_input.value.substr(11, forms_input.value.length);

	if (at_item == "@item") {
		if (digit3_id_num == "607") {
			if (digit3_id_value == "" || digit3_id_value == "0") {
				mes("Please input a value.", "self");
			}
			else if (isNaN(digit3_id_value)) {
				mes("Invalid input value.", "error");
			}
			else {
				// code here for getting the itemm of YGG BERRY
				mes("You got Ygg.", "lvlup");
			}
		}
		else {
			mes("Generating item failed.", "error");
		}
	}
	else if (forms_input.value.toLowerCase() == "@teleport" || forms_input.value.toLowerCase() == "@jump") {
		switch(is_arena_active) {
			case true:
				mes(SELECT.ERROR_MESSAGE, "error");
			break;
			case false:
				teleport();
			break;
		}
	}
	else if (broadcast_side_txt == "@broadcast") {
		announce(player.name + " : " + txt_to_broadcast, "gm");
	}
	else {
		mes(player.name + " : " + forms_input.value, "self");
	}
}