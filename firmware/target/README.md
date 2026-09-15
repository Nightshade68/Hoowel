# HooWel firmware target

This directory is the hardware-facing layer for the eventual HooWel 507 StrideAI firmware.

## Current status

This is a **safe scaffold only**. It does not flash, erase, or communicate with a physical watch.

Target hardware is still unverified. The repository currently treats ATS3085L as a candidate, not a confirmed part.

## Architecture

- `app/` — watch state machine and running features
- `drivers/` — display, touch, HR, motion, audio and storage adapters
- `platform/` — SoC/board-specific implementation
- `protocol/` — phone/watch messages

## First hardware milestone

1. Verify exact SoC marking.
2. Verify external storage part and capacity.
3. Identify display/touch and sensor buses.
4. Identify the update/debug mechanism.
5. Preserve stock firmware before any write operation.
6. Replace the platform stubs with verified board drivers.

No hardware write path belongs in this tree until those checks are complete.
