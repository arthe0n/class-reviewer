# Chapter 5: Cabling — Tool & Command Summary

Quick reference for the diagnostic tools, hand tools, and CLI syntax in Chapter 5 (Network+ 5.2, 5.5).

## Cable Location & Continuity

### Toner and probe kit
Finds which termination, among hundreds, belongs to a wire. The **tone generator (toner)** issues a signal on the wire; the **tone locator (probe)** sounds when it detects that activity.

```
1. Clip the toner to one end with the right connector
2. Sweep the probe over candidate terminations
3. Tone heard = far end found; silence = try the next one
```

- Locates ends only — never certifies defects or IEEE length compliance.
- **Never use on a wire connected to a device port or NIC** — the current can damage it.

### Cable continuity tester
Verifies a signal reaches the far end. The **base unit** sources voltage on one end; the **remote unit** senses it on the other. Lights/tones report pass/fail.

- Copper: runs a **wire map** per TIA/EIA 568 — catches shorts, exposed wires, crosses, reversed/crossed/split pairs.
- Fiber: pulses light to confirm arrival.
- Typical unit: portable, 9-volt, ~$10–$300 (Belkin, Fluke, Greenlee). Match it to your plant (1000BASE-T, 10GBASE-T).
- **Disconnect live cable before testing.**

### Visual fault locator (visual fault finder)
Bright laser injected into fiber exposes damage and overtight bends where light escapes. Doubles as a fiber continuity check.

## Electrical & Performance Measurement

### Multimeter
One instrument for resistance, voltage, and impedance.

| Reading | Tells you |
| --- | --- |
| Voltage present end-to-end | Cable conducts properly |
| Extraneous voltage | Noise on the wire |
| Unexpected resistance / voltage loss | Short (unwanted contact) or open (broken/missing path) |
| Impedance shift | Fault location, bad pairing, damage, termination point |

### Cable performance tester
Continuity plus certification: distance-to-fault/device/termination, attenuation, NEXT/alien crosstalk, termination resistance, impedance, pass/fail per standard, stored/printable results, attenuation-vs-length graphs. Hundreds to ~$50,000.

### TDR vs OTDR

| Reflectometer | Medium | How it finds faults |
| --- | --- | --- |
| **TDR** (time domain reflectometer) | Copper | Sends an electrical pulse; reflection timing/amplitude exposes bad connectors, crimps, bends, shorts, mismatches |
| **OTDR** (optical time domain reflectometer) | Fiber | Sends varied-wavelength light; return signal measures length, splices, breaks, connectors, bends, attenuation |

### OPM (optical power meter / fiber light meter)
Measures light power on a fiber line.

- Must be calibrated to **NIST** optical power standards.
- Accuracy drifts with room temperature, connection type, and technician skill.

## Switch CLI

### `show power inline` (Cisco)
Displays PoE demand per interface — use it when ports go dark after adding powered devices (power budget exceeded).

```
Switch# show power inline
```

## Termination Hand Tools

| Tool | Job |
| --- | --- |
| Wire cutter / snips | Clean cuts at both ends (plus a few extra inches) |
| Cable stripper | Removes ~1 inch of sheath without nicking pairs |
| Rip cord | Pulls extra sheath past a possible nick point |
| Cable crimper | Forces RJ-45 pins through insulation (no rotation while crimping) |

Seat wires trimmed evenly to 1/2 inch with ~3/8 inch of sheath inside the plug, tug-test, then prove the run with a tester or live link.
