#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.indexOf(name);
  return index !== -1 ? args[index + 1] : null;
};

const mappingFile = getArg('--mapping') || '.github/upstream-adaptation.json';
const upstreamPath = getArg('--upstream') || '/tmp/upstream';
const prevCommit = getArg('--prev');
const latestCommit = getArg('--latest');

// Load configuration
const config = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));

// Track changes made
const changes = {
  applied: [],
  skipped: [],
  unmapped: [],
  errors: []
};

/**
 * Check if a file is in the allowlist
 */
function isAllowed(filePath) {
  const allowlist = config.allowlist || [];
  const blocklist = config.blocklist || [];
  
  // Check blocklist first
  for (const pattern of blocklist) {
    const regex = new RegExp('^' + pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*') + '$');
    if (regex.test(filePath)) {
      return false;
    }
  }
  
  // Check allowlist
  for (const pattern of allowlist) {
    const regex = new RegExp('^' + pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*') + '$');
    if (regex.test(filePath)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Apply an adapter to a file
 */
function applyAdapter(adapterName, localFile) {
  const adapter = config.adapters[adapterName];
  if (!adapter) {
    changes.errors.push(`Adapter '${adapterName}' not found in config`);
    return false;
  }
  
  const filePath = path.join(process.cwd(), localFile);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    changes.skipped.push(`${adapterName}: File ${localFile} does not exist`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if change already exists
  if (adapter.check_exists && content.includes(adapter.check_exists)) {
    changes.skipped.push(`${adapterName}: Already applied (found '${adapter.check_exists}')`);
    return false;
  }
  
  let modified = false;
  
  try {
    switch (adapter.action) {
      case 'replace_pattern':
        if (content.includes(adapter.pattern)) {
          content = content.replace(adapter.pattern, adapter.replacement);
          modified = true;
        } else {
          changes.skipped.push(`${adapterName}: Pattern '${adapter.pattern}' not found`);
        }
        break;
        
      case 'insert_after_marker':
      case 'insert_before_marker':
        // For MVP, we'll skip complex insertions that require full content blocks
        // These would need the actual content to insert, which we'll add in future iterations
        changes.skipped.push(`${adapterName}: Complex insertion not yet implemented (requires content block)`);
        break;
        
      default:
        changes.errors.push(`${adapterName}: Unknown action '${adapter.action}'`);
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      changes.applied.push(`${adapterName}: Applied to ${localFile}`);
      return true;
    }
  } catch (error) {
    changes.errors.push(`${adapterName}: Error - ${error.message}`);
  }
  
  return false;
}

/**
 * Get list of changed files from upstream
 */
function getChangedFiles() {
  if (!prevCommit || !latestCommit) {
    console.log('No commit range provided, processing all mappings');
    return config.mappings.map(m => m.upstream);
  }
  
  // Read changed files from upstream diff
  const changedFilesPath = '/tmp/changed.txt';
  if (!fs.existsSync(changedFilesPath)) {
    console.log('No changed files list found, processing all mappings');
    return config.mappings.map(m => m.upstream);
  }
  
  const changedFiles = fs.readFileSync(changedFilesPath, 'utf8')
    .split('\n')
    .filter(f => f.trim());
  
  return changedFiles;
}

/**
 * Main processing function
 */
function main() {
  console.log('=== Auto-Adapt Upstream Changes ===');
  console.log(`Mapping file: ${mappingFile}`);
  console.log(`Upstream path: ${upstreamPath}`);
  console.log(`Commit range: ${prevCommit?.substring(0, 7)} → ${latestCommit?.substring(0, 7)}`);
  console.log('');
  
  const changedFiles = getChangedFiles();
  console.log(`Changed upstream files: ${changedFiles.length}`);
  changedFiles.forEach(f => console.log(`  - ${f}`));
  console.log('');
  
  // Process each mapping
  for (const mapping of config.mappings) {
    // Check if this upstream file was changed
    if (changedFiles.length > 0 && !changedFiles.includes(mapping.upstream)) {
      continue;
    }
    
    console.log(`Processing: ${mapping.upstream} → ${mapping.local}`);
    
    // Check if local file is allowed
    if (!isAllowed(mapping.local)) {
      changes.skipped.push(`${mapping.local}: Not in allowlist or in blocklist`);
      console.log(`  ⚠️  Skipped: Not in allowlist`);
      continue;
    }
    
    // Apply each adapter
    let anyApplied = false;
    for (const adapterName of mapping.adapters || []) {
      console.log(`  Applying adapter: ${adapterName}`);
      if (applyAdapter(adapterName, mapping.local)) {
        anyApplied = true;
      }
    }
    
    if (!anyApplied && mapping.adapters && mapping.adapters.length > 0) {
      console.log(`  ℹ️  No adapters applied`);
    }
  }
  
  // Check for unmapped files
  for (const file of changedFiles) {
    const mapped = config.mappings.find(m => m.upstream === file);
    if (!mapped) {
      changes.unmapped.push(file);
    }
  }
  
  // Generate summary
  console.log('');
  console.log('=== Summary ===');
  console.log(`Applied: ${changes.applied.length}`);
  changes.applied.forEach(c => console.log(`  ✅ ${c}`));
  
  console.log(`Skipped: ${changes.skipped.length}`);
  changes.skipped.forEach(c => console.log(`  ⏭️  ${c}`));
  
  console.log(`Unmapped: ${changes.unmapped.length}`);
  changes.unmapped.forEach(c => console.log(`  ❓ ${c}`));
  
  console.log(`Errors: ${changes.errors.length}`);
  changes.errors.forEach(c => console.log(`  ❌ ${c}`));
  
  // Write summary to file for PR description
  const summary = {
    applied: changes.applied,
    skipped: changes.skipped,
    unmapped: changes.unmapped,
    errors: changes.errors,
    commit_range: `${prevCommit?.substring(0, 7)} → ${latestCommit?.substring(0, 7)}`,
    changed_files: changedFiles
  };
  
  fs.writeFileSync('/tmp/adaptation-summary.json', JSON.stringify(summary, null, 2));
  console.log('');
  console.log('Summary written to /tmp/adaptation-summary.json');
  
  // Exit with error if there were errors
  if (changes.errors.length > 0) {
    process.exit(1);
  }
}

main();
