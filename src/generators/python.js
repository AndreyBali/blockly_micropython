/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { pythonGenerator } from 'blockly/python';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const generator = Object.create(null);

generator['neopixel_set_color_hex'] = function (block) {
  const led_id = pythonGenerator.valueToCode(block, 'LED', pythonGenerator.ORDER_NONE) || '0';
  const color = pythonGenerator.valueToCode(block, 'COLOR', pythonGenerator.ORDER_ATOMIC) || '\'#ffffff\'';

  const hexToRgb = pythonGenerator.provideFunction_(
    'hexToRgb',
    ['def ' + pythonGenerator.FUNCTION_NAME_PLACEHOLDER_ + '(hex):',
    '    hex = hex.lstrip("#")',
    '    return tuple(int(hex[i:i+2], 16) for i in (0, 2, 4))']);

  return `np[${led_id}-1] = hexToRgb(${color})\n`;
};

generator['neopixel_set_color_rgb'] = function (block) {
  const led_id = pythonGenerator.valueToCode(block, 'LED', pythonGenerator.ORDER_NONE) || '0';
  const r = pythonGenerator.valueToCode(block, 'R', pythonGenerator.ORDER_NONE) || '0';
  const g = pythonGenerator.valueToCode(block, 'G', pythonGenerator.ORDER_NONE) || '0';
  const b = pythonGenerator.valueToCode(block, 'B', pythonGenerator.ORDER_NONE) || '0';

  return `np[${led_id}-1] = (${r}, ${g}, ${b})\n`;
};


generator['neopixel_initialize'] = function (block) {
  pythonGenerator.definitions_['import_neopixel'] = 'import neopixel';
  pythonGenerator.definitions_['import_machine'] = 'import machine';
  return `np = neopixel.NeoPixel(machine.Pin(4), 11)\n`;
};


generator['neopixel_write'] = function (block) {
  return `np.write()\n`;
};



generator['wait'] = function (block) {
  pythonGenerator.definitions_['import_time'] = 'import time';
  const time = pythonGenerator.valueToCode(block, 'TIME', pythonGenerator.ORDER_NONE) || '0';
  return `time.sleep(${time})\n`;
};






pythonGenerator['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  pythonGenerator.definitions_['import_random'] = 'import random';
  const argument0 = pythonGenerator.valueToCode(block, 'FROM', pythonGenerator.ORDER_NONE) || '0';
  const argument1 = pythonGenerator.valueToCode(block, 'TO', pythonGenerator.ORDER_NONE) || '0';
  const randint = pythonGenerator.provideFunction_("randint", `
def ${pythonGenerator.FUNCTION_NAME_PLACEHOLDER_}(start, end):
    return int(random.getrandbits(32)/((1 << 32) - 1) * (end - start + 1) + start)
`)

  const code = randint + '(' + argument0 + ', ' + argument1 + ')';
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator['colour_random'] = function(block) {
  // Generate a random colour.
  pythonGenerator.definitions_['import_random'] = 'import random';
  const randint = pythonGenerator.provideFunction_("randint", `
  def ${pythonGenerator.FUNCTION_NAME_PLACEHOLDER_}(start, end):
  return int(random.getrandbits(32)/((1 << 32) - 1) * (end - start + 1) + start)
  `)  
  const code = `\'#%06x\' % ${randint}(0, 2**24 - 1)`;
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};