#!/bin/bash

# Script for updating code.angularjs.org repo from current local build.

echo "#################################"
echo "## Update code.angular.js.org ###"
echo "#################################"

ARG_DEFS=(
  "--action=(prepare|publish)"
  "--version-number=([0-9]+\.[0-9]+\.[0-9]+(-[a-z]+\.[0-9]+)?)"
)

function init {
  TMP_DIR=$(resolveDir ../../tmp)
  BUILD_DIR=$(resolveDir ../../build)
  REPO_DIR=$TMP_DIR/code.angularjs.org
  NEW_VERSION=$(cat $BUILD_DIR/version.txt)
}

function prepare {
  echo "-- Cloning code.angularjs.org"
  git clone git@github.com:angular/code.angularjs.org.git $REPO_DIR

  #
  # copy the files from the build
  #
  echo "-- Removing $VERSION_NUMBER from code.angularjs.org"
  cd $REPO_DIR
  git rm -r $VERSION_NUMBER

  #
  # commit
  #
  echo "-- Committing code.angularjs.org"
  git commit -m "removing v$VERSION_NUMBER"
}

function _update_code() {
  cd $REPO_DIR

  echo "-- Pushing code.angularjs.org"
  git push origin master


  echo "-- Refreshing code.angularjs.org: backend=$backend"
  curl https://code.angularjs.org/gitFetchSite.php

}

function publish {
  _update_code
}

source $(dirname $0)/../utils.inc
