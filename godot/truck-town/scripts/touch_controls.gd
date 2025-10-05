extends CanvasLayer

const LEFT_TEXTURE: Texture2D = preload("res://assets/touch_left.svg")
const RIGHT_TEXTURE: Texture2D = preload("res://assets/touch_right.svg")
const ACCEL_TEXTURE: Texture2D = preload("res://assets/touch_accel.svg")
const BRAKE_TEXTURE: Texture2D = preload("res://assets/touch_brake.svg")

var _buttons: Array[Dictionary] = []

func _ready() -> void:
    layer = 15
    if not DisplayServer.is_touchscreen_available():
        visible = false
        return

    process_mode = Node.PROCESS_MODE_PAUSABLE
    _create_buttons()
    get_viewport().connect("size_changed", Callable(self, "_layout_buttons"))
    _layout_buttons()

func _create_buttons() -> void:
    _buttons.clear()
    _buttons.append(_spawn_button(LEFT_TEXTURE, "drive_left", "bottom_left", Vector2(-96, 0)))
    _buttons.append(_spawn_button(RIGHT_TEXTURE, "drive_right", "bottom_left", Vector2(96, 0)))
    _buttons.append(_spawn_button(ACCEL_TEXTURE, "drive_accel", "bottom_right", Vector2(-72, -110)))
    _buttons.append(_spawn_button(BRAKE_TEXTURE, "drive_brake", "bottom_right", Vector2(72, -24)))

func _spawn_button(texture: Texture2D, action: String, anchor: String, offset: Vector2) -> Dictionary:
    var button: TouchScreenButton = TouchScreenButton.new()
    button.texture_normal = texture
    button.texture_pressed = texture
    button.action = action
    button.visibility_mode = TouchScreenButton.VISIBILITY_TOUCHSCREEN_ONLY
    var shape: RectangleShape2D = RectangleShape2D.new()
    shape.extents = Vector2(70, 70)
    button.shape = shape
    button.set_meta("anchor", anchor)
    button.set_meta("offset", offset)
    button.modulate = Color(1, 1, 1, 0.92)
    add_child(button)
    return {"node": button, "anchor": anchor, "offset": offset}

func _layout_buttons() -> void:
    var rect := get_viewport().get_visible_rect()
    for info in _buttons:
        var node: TouchScreenButton = info["node"] as TouchScreenButton
        var anchor: String = info["anchor"]
        var offset: Vector2 = info["offset"]
        match anchor:
            "bottom_left":
                var base := Vector2(rect.position.x + 200, rect.position.y + rect.size.y - 180)
                node.position = base + offset
            "bottom_right":
                var base2 := Vector2(rect.position.x + rect.size.x - 200, rect.position.y + rect.size.y - 180)
                node.position = base2 + offset
            "top_right":
                var base3 := Vector2(rect.position.x + rect.size.x - 120, rect.position.y + 140)
                node.position = base3 + offset
            _:
                node.position = rect.get_center() + offset
