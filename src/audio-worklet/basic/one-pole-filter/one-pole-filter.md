---
layout: example
title: One Pole Filter
root_dir: ../../../
parents:
  - title: Audio Worklet
    path: ../../
github_source: tree/main/audio-worklet/basic/one-pole-filter/
---

A one pole filter implementation with AudioWorkletNode. A noise generator goes
into an one-pole filter and a series of AudioParam automations is in action to
move the filter frequency.

<div id="demo-runner"></div>
<script src="app.js" type="module"></script>
