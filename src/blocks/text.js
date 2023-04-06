/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    "type": "neopixel_initialize",
    "message0": "Initialize LEDs",
    // "args0": [
    //   {
    //     "type": "field_number",
    //     "name": "led_count",
    //     "value": 1,
    //     "min": 1
    //   },
    //   {
    //     "type": "field_number",
    //     "name": "pin",
    //     "value": 0,
    //     "min": 0,
    //     "max": 99
    //   }
    // ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Initialize Neopixel with the specified LED count and pin",
    "helpUrl": ""
  },
  {
    "type": "neopixel_set_color_hex",
    "message0": "Set LED %1 to color %2",
    "args0": [
      {
        "type": "input_value",
        "name": "LED",
        'check': 'Number',
      },
      {
        "type": "input_value",
        "name": "COLOR",
        'check': 'Colour',
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Set the specified LED to the specified color",
    "helpUrl": ""
  },
  {
    "type": "neopixel_set_color_rgb",
    "message0": "Set LED %1 to rgb (%2, %3, %4)",
    "args0": [
      {
        "type": "input_value",
        "name": "LED",
        'check': 'Number',
      },
      {
        "type": "input_value",
        "name": "R",
        'check': 'Number',
      },
      {
        "type": "input_value",
        "name": "G",
        'check': 'Number',
      },
      {
        "type": "input_value",
        "name": "B",
        'check': 'Number',
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Set the specified LED to the specified color",
    "helpUrl": ""
  },
  {
    "type": "neopixel_write",
    "message0": "Write LEDs",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Show the current Neopixel colors",
    "helpUrl": ""
  },


  {
    "type": "wait",
    "message0": "wait %1 seconds",
    "args0": [
      {
        "type": "input_value",
        "name": "TIME",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#fcbf17",
    "tooltip": "time.sleep(x)",
  }
]);
