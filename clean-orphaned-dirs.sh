#!/bin/bash

# Script to remove directories from build output that don't exist in source
# This prevents old deleted content from persisting in the deployed site

SOURCE_DIR="."
BUILD_DIR="../gooseus.github.io"

# Directories that should be ignored (not content directories)
IGNORE_DIRS=(".git" ".DS_Store" "node_modules" "js" "css" "CNAME" "LICENSE" "CLAUDE")

# Get list of directories in build output
cd "$BUILD_DIR" || exit 1

for item in *; do
  # Skip if not a directory
  [ ! -d "$item" ] && continue

  # Skip ignored directories
  should_ignore=false
  for ignore in "${IGNORE_DIRS[@]}"; do
    if [ "$item" = "$ignore" ]; then
      should_ignore=true
      break
    fi
  done
  [ "$should_ignore" = true ] && continue

  # Check if corresponding source exists (either .md file or directory)
  cd - > /dev/null
  if [ ! -e "$item" ] && [ ! -e "$item.md" ]; then
    echo "Removing orphaned directory: $item"
    rm -rf "$BUILD_DIR/$item"
  fi
  cd "$BUILD_DIR" || exit 1
done

cd - > /dev/null
echo "Cleanup complete"
