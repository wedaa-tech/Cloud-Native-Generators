const chalk = require("chalk");

module.exports = {
  validateOptions(options) {
    const validDeploymentOptions = ["minikube", "aws", "azure"];
    const validFunctionTemplates = ["http", "cloudevents"];
    const validFunctionLanguages = ["go", "node", "python"];

    const requiredKeys = [
      "deploymentOptions",
      "functionTemplate",
      "functionLanguage",
      "functionName"
    ];

    const missingKeys = requiredKeys.filter(key => !(key in options));
    if (missingKeys.length > 0) {
      throw new Error(
        chalk.red(`Missing required keys: ${missingKeys.join(", ")}`)
      );
    }

    if (!validDeploymentOptions.includes(options.deploymentOptions)) {
      throw new Error(
        chalk.red.bold(
          `Invalid value for deploymentOptions:  ${chalk.white(
            options.deploymentOptions
          )} \n${chalk.green.bold(
            "Valid options:"
          )} ${validDeploymentOptions
            .map(opt => chalk.white(opt))
            .join(chalk.white(", "))}`
        )
      );
    }

    if (!validFunctionTemplates.includes(options.functionTemplate)) {
      throw new Error(
        chalk.red.bold(
          `Invalid value for functionTemplate: ${chalk.white(
            options.functionTemplate
          )} \n${chalk.green.bold(
            "Valid options:"
          )} ${validFunctionTemplates
            .map(opt => chalk.white(opt))
            .join(chalk.white(", "))}`
        )
      );
    }

    if (!validFunctionLanguages.includes(options.functionLanguage)) {
      throw new Error(
        chalk.red.bold(
          `Invalid value for functionLanguage: ${chalk.white(
            options.functionLanguage
          )} \n${chalk.green.bold(
            "Valid options:"
          )} ${validFunctionLanguages
            .map(opt => chalk.white(opt))
            .join(chalk.white(", "))}`
        )
      );
    }

    // You can add more specific validations for other keys and values if needed
  }
};
