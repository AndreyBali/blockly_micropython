/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {blocks} from './blocks/text';
import {generator} from './generators/python';
import {pythonGenerator} from 'blockly/python';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import {MicroPythonCtl} from './micropythonClient';
import { Buffer } from 'buffer';
// const MicroPythonDevice = require('micropython-ctl').MicroPythonDevice
import './index.css';
const $ = require('jquery');


// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Object.assign(pythonGenerator, generator);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {
  toolbox,
  theme: Blockly.Themes.Zelos,
  renderer: 'zelos'
});

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const code = pythonGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;
};

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});


// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()) {
    return;
  }
  runCode();
});



const micropython = new MicroPythonCtl.MicroPythonDevice()
console.log('created')
var on = false

$('#upload').on('click', async () => {
  const address = document.getElementById('address').value;
  const password = document.getElementById('password').value;
  console.log('connecting...')
  if(micropython.isConnected()) await micropython.disconnect()
  await micropython.connectNetwork(address, password)
  console.log('stopping running program...')
  console.log(await micropython.sendData("\x03\x03"));
  console.log(await micropython.runScript("import sys\ntry: sys.modules.pop('program')\nexcept: pass\n\n"));
  console.log('uploading script...')

  const buff = Buffer.from(codeDiv.innerText, "utf-8")
  console.log(await micropython.putFile("program.py", buff));

  console.log('running script...')
  console.log(await micropython.listFiles())
  console.log(await micropython.runScript("import program"));

  // console.log(await micropython.runScript("import program"));
  // if(on){
  //   console.log(await micropython.runScript("led_pin.on();print(1)"));
  // }else{
  //   console.log(await micropython.runScript("led_pin.off()"));
  // }
  // on = !on

  // console.log(await micropython.runScript(codeDiv.innerText))
});


