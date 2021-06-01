import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { join } from "path";
import apiRouter from "./routes/index";
import { DatabaseConnection } from "./db/index";
import { StatusCodes } from "http-status-codes";

export class Server {
  private _app: Application;

  constructor() {
    this._app = express();
    this.initializeServer();
  }

  private initializeServer() {
    this._app.use(cors());
    this._app.use(helmet());
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true, limit: "5mb" }));
    this._app.use("/public", express.static(join(__dirname, "uploads")));
    this._app.use("/api", apiRouter);
    this.handleError();
  }

  private handleError() {
    this._app.use((req: Request, res: Response, next: NextFunction) => {
      const error: any = new Error("Not Found");
      error.status = StatusCodes.NOT_FOUND;
      next(error);
    });
    this._app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        return res.status(error.status || StatusCodes.BAD_REQUEST).json({
          error: {
            status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message || "Internal Server Error",
          },
        });
      }
    );
  }

  public listen(port: number, env: string) {
    this._app.listen(port, () => {
      console.log(`Server is running on port: ${port} in ${env} mode`);
      let _db: DatabaseConnection = new DatabaseConnection();
      _db.connect();
    });
  }
}
