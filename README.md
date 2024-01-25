# junit-xray-cypress-reporter

range-jira-result is a custom reporter for use with [Mocha](https://mochajs.org/), [XRay](https://www.getxray.app/) (Native Test Management for Jira) and [Cypress](https://www.cypress.io/) testing frameworks.  
The reporter helps you to integrate your Cypress/Mocha test with XRay easily by producing enriched JUnit-style XML test report files which can be uploaded into XRay with API or other tools.  
The reporter is built on the top of [mocha-junit-reporter v2.2.0](https://www.npmjs.com/package/mocha-junit-reporter) so all the configurations in the official doc, are inherited from this npm package.  
This reporter offers the ability to specify a Jira-Issue for each it{} inside your cypress test and creates a custom report that is easy to load into XRay.

## Installation

As a dev module:

```shell
$ npm install range-jira-result --save-dev
```

or as a global module:

```shell
$ npm install -g range-jira-result
```

## Configuration

### Test level

```shell
describe('My First Test', () => {
  it('Does not do much!', {xray:{jiraID:"CALC-1234"}}, () => {
    expect(true).to.equal(true);
  })
})
```

#### Cypress configuration file (cypress.config.js)

```shell
const { defineConfig } = require("cypress");
module.exports = defineConfig({
  reporter: "junit-xray-cypress-reporter",
  reporterOptions: {
    mochaFile: "cypress/results/my-test-output-[hash].xml"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

```

Every other {reporterOptions} explained here: [mocha-junit-reporter v2.2.0](https://www.npmjs.com/package/mocha-junit-reporter) are availabile.

## Example

1. Install 'range-jira-result' to the cypress project

```shell
$ npm install range-jira-result --save-dev
```

2. Configure 'range-jira-result' as the reporter and do other configurations as necessary. Configurations can be done in the cypress.config.js or in the command line.  
   Add this to cypress.config.js

```shell
const { defineConfig } = require("cypress");
module.exports = defineConfig({
  reporter: "range-jira-result",
  reporterOptions: {
    mochaFile: "cypress/results/my-test-output-[hash].xml"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

```

'mochaFile' is the path to the report file. When there are several test files run it will generate a report file for each test file, so in order to generate unique file names and not overwrite the existing ones, the `[hash]` is added to the name of the report file.

3. Add cypress test with XRay-related elements

```shell
describe('My First Test', () => {
        it('Does not do much!', {xray:{jiraID:"CALC-1234"}}, () => {
            expect(true).to.equal(true);
        })
    })
```

4. Run tests and generate report

```shell
npx cypress run --spec "path/to/file"
```

5. View report file

Report file generated at '<Cypress_project_root>/cypress/results'.

"my-test-output-828a1c4885dc687b1a19e11e24b9437e.xml"

```shell
<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Mocha Tests" time="0.1070" tests="1" failures="0">
  <testsuite name="Root Suite" timestamp="2023-01-27T13:51:23" tests="0" file="cypress\e2e\test.cy.js" time="0.0000" failures="0">
  </testsuite>
  <testsuite name="My First Test" timestamp="2023-01-27T13:51:23" tests="1" time="0.0700" failures="0">
    <testcase name="My First Test Does not do much!" time="0.0820" classname="Does not do much!">
      <properties>
        <property name="test_key" value="CALC-1234"/>
      </properties>
    </testcase>
  </testsuite>
</testsuites>
```

As you can see the property has beenn added and now could be readed correctly by XRay.

```shell
<properties>
  <property name="test_key" value="CALC-1234"/>
</properties>
```

7. Now just upload the report to XRay and the card in Jira will be updated automatically

## THE JOB IS DONE!

Happy testing to everyone!

a.
