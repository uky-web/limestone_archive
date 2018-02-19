# Monolith

This project builds automatically to https://newcity.gitlab.io/monolith/ when commits are made to the master branch.

## Requirements:
* [Docker](https://www.docker.com/products/overview)
* [Docker Compose](https://docs.docker.com/compose/install/)
* Mac or some other flavor of Unix

## Building the styleguide

Monolith relies on Docker to build the style guide. To get Docker up and running, type:

```docker-compose up```

at the command line. This will start Docker and continue to run until you either a) Docker crashes, b) you hit `ctrl-c` to terminate Docker or c) you run `docker-compose down` in the same directory but from a different terminal window. There are other circumstances that will cause Docker to terminate, (power outage, nuclear holocaust, supernovae) but the previous three are the circumstances most under your control.

The Matrix-like pattern that results on your terminal screen is the output from the two docker processes. Error messages will appear here, so I like to keep it up and running in a visible location. If you don't want to look at it, you can start docker with:

```docker-compose up -d```

When (not "if") you want to get the output from one of the containers, use the (docker logs)[https://docs.docker.com/engine/reference/commandline/logs/] command.

## Editing Patterns and Styles

Most Pattern Lab edits will either be to "patterns," which are Twig files, or to pre-compiled assets like images, SCSS, and JavaScript files.

Patterns are located in `/src/_patterns`. Changes made to these files will trigger a Pattern Lab update.

Assets are located in, predictably enough, `/assets/`. Processing of assets will be handled according to their related configuration in the gulpfile.

## Hosted Project Web Site
<!-- / Downloadable Artifacts -->

If you want a compiled version of the pattern library, push your changes to the `master` branch of the current project repository on Gitlab. Gitlab will generate a compiled site from your source files and host it as a website at:

`http://newcity.gitlab.io/{project-name}/`

To download the compiled site files, visit:

`https://gitlab.com/newcity/{project-name}/pipelines`

Confirm that the latest pipeline has completed and passed, then click the `Artifacts` download button at the far right of the pipeline row. Choose `Download generate:patternlab artifacts` to save the compiled site to your computer.

## Configuring the Dev Environment

### Gulp

In the default monolith setup, the project gulpfile is mounted from:

`/docker/taskrunner/gulpfile.js`

You can make any changes to that gulpfile that you need. If you do not want to modify the gulpfile, or if you want to make sure that your project's gulpfile stays in perfect sync with the core monolith project, edit the `docker-compose.yml` file to remove or comment out the following line:

`- ./docker/taskrunner/gulpfile.js:/app/gulpfile.js:ro`

### NPM / Yarn

Monolith is bundled with a standard set of NPM modules, maintained with the `Yarn` package manager. In the default monolith setup, Docker mounts the project npm module settings from:

`/docker/taskrunner/gulpfile.js`

If you do not want to modify the package list, or if you want to make sure that your project's modules stay in perfect sync with the core monolith project, edit the `docker-compose.yml` file to remove or comment out the following line:

`- ./docker/taskrunner/package.json:/app/package.json:ro`
