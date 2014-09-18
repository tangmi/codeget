# codeget

cli tool to keep your source code organized for you! lol!

## actions

### `code get <repo url || username/repo>`

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