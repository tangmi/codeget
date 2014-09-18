# codeget

cli tool to keep your source code organized for you! lol!

```sh
npm install -g tangmi/codeget
```

## actions

### `code get <repo url || username/repo>`

does a git clone into a directory set by `configure.js` and the url itself: by default it clones to `~/code/<repo hostname>/<username>/<reponame>`, which is kind of how golang does it and is pretty organized i think.

example:

```sh
code get git@github.com:tangmi/codeget.git
```

notes:

* `git clone`'s a repo at `username/repo`
* saves it to `${code dir}/<domain>/<username>/<repo>`
* calls `code go username/repo`

* fails if repo is already cloned

* reports a message if repo's remote doesn't match its path

### `code go <repo url || username/repo>`

* changes directory to `${code dir}/<domain>/<username>/<repo>`

* reports a message if repo's remote doesn't match its path

### `code make <repo name>`

* creates an empty directory and repo (`git init`) at `${code dir}/localhost/<repo name>` with no remote
    * the idea is that the `${code dir}/localhost` dir can purged if a dev is diligent about pushing everything and work and be `code get`'ed and worked on in the non-localhost dir

## notes

* `code get/go` assumes `https://github.com` if a short `username/repo` form is used (can be overriden with a full domain name)

## todo

* allow setting of CODE_DIR
* fix error message when git can't find the repo