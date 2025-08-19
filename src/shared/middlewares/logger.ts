import morgan, { TokenIndexer } from "morgan";
import chalk from "chalk";
import { IncomingMessage, ServerResponse } from "http";

// Création d'un format personnalisé nommé "colored"
morgan.format(
  "colored",
  (
    tokens: TokenIndexer<IncomingMessage, ServerResponse>,
    req: IncomingMessage,
    res: ServerResponse
  ): string => {
    const status = tokens.status(req, res) ?? "0";
    const method = tokens.method(req, res) || "";
    const url = tokens.url(req, res) || "";
    const time = tokens["response-time"](req, res) || "0";
    const date = tokens.date(req, res);

    const methodColor =
      method === "GET"
        ? chalk.green
        : method === "POST"
        ? chalk.blue
        : method === "PUT"
        ? chalk.yellow
        : method === "DELETE"
        ? chalk.red
        : chalk.white;

    const statusColor =
      +status >= 500
        ? chalk.yellow
        : +status >= 400
        ? chalk.red
        : +status >= 300
        ? chalk.cyan
        : chalk.green;

    return [
      methodColor(method),
      chalk.cyan(url),
      statusColor(status),
      chalk.magenta(`${time} ms`),
      chalk.blue(date),
    ].join(" ");
  }
);

export const logger = morgan("colored");
