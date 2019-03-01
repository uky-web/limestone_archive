COMMIT_MESSAGE=BUILD: $(shell git log -1 --pretty=%B | cat | tr -d "\'")
REMOTE_REPO=git@gitlab.com:uky-web/patternlab-artifact.git
BUILD_REPO=/tmp/pl

init:
	test -d /root/.ssh || mkdir /root/.ssh
	chmod 700 /root/.ssh
	cp .ci_ssh_config /root/.ssh/config
	chmod 600 /root/.ssh/config

clone:
	git clone $(REMOTE_REPO) $(BUILD_REPO)
	git config --global user.email "ci-bot@uky.edu"
	git config --global user.name "CI Bot"

replay:
	rsync -av --delete --exclude .git pl/public/ $(BUILD_REPO)
	cp docker/pl/gitlab-ci.yml $(BUILD_REPO)/.gitlab-ci.yml

push:
	cd $(BUILD_REPO) && git add . && git com
	mit -m "$(COMMIT_MESSAGE)" && git push origin master