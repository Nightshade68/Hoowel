# Music subsystem

The watch music feature is designed as a real player rather than a phone-only remote.

## Player

- Library
- Playlists
- Album/artist metadata
- Play/pause/next/previous
- Shuffle/repeat
- Progress/seek
- Volume
- Bluetooth headphone output when supported
- Local/offline tracks when storage and firmware permit

## Architecture

```text
StrideAI Android
      |
      | catalog / authorized transfers
      v
Watch storage -> audio decoder -> audio output -> Bluetooth headphones
```

Streaming-service integrations must use officially supported APIs and playback mechanisms. We do not bypass DRM or copy protected streams.

## Hardware gate

Before implementing a decoder or transfer engine, record exact flash size, audio path, Bluetooth profile support, CPU/DSP capabilities, and available RAM in `docs/hardware.md`.
