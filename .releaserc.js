/*
 *  Copyright © 2020 Aram Meem Company Limited. All Rights Reserved.
 */

const hooks = require('semantic-release-monorepo-hooks');
const output = hooks();

module.exports = {
  extends: 'semantic-release-monorepo',
  tagFormat: 'v${version}',
  branches: [
    'master',
    {
      name: 'beta',
      prerelease: 'rc',
    },
  ],
  verifyConditions: ['@semantic-release/npm'],
  generateNotes: ['@semantic-release/release-notes-generator'],
  prepare: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    {
      path: '@semantic-release/exec',
      cmd: 'echo HELLO',
    },
  ],
  publish: ['@semantic-release/npm'],
  success: [
    {
      path: '@semantic-release/exec',
      cmd: 'echo "${nextRelease.notes}" > /tmp/releaseNotes; echo "${nextRelease.version}" > /tmp/releaseVersion',
    },
  ],
  analyzeCommits: {
    preset: 'angular',
    releaseRules: [
      {
        type: 'docs',
        release: 'patch',
      },
      {
        type: 'refactor',
        release: 'patch',
      },
      {
        type: 'style',
        release: 'patch',
      },
      {
        type: 'minor',
        release: 'minor',
      },
      {
        type: 'patch',
        release: 'patch',
      },
      {
        type: 'major',
        release: 'major',
      },
      {
        type: 'breaking',
        release: 'major',
      },
    ],
  },
  monorepo: {
    analyzeCommits: ['@semantic-release/commit-analyzer'],
    generateNotes: ['@semantic-release/release-notes-generator'],
  },
};
