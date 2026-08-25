# Hardware investigation

## Device

- Product: HooWel 507 / IDW16 family
- FCC ID: 2AHFT507
- FCC internal photos: see the FCC filing for the exact board photographs

## Known / reported clues

- Bluetooth smartwatch platform
- Microphone and speaker/audio capability are reported for this device family
- GPS should not be assumed to be onboard; the phone can provide GPS initially
- ATS3085L is a candidate SoC based on related IDW16 hardware reports, but it is **not confirmed** for this exact unit

## Identification checklist

- [ ] Read SoC marking from board documentation
- [ ] Identify external NOR/eMMC/other storage
- [ ] Identify RAM configuration
- [ ] Identify display and touch controller
- [ ] Identify sensor parts
- [ ] Identify audio codec/amplifier path
- [ ] Identify SWD/JTAG/UART/test pads
- [ ] Determine firmware update mechanism
- [ ] Preserve stock firmware before modification

## Rule

Every hardware claim gets a source and confidence level. Do not promote a hypothesis to a confirmed part number without evidence from the exact 507 hardware.
