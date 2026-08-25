# Watch ↔ phone protocol v0

This is a transport-neutral protocol definition. BLE GATT UUIDs and characteristic details will be selected after the watch Bluetooth stack is known.

## Message envelope

```json
{
  "v": 1,
  "type": "run.status",
  "id": "unique-message-id",
  "ts": 0,
  "payload": {}
}
```

## Commands

### `run.start`
```json
{"v":1,"type":"run.start","id":"...","ts":0,"payload":{"sport":"run"}}
```

### `run.control`
Payload: `{ "action": "pause" | "resume" | "stop" | "lap" }`

### `workout.load`
Payload contains a workout identifier plus steps. Steps use duration/distance targets and optional pace/HR guidance.

### `coach.prompt`
Payload: `{ "text": "..." }` — phone handles heavy AI; watch receives concise actionable responses.

### `music.command`
Payload: `{ "action": "play" | "pause" | "next" | "previous" | "seek", "positionMs": 0 }`

### `music.catalog`
Phone sends metadata for tracks/playlists. Actual audio transfer is a separate capability and must be enabled only after storage/audio constraints are verified.

## Events

- `watch.hello`
- `watch.capabilities`
- `run.status`
- `run.metric`
- `run.lap`
- `sensor.hr`
- `battery.status`
- `music.status`
- `coach.message`

## Design principle

The protocol lets us build the StrideAI Android side now without locking the firmware to an unverified MCU SDK.
