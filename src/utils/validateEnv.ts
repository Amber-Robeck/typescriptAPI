import { cleanEnv, str, port } from "envalid";

function validateEnv(): void {
  cleanEnv(process.env, {
    PORT: port({
        default: 3001,
    }),
    NODE_ENV: str({
        choices: ["development", "production"]
    })
  });
}

export default validateEnv;