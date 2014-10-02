#!/bin/bash

# Script for removing specified release dir from code.angularjs.org.

echo "################################################"
echo "## Remove a version from code.angular.js.org ###"
echo "################################################"

ARG_DEFS=(
  "--action=(prepare|publish)"
  "--version-number=([0-9]+\.[0-9]+\.[0-9]+(-[a-z]+\.[0-9]+)?)"
)

function init {
  TMP_DIR=$(resolveDir ../../tmp)
  BUILD_DIR=$(resolveDir ../../build)
  REPO_DIR=$TMP_DIR/code.angularjs.org
}

function prepare {
  echo "-- Cloning code.angularjs.org"
  git clone git@github.com:angular/code.angularjs.org.git $REPO_DIR

  #
  # Remove the files from the repo
  #
  echo "-- Removing $VERSION_NUMBER from code.angularjs.org"
  cd $REPO_DIR
  git rm -r $VERSION_NUMBER

  echo "-- Committing removal to code.angularjs.org"
  git commit -m "removing v$VERSION_NUMBER"
}

function _update_code() {
  cd $REPO_DIR

  echo "-- Pushing code.angularjs.org to github"
  git push origin master


  echo "-- Propagating update to server code.angularjs.org"
  curl https://code.angularjs.org/gitFetchSite.php

}

function publish {
  _update_code
}

source $(dirname $0)/../utils.inc
