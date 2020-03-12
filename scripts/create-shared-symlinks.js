#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const SHARED_DIR_NAME = 'shared';
const SOURCE_SHARED_PATH = path.join(__dirname, '..', SHARED_DIR_NAME);

const TARGET_PATHS = [
  'backend/src',
  'portal/src',
];

TARGET_PATHS.forEach(target => {
  const TARGET_SHARED_PATH = path.join(__dirname, '..', target, SHARED_DIR_NAME);
  
  if (fs.existsSync(TARGET_SHARED_PATH)) {
    console.log(`* Shared directory already linked with at "${target}"`);
  } else {
    fs.symlinkSync(SOURCE_SHARED_PATH, TARGET_SHARED_PATH, 'dir');
    console.log(`* Shared directory linked at "${target}"`);
  }
})

console.log('Done!');
