const prompts = [
  {
    type: "list",
    name: "deploymentOption",
    message: "Where would you like to deploy your application?",
    choices: ["AWS", "Azure", "Minikube"],
    default: "Minikube"
  },
  {
    type: "list",
    name: "functionTemplate",
    message: "Select the Knative function template for your application:",
    choices: ["http", "cloudevents"],
    default: "http"
  },
  {
    type: "list",
    name: "functionLanguage",
    message: "Select the Knative function language for your application:",
    choices: [
      "Node",
      "Python",
      "Go",
      "Quarkus",
      "Rust",
      "Spring Boot",
      "TypeScript"
    ],
    default: "Node"
  },
  {
    type: "input",
    name: "functionName",
    message: "Enter the name of the function:",
    validate: input => {
      if (!input.trim()) {
        return "Please enter a valid function name.";
      }

      return true;
    }
  }

  // {
  //     type: "confirm",
  //     name: "enableFeature",
  //     message: "Do you want to enable a special feature?",
  //     default: false,
  // },
];

module.exports = prompts;
