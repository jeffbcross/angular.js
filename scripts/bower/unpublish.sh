#!/bin/bash

# Script for removing tags from the Angular bower repos

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
  # delete tag in each repo
  #
  for repo in "${REPOS[@]}"
  do
    echo "-- Creating dummy git repo for bower-$repo with origin remote"
    mkdir $TMP_DIR/bower-$repo
    cd $TMP_DIR/bower-$repo
    git init
    git remote add origin git@github.com:angular/bower-$repo.git

    cd $SCRIPT_DIR
  done
}

function publish {
  for repo in "${REPOS[@]}"
  do
    echo "-- Pushing bower-$repo"
    cd $TMP_DIR/bower-$repo
    git push origin :v$VERSION_NUMBER
    cd $SCRIPT_DIR
  done
}

source $(dirname $0)/../utils.inc
