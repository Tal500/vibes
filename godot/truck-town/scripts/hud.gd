extends CanvasLayer

@export var car: NodePath

@onready var _speed_label: Label = $MarginContainer/VBoxContainer/SpeedLabel
@onready var _alert_label: Label = $MarginContainer/VBoxContainer/AlertLabel

func _ready() -> void:
    layer = 5
    if not car:
        push_warning("Hud missing car reference")

func _process(delta: float) -> void:
    if car != NodePath() and has_node(car):
        var car_body: Node = get_node(car)
        if car_body.has_method("get_speed_kph"):
            var speed: float = float(car_body.call("get_speed_kph"))
            _speed_label.text = "Speed: %dkm/h" % int(round(speed))

func show_touch_hint() -> void:
    _alert_label.show()
    _alert_label.text = "Touch controls available — tap the on-screen pads to steer and drive."

func hide_touch_hint() -> void:
    _alert_label.hide()
