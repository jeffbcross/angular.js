#!/bin/bash

# Tags a release
# so that travis can do the actual release.

echo "###################################"
echo "## Untag angular.js for a release #"
echo "###################################"

ARG_DEFS=(
  "--action=(prepare|publish)"
  # the version number of the release.
  # e.g. 1.2.12 or 1.2.12-rc.1
  "--version-number=([0-9]+\.[0-9]+\.[0-9]+(-[a-z]+\.[0-9]+)?)"
)

function checkVersionNumber() {
  BRANCH_PATTERN=$(readJsonProp "package.json" "branchVersion")
  if [[ $VERSION_NUMBER != $BRANCH_PATTERN ]]; then
    echo "version-number needs to match $BRANCH_PATTERN on this branch"
    usage
  fi
}

function init {
  cd ../..
  checkVersionNumber
  TAG_NAME="v$VERSION_NUMBER"
}

function prepare() {
  git tag -d "$TAG_NAME"
}

function publish() {
  # push the tag deletion to github
  git push origin ":refs/tags/$TAG_NAME"
}

source $(dirname $0)/../utils.inc
