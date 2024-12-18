#!/bin/bash

current_branch=$(git branch --show-current)
merge_base=$(git merge-base $current_branch master)
recommend_rebase="rebase your branch on the master branch."

# checking if PR branch is up to date
if ! git diff -s --exit-code $current_branch...master ; then
  echo "Branch ${current_branch} is not up-to-date with master. Please, ${recommend_rebase}"
  exit 1
fi

# checking if there is no new merge commit
current_commit=$(git show-ref --heads -s $current_branch)
for commit in $(git log $current_commit...$merge_base --format="%h"); do
  parent_count=$(git cat-file -p $commit | grep parent | wc -l)
  if [ "${parent_count}" != 1 ]; then
    commit_msg=$(git log $commit -1 --format="%s")
    echo "Merge commits like ${commit} (${commit_msg}) are not allowed. Please ${recommend_rebase}"
    exit 1
  fi
done
