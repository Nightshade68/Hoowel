#!/usr/bin/env python3
"""Print a checklist for non-destructive HooWel hardware identification."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
print("HooWel 507 hardware investigation")
print("Repository:", ROOT)
print("\nDO NOT flash or erase the watch yet.\n")
for item in [
    "Exact SoC / MCU marking",
    "External flash/storage marking and capacity",
    "RAM configuration",
    "Display/touch controller",
    "Heart-rate and motion sensors",
    "Audio codec/amplifier and speaker path",
    "Bluetooth/controller details",
    "SWD/JTAG/UART/test pads",
    "Stock firmware version and update package",
    "Recovery/backup path",
]:
    print(f"[ ] {item}")
