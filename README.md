# HooWel → StrideAI Watch

Custom firmware research and application platform for the HooWel 507 smartwatch (FCC ID 2AHFT507).

## Goal

Turn the HooWel into a StrideAI running watch with running/workout execution, StrideAI coaching, Bluetooth synchronization, and a music player with offline playback where the hardware permits it.

## Safety rule

**Do not erase, flash, or modify stock firmware until the exact SoC, flash device, boot/update mechanism, and recovery path are identified.**

## Layout

- `docs/` hardware and firmware findings
- `tools/` investigation/build utilities
- `firmware/` firmware architecture and target code
- `bootloader/` boot/update/recovery research
- `drivers/` hardware interfaces
- `ui/` watch UI
- `music/` music subsystem
- `strideai/` on-watch coaching/workout protocol
- `bluetooth/` phone/watch protocol

## Current target

HooWel 507 / IDW16 family, FCC ID 2AHFT507. ATS3085L is a hypothesis only until verified against the exact hardware.

## First milestone

Non-destructive hardware identification + watch/phone protocol + UI/music architecture. Hardware-specific firmware comes after the target is verified.
