import { Command } from "commander";
import { runCreateCommand } from "../src/generator";
import { runInitCommand } from "./init";

const program = new Command();

program
  .command("component <name>")
  .description("Generate a new component")
  .action(async (name) => {
    await runCreateCommand("component", name);
    console.log(`✅ Component ${name} created.`);
  });

program
  .command("init")
  .description("Initialize vite-create.config.json and template folder")
  .action(() => {
    runInitCommand();
  });

program.parse(process.argv);
