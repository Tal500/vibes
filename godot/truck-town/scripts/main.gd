extends Node2D

@onready var car: CharacterBody2D = $Car
@onready var hud: CanvasLayer = $Hud

func _ready() -> void:
    _ensure_input_actions()
    if hud:
        hud.car = car.get_path()
        if DisplayServer.is_touchscreen_available() and hud.has_method("show_touch_hint"):
            hud.call("show_touch_hint")
        elif hud.has_method("hide_touch_hint"):
            hud.call("hide_touch_hint")

func _ensure_input_actions() -> void:
    var action_map := {
        "drive_accel": [KEY_W, KEY_UP],
        "drive_brake": [KEY_S, KEY_DOWN],
        "drive_left": [KEY_A, KEY_LEFT],
        "drive_right": [KEY_D, KEY_RIGHT],
        "drive_handbrake": [KEY_SPACE]
    }
    for action in action_map.keys():
        if not InputMap.has_action(action):
            InputMap.add_action(action)
        else:
            InputMap.action_erase_events(action)
        for code in action_map[action]:
            var event: InputEventKey = InputEventKey.new()
            event.physical_keycode = code
            event.keycode = code
            InputMap.action_add_event(action, event)

    var pad_right: InputEventJoypadMotion = InputEventJoypadMotion.new()
    pad_right.axis = JOY_AXIS_LEFT_X
    pad_right.axis_value = 1.0
    InputMap.action_add_event("drive_right", pad_right)

    var pad_left: InputEventJoypadMotion = InputEventJoypadMotion.new()
    pad_left.axis = JOY_AXIS_LEFT_X
    pad_left.axis_value = -1.0
    InputMap.action_add_event("drive_left", pad_left)

    var pad_accel: InputEventJoypadMotion = InputEventJoypadMotion.new()
    pad_accel.axis = JOY_AXIS_LEFT_Y
    pad_accel.axis_value = -1.0
    InputMap.action_add_event("drive_accel", pad_accel)

    var pad_brake: InputEventJoypadMotion = InputEventJoypadMotion.new()
    pad_brake.axis = JOY_AXIS_LEFT_Y
    pad_brake.axis_value = 1.0
    InputMap.action_add_event("drive_brake", pad_brake)

    var pad_handbrake: InputEventJoypadButton = InputEventJoypadButton.new()
    pad_handbrake.button_index = JOY_BUTTON_A
    InputMap.action_add_event("drive_handbrake", pad_handbrake)
