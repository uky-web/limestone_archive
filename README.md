# UK Style Guide in Pattern Lab

This project builds automatically to https://newcity.gitlab.io/coi-styleguide/ when commits are made to the master branch.

## Requirements:

* [Docker](https://www.docker.com/products/overview)
* [Docker Compose](https://docs.docker.com/compose/install/)
* Mac or some other flavor of Unix that supports `fsevents`. 

## Building the style guide

Monolith relies on Docker to build the style guide. To get Docker up and running, type:

```docker-compose up```

at the command line. This will start Docker and continue to run until you either a) Docker crashes, b) you hit `ctrl-c` to terminate Docker or c) you run `docker-compose down` in the same directory but from a different terminal window. There are other circumstances that will cause Docker to terminate (power outage, nuclear holocaust, supernovae) but the previous three are the circumstances most under your control.

The Matrix-like pattern that results on your terminal screen is the output from the two docker processes. Error messages will appear here, so I like to keep it up and running in a visible location. If you don't want to look at it, you can start docker with:

```docker-compose up -d```

When (not "if") you want to get the output from one of the containers, use the (docker logs)[https://docs.docker.com/engine/reference/commandline/logs/] command.

## Editing Patterns and Styles

Most Pattern Lab edits will either be to "patterns," which are Twig files, or to pre-compiled assets like images, SCSS, and JavaScript files.

Patterns are located in `/src/_patterns`. Changes made to these files will trigger a Pattern Lab update.

Assets are located in, predictably enough, `/assets/`. Processing of assets will be handled according to their related configuration in the gulpfile.

## Configuring the Dev Environment

### Gulp

The project gulpfile is mounted from:

`/docker/taskrunner/gulpfile.js`

You can make any changes to that gulpfile that you need. If you do not expect to modify the gulpfile edit the `docker-compose.yml` file to remove or comment out the following line:

`- ./docker/taskrunner/gulpfile.js:/app/gulpfile.js:ro`

### NPM / Yarn

This project's required modules are maintained with the `Yarn` package manager and listed in:

`/docker/taskrunner/gulpfile.js`

If you need to add more modules, that is the place to do it. This should always stay mounted, since the fallback configuration may not have all the required modules.

### PatternLab

If you need to, you can tweak Pattern Lab settings in `/docker/pl/config.yml` and `/docker/pl/gulpfile.js`. It would probably be wise to leave these alone, however. 
