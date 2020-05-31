# The Application under test
The application under test is Conduit, an example social blogging site (Medium.com clone). it uses a custom API for all requests, including authenticantion, you can find more information at https://github.com/ahmed-belhadj/conduit

# The testing framework
* [Nightwatch.js](https://nightwatchjs.org/) is being used as the core End-to-End testing framework
* [Cucumber.js](https://github.com/cucumber/cucumber-js) Tests are written in Gherkin sintax using a BDD approach.
* [Knex.js](http://knexjs.org/) is a SQL query builder, it is used in this project to build a helper module `data-loader.js` which cleans a sqlite3 DB. 
* Selenium server is used to drive the browser, running the test locally will trigger the test in selenium server locally and will be managed by nightwatch, running the server in a docker container will trigger the tests in a dockerized selenium grid, see how to run it bellow.

# Install
* Clone this repo
* init and checkout the git submodules `git submodule init` , `git submodule update`
* `npm install` to install all required dependencies

# Start the demo app
* `npm start` will start the server and client

# Run the tests
* `npm test` to run all tests
* in package.json you'll find other scripts that target a single feature, for instance `npm run test-conduit-signup` will only execute tests from `features/conduit/signup.feature`
* When running the tests locally make sure you have google chrome installed, as this is the browser being targeted in `nightwatch.conf.js`
* You can also run the tests in a docker container, you'll need to install [Docker](https://www.docker.com/why-docker) then build and run the image, you can do this by cd to the directory where you cloned the repo and then
`docker-compose -f .\DockerCompose.yml up`
