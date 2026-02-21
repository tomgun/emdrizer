#!/usr/bin/env bash
# Quality checks for EMDR web/mobile app
# Copy base from .agentic/quality_profiles; customize as stack is added.
set -euo pipefail

echo "=== EMDR App Quality Checks ==="
ERRORS=0

# 1. Spec / Formal profile
if [[ -f "spec/FEATURES.md" ]]; then
  echo "📋 Checking spec/FEATURES.md..."
  if grep -q "^## F-" spec/FEATURES.md; then
    echo "  ✅ FEATURES.md has feature entries"
  else
    echo "  ❌ FEATURES.md missing feature entries"
    ((ERRORS++))
  fi
else
  echo "  ⚠️  spec/FEATURES.md not found (Formal profile)"
fi

# 2. Lint (when package.json exists)
if [[ -f "package.json" ]]; then
  echo "📋 Running ESLint..."
  if npm run lint --if-present 2>/dev/null; then
    echo "  ✅ ESLint passed"
  else
    echo "  ❌ ESLint failed"
    ((ERRORS++))
  fi

  echo "🧪 Running unit tests..."
  if npm test --if-present 2>/dev/null; then
    echo "  ✅ Unit tests passed"
  else
    echo "  ❌ Unit tests failed"
    ((ERRORS++))
  fi

  echo "🔨 Checking build..."
  if npm run build --if-present 2>/dev/null; then
    echo "  ✅ Build successful"
  else
    echo "  ❌ Build failed"
    ((ERRORS++))
  fi
else
  echo "  ⏭️  No package.json yet; skipping lint/test/build"
fi

if [[ $ERRORS -gt 0 ]]; then
  echo ""
  echo "❌ $ERRORS check(s) failed"
  exit 1
fi
echo ""
echo "✅ All checks passed"
exit 0
