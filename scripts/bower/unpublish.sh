#!/bin/bash

# Script for updating the Angular bower repos from current local build.

echo "#################################"
echo "#### Untag bower ################"
echo "#################################"

ARG_DEFS=(
  "--action=(prepare|publish)"
  "--version-number=([0-9]+\.[0-9]+\.[0-9]+(-[a-z]+\.[0-9]+)?)"
)

function init {
  TMP_DIR=$(resolveDir ../../tmp)
  BUILD_DIR=$(resolveDir ../../build)
  REPOS=(
    angular
    angular-animate
    angular-cookies
    angular-i18n
    angular-loader
    angular-mocks
    angular-route
    angular-resource
    angular-sanitize
    angular-scenario
    angular-touch
  )
}




function prepare {
  #
  # clone repos
  #
  for repo in "${REPOS[@]}"
  do
    echo "-- Cloning bower-$repo"
    git clone git@github.com:angular/bower-$repo.git $TMP_DIR/bower-$repo
  done

  #
  # update bower.json
  # tag each repo
  #
  for repo in "${REPOS[@]}"
  do
    echo "-- Removing $NEW_VERSION tag from bower-$repo"
    cd $TMP_DIR/bower-$repo

    echo "-- Deleting tag v$VERSION_NUMBER in bower-$repo"
    git tag -d v$VERSION_NUMBER
    cd $SCRIPT_DIR
  done
}

function publish {
  for repo in "${REPOS[@]}"
  do
    echo "-- Pushing bower-$repo"
    cd $TMP_DIR/bower-$repo
    git push origin v$NEW_VERSION
    cd $SCRIPT_DIR
  done
}

source $(dirname $0)/../utils.inc
