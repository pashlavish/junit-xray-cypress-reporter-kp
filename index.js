'use strict'
const debug = require('debug')('junit-xray-reporter')
const MochaJUnitReporter = require('../mocha-junit-reporter/index.js')

class JUnitXrayReporter extends MochaJUnitReporter {
	constructor(runner, options) {
		super(runner, options)
		debug('Initializing JUnitXrayReporter')
	}

	getTestcaseData(test, err) {
		const testcase = super.getTestcaseData(test, err)
		const jiraID = this.generateJiraID(test)
		const testData = this.getTestDataFromSpec(test)

		if (jiraID.length) {
			let property = [{ property: { _attr: { name: 'test_key', value: jiraID } } }]
			testcase.testcase.push({
				properties: property,
			})
		}

		if (testData.length) {
			let property = [{ property: { _attr: { name: 'testrun_comment', value: testData } } }]
			testcase.testcase.push({
				properties: property,
			})
		}
		return testcase
	}

	generateJiraID(element) {
		const testConfig = element._testConfig
		if (!testConfig) {
			return []
		}

		//
		const outdatedConfig = testConfig['env'] ? testConfig.env : testConfig.unverifiedTestConfig?.env
		if (outdatedConfig) {
			console.log(
				"junit-xray-cypress-reporter v0.1.1 released: REPORTER OUTDATED CONFIG! Change the param 'env' with the value 'xray' to align the module with NEWEST CONFIGURATIONS"
			)
			if (!outdatedConfig) {
				return []
			}
			const jiraID = outdatedConfig['jiraID']

			if (!jiraID) {
				return []
			}
			return jiraID
		}

		const envConfig = testConfig['xray'] ? testConfig.xray : testConfig.unverifiedTestConfig?.xray
		if (!envConfig) {
			return []
		}
		const jiraID = envConfig['jiraID']

		if (!jiraID) {
			return []
		}
		return jiraID
	}

	getTestDataFromSpec(element) {
		const testConfig = element._testConfig
		if (!testConfig) {
			return []
		}

		//
		const outdatedConfig = testConfig['env'] ? testConfig.env : testConfig.unverifiedTestConfig?.env
		if (outdatedConfig) {
			console.log(
				"junit-xray-cypress-reporter v0.1.1 released: REPORTER OUTDATED CONFIG! Change the param 'env' with the value 'xray' to align the module with NEWEST CONFIGURATIONS"
			)
			if (!outdatedConfig) {
				return []
			}
			const comments = outdatedConfig['runComments']

			if (!comments) {
				return []
			}
			return comments
		}

		const envConfig = testConfig['xray'] ? testConfig.xray : testConfig.unverifiedTestConfig?.xray
		if (!envConfig) {
			return []
		}
		const comments = envConfig['runComments']

		if (!comments) {
			return []
		}
		return comments
	}
}

module.exports = JUnitXrayReporter
