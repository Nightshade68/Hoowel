# StrideAI HooWel Firmware

This is the embedded firmware architecture for the StrideAI HooWel project. It is hardware-safe and does **not** erase, flash, or write to a physical watch.

## Target

- Candidate SoC: Actions Technology ATS3085L
- HooWel FCC ID: 2AHFT507
- Display, touch, sensor buses, flash layout and programming interface: **must be verified on the actual board before enabling hardware writes**.

Actions Technology documents ATS3085L as a smartwatch SoC with an ARM Cortex-M4F MCU, DSP, sensor hub, Bluetooth, display/peripheral interfaces and external SPI NOR support. citeturn0search0turn0search1

## Architecture

```text
app/        StrideAI watch state machine and product behavior
drivers/    Display, touch, HR, motion, battery and storage interfaces
platform/   Vendor SDK / RTOS adapter boundary
protocol/   Phone <-> watch BLE messages
ui/         Screen models and metrics
storage/    Activity/session persistence
boards/     Verified HooWel board configuration
```

## Features being implemented

- Watch face / clock
- Start, pause, resume and finish run
- Elapsed time
- Distance
- Current pace
- Heart rate
- Cadence when available
- Workout execution
- StrideAI workout guidance
- Short on-watch coaching
- BLE sync with StrideAI Android
- Local activity/session storage
- Battery/status reporting
- Firmware update architecture

## Hardware gate

The source is ready for target integration, but a flashable production image cannot be generated responsibly until the exact Actions Technology SDK/toolchain and the HooWel board's display, sensor, storage and boot/update details are verified.

**Do not flash the physical watch from this repository yet.**

The browser prototype can be used immediately to exercise the product flow while the embedded target is being verified.
