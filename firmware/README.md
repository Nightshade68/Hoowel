# Firmware target scaffold

This directory intentionally contains no MCU-specific startup code yet.

## Target interface

```c
void hw_init(void);
void display_init(void);
void touch_init(void);
void ble_init(void);
void sensors_init(void);
void audio_init(void);
void storage_init(void);
void strideai_init(void);
void music_init(void);
```

The first hardware-specific implementation should be added only after the exact SoC and SDK are verified.

## First boot goal

A non-destructive development image should eventually prove:

1. CPU boots
2. Display initializes
3. Touch/button input works
4. BLE advertises
5. Battery is readable
6. Storage is readable
7. Audio path can be initialized

Only after that do we implement the full StrideAI UI and music stack.
