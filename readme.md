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
# use it in the place of `git clone` :) ! (oh shiiit :O !! )
code get git@github.com:tangmi/codeget.git

# always clones to:
#   ~/code/github.com/tangmi/codeget
```

notes:

* `git clone`'s a repo at `username/repo`
* saves it to `${code dir}/<domain>/<username>/<repo>`
* calls `code go username/repo`

* fails if repo is already cloned

* reports a message if repo's remote doesn't match its path

### `code go <search query>`

* uses fuzzy matching to find the repo matching the search query
   * if there is only one result, prints it out
      * one can then cd into the directory by typing ``cd `!!` ``
   * if there is more than one result, print them out

#### plans for features:

> * changes directory to `${code dir}/<domain>/<username>/<repo>` for you

### `code make <repo name>`

* creates an empty directory at `${code dir}/localhost/<repo name>` (repo is not created for you)
    * the idea is that the `${code dir}/localhost` dir can purged if a dev is diligent about pushing everything and work and be `code get`'ed and worked on in the non-localhost dir

#### plans for features:

* have a `code organize` or similar that looks through the `origin` remote and organizes code for you

## notes

* `code get` assumes `https://github.com` if a short `username/repo` form is used (can be overriden with a full domain name)

## todo

* allow setting of CODE_DIR
* fix error message when git can't find the repo
