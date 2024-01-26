Ramukaka is an alternative to Nodemon.

How does it work?

It has 3 components:
- A CLI application
- A child process
- A event emitter on file changes

In simple term, we have to build a CLI application which will listen to file change event and create child process based on passed params.

How to Build CLI application in Node?

Check index.js file, it is starting with `#!/usr/bin/env node`. It tells system that the script (index.js) will be executed by `node` present at given path.

Also, in package.json,
We need to create duplicate node binary by adding bin section.

Now, our CLI application is ready...🚀

Run `npm link` to run it globally like `ramukaka [your_file_name.js]`

Lets build, watcher for file changes and child process creator:
We can use `chokidar` to look for changes and emit respective events.
On each events, we need to restart the child process. Also, we need to pipe std io to parent process to view logs.
