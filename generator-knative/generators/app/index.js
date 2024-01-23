"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const prompts = require("./prompts");
const path = require("path");
const fs = require("fs");
const { validateOptions } = require("./validators/optionsValidator");

const {
  goHttpFiles,
  nodeHttpFiles,
  pythonHttpFiles,
  goCloudEventFiles,
  nodeCloudEventFiles,
  pythonCloudEventFiles
} = require("./filesList");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.options = {};
    this.usePrompts = false;

    if (opts.file) {
      const filePath = path.resolve(opts.file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      this.options = JSON.parse(fileContents);
      validateOptions(this.options);
    } else {
      this.usePrompts = true;
    }
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red("generator-knative")} generator!`)
    );

    if (!this.usePrompts) {
      return;
    }

    return this.prompt(prompts).then(props => {
      // Convert string values to lowercase, excluding boolean values
      Object.keys(props).forEach(key => {
        if (typeof props[key] === "string") {
          this.options[key] = props[key].toLowerCase();
        } else {
          this.options[key] = props[key];
        }
      });
    });
  }

  writing() {
    const options = this.options;
    try {
      const fileList = this.getFunctionFileList(
        options.functionLanguage,
        options.functionTemplate
      );
      this._fileHelper(fileList, options);
    } catch (error) {
      this.log(error);
    }
  }

  // Uncomment the below line if you want to install the dependencies after the generation is complete.
  install() {
    // This.installDependencies();
  }

  // Developer defined functions
  _fileHelper(fileList, opts) {
    fileList.forEach(file => {
      const sourcePath = this.templatePath(file);
      const destinationPath = this.destinationPath(
        `knative/${opts.functionName}`
      );
      // Ensure hidden files and folders are included
      this.fs.copyTpl(
        sourcePath,
        destinationPath,
        opts,
        {},
        { globOptions: { dot: true } }
      );
    });
  }

  getFunctionFileList(language, template) {
    const fileLists = {
      go: { http: goHttpFiles, cloudevents: goCloudEventFiles },
      node: { http: nodeHttpFiles, cloudevents: nodeCloudEventFiles },
      python: { http: pythonHttpFiles, cloudevents: pythonCloudEventFiles }
    };
    return fileLists[language]?.[template] || [];
  }
};
