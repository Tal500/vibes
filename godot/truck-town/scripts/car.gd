extends CharacterBody2D

const ENGINE_FORCE: float = 900.0
const MAX_SPEED: float = 650.0
const STEER_SPEED: float = 2.6
const DRAG_COEFFICIENT: float = 0.85
const HAND_BRAKE_DRAG: float = 2.2

var _velocity: Vector2 = Vector2.ZERO

func _ready() -> void:
    set_physics_process(true)

func _physics_process(delta: float) -> void:
    var forward: Vector2 = Vector2.RIGHT.rotated(rotation)
    var right: Vector2 = forward.rotated(-PI / 2)

    var accel: float = Input.get_action_strength("drive_accel")
    var brake: float = Input.get_action_strength("drive_brake")
    var throttle: float = accel - brake
    var steer: float = Input.get_action_strength("drive_right") - Input.get_action_strength("drive_left")
    var handbrake: bool = Input.is_action_pressed("drive_handbrake")

    if throttle != 0.0:
        _velocity += forward * ENGINE_FORCE * throttle * delta
    else:
        var slow: float = 280.0 if not handbrake else 120.0
        _velocity = _velocity.move_toward(Vector2.ZERO, slow * delta)

    var speed_forward: float = _velocity.dot(forward)
    var lateral: float = _velocity.dot(right)
    _velocity -= right * lateral * 6.0 * delta

    if abs(speed_forward) > 1.0:
        var steer_factor: float = clamp(speed_forward / MAX_SPEED, -1.0, 1.0)
        rotation += steer * STEER_SPEED * delta * steer_factor

    if handbrake:
        _velocity *= pow(1.0 - min(HAND_BRAKE_DRAG * delta, 0.9), 1.0)
    else:
        _velocity = _velocity.limit_length(MAX_SPEED)
        _velocity *= pow(DRAG_COEFFICIENT, delta * 60.0)

    velocity = _velocity
    move_and_slide()

func get_speed_kph() -> float:
    return _velocity.length() * 0.12
