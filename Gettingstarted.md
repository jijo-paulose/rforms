# Installation #
Before you can run any of the samples you have to make sure you have
downloaded and build dojo. Simply run:
```
lib/INSTALL-dojo.sh
```

If you want to run any of the built versions, i.e. versions that load rforms
as a single minified file, you need to build RForms first, this is done by:
```
build/build.sh
```

# Trying out the samples #
If you have made rforms available via a web server everything should work directly, just make sure you have installed dojo as outlined above. The url to rforms samples should be something like `http://yourdomain/rforms_directory/samples/index.html`

If you have not made rforms available via a web server you can still try rforms via
the `file:///` protocol. This option is useful when doing development, but it requires that you configure your browser somewhat due to security restrictions regarding doing XHR requests from pages loaded via the `file:///` protocol.

In Firefox this is done by:
  1. go into the config mode by typing about:config in the locationbar.
  1. earch and change the `security.fileuri.strict_origin_policy` to `false`.

In Chrome this is done by starting the browser with the following flag:
`--allow-file-access-from-files`

**NOTE:** XForms relies on the dojo library which loads files via XHR, even in built mode it loads the localization files, hence the workaround needed with the file:/// protocol.