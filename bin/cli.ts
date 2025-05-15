import { Command } from "commander";
import { runCreateCommand } from "../src/generator";
import { runInitCommand } from "./init";
import { loadConfig } from "./loadConfig";

const program = new Command();

program
  .command("component <name>")
  .description("Generate a new component")
  .action(async (name) => {
    await runCreateCommand("component", name);
    console.log(`Component ${name} created.`);
  });

program
  .command("page <name>")
  .description("Generate a new page")
  .action(async (name) => {
    await runCreateCommand("page", name);
    console.log(`Page ${name} created.`);
  });

program
  .command("store <name>")
  .description("Generate a new store")
  .action(async (name) => {
    await runCreateCommand("store", name);
    console.log(`Store ${name} created.`);
  });

program
  .command("init")
  .description("Initialize vite-create.config.json and template folder")
  .action(() => {
    runInitCommand();
  });

program
  .arguments("<generator> <name>")
  .description("Generate custom entity based on config")
  .action(async (generator, name) => {
    const config = loadConfig();
    if (!config.generators[generator]) {
      console.error(`Generator "${generator}" not found in config`);
      process.exit(1);
    }
    await runCreateCommand(generator, name);
    console.log(`✅ ${generator} ${name} created.`);
  });

program.parse(process.argv);
