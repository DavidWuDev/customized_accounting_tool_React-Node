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
    console.log(`* Shared directory unlinked at ${target}`);
    fs.unlinkSync(TARGET_SHARED_PATH);
  } else {
    console.log(`* Shared direcotry not linked at ${target}, skipped`);
  }
})

console.log('Done!');
