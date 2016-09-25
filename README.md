# KnownForWeb

[![Build Status]][Travis]
[![Coverage Status]][Coveralls]
[![Dependency Status]][DavidDM]

The UI for *"Known For"*, a simple, movie-based guessing game.

## Background

My cousin Alex suggested this game, originally just looking an actor up
on IMDb and asking the other person to guess which top three films they
were "known for". Having built [aTMDb] and as I'm currently using
[Angular 2] at work, I thought this would make a nice little web app.

[![Powered by TMDb][TMDb logo]][TMDb]

## Development

This project was generated with [`angular-cli`]. The easiest way to get
it up and running is:

 - Fork and clone the repository
 - Run `npm install` to pull in the required packages
 - Run `npm run pree2e` to update the webdriver for end-to-end testing
 - Install the CLI globally using `npm install -g angular-cli`
 - Set the `apiBaseUrl` in `src/environments/environment.dev.ts` to an
   appropriate value (see the instructions on [`known-for-api`] to get
   that running locally using e.g. PCF Dev or Docker)
 - Run `ng serve` to boot up the dev server
 - Point your browser at http://localhost:4200

For more information see the CLI documentation.

## Testing

The CLI provides commands for linting, unit tests and end-to-end tests.
The last of these I prefer to run directly, as the CLI seems to suppress
the output:

 - `ng lint` to run the linter
 - `ng test` to run the unit tests (add `--watch false` to run once and
   then stop)
 - `npm run endtoend` to run the end-to-end tests (or `ng e2e` if you
   don't mind the output)

Alternatively, `npm run testall` to run all three in sequence.

## Deployment

You can build in production mode with `npm run package`; make sure you
have set an appropriate API endpoint for the staging mode (see
`src/environments/environment.stage.ts`), as this is currently used by
the `package` command.

The project includes a `manifest.yml` for deployment to [Cloud Foundry],
as the staging site is currently hosted on [Pivotal Cloud Foundry]. This
is as simple as installing the CF CLI, setting the target org and space
appropriately and running `cf push`.

The CLI also provides functionality to deploy to GitHub Pages, although
I haven't yet tried it: `ng github-pages:deploy`.

  [Angular 2]: https://angular.io
  [`angular-cli`]: https://github.com/angular/angular-cli
  [aTMDb]: https://pythonhosted.org/atmdb/
  [Build Status]: https://travis-ci.org/textbook/known-for-web.svg?branch=master
  [Cloud Foundry]: https://www.cloudfoundry.org/
  [Coverage Status]: https://coveralls.io/repos/github/textbook/known-for-web/badge.svg?branch=master
  [Coveralls]: https://coveralls.io/github/textbook/known-for-web?branch=master
  [Dependency Status]: https://david-dm.org/textbook/known-for-web/status.svg
  [DavidDM]: https://david-dm.org/textbook/known-for-web
  [`known-for-api`]: https://github.com/textbook/known-for-api
  [Pivotal Cloud Foundry]: https://pivotal.io/platform
  [TMDb]: https://www.themoviedb.org/
  [TMDb logo]: https://assets.tmdb.org/images/logos/var_2_1_PoweredByTMDB_Blk_Logo_Bree.png
  [Travis]: https://travis-ci.org/textbook/known-for-web
