# UK Limestone Component Library

This project includes SCSS, JS, and Twig for interface components used in UK websites.

- It provides a Patternlab static site to demonstrate components.
- It builds its assets (not including Twig) to an NPM packge for use in e.g. Drupal themes.

### Running 

To build and start a `browsersync` based server, run `npm start` in the command line (this should start automatically in gitpod).

Limestone is a set of Sass, Javascript, and Twig-based components for use on University of Kentucky websites.

## Using Limestone in your project

### As part of the UK Web Platform
The easiest way to use Limestone is via the UK Web Platform Drupal implementation. This includes the [UKD8 base theme](https://gitlab.com/uky-web/university-web-platform/drupal-8/ukd8-base-theme), which uses Limestone components. You can start a Drupal project using the UK Web Platform using our [Project Template](https://gitlab.com/uky-web/university-web-platform/drupal-8/project-template).

### As an NPM library
Alternatively, you can load the CSS, javascript, and static assets from Limestone via an NPM package served from a git repo. The Git repository that provides the NPM package for this project is located [here](https://gitlab.com/uky-web/university-web-platform/web-design-system/patternlab-artifact).

You can read about adding a git-based NPM depedency in [the NPM documentation](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#git-urls-as-dependencies).

## Contributing
[Gitpod.io](gitpodi.io) is the recommended development environment for Limestone. On load, a Gitpod workspace will begin a gulp watch process that will build a Patternlab instance on changes to relevant files. If you would like to develop this project in an alternative environment, review the `.gitpod.yml` file for a description of the docker container and initial tasks gitpod runs.




