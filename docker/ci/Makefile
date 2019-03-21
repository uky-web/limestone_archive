COMMIT_MESSAGE=BUILD: $(shell git log -1 --pretty=%B | cat | tr -d "\'")
REMOTE_REPO= git@gitlab.com:uky-web/patternlab-artifact.git
BUILD_REPO=/tmp/artifact

init:
	test -d /root/.ssh || mkdir /root/.ssh
	chmod 700 /root/.ssh
	cp docker/ci/ci_ssh_config /root/.ssh/config
	chmod 600 /root/.ssh/config

clone:
	git clone $(REMOTE_REPO) $(BUILD_REPO)
	git config --global user.email "geeks@insidenewcity.com"
	git config --global user.name "CI Bot"

replay:
	rsync -rlD --delete --exclude .git themes/custom/ukd8/ $(BUILD_REPO)

push:
	cd $(BUILD_REPO) && git add . && git commit -m "$(COMMIT_MESSAGE)" && git push origin master
