import fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifyMultipart from "fastify-multipart";
import * as fs from "fs";
import * as http from "http";
import { Readable } from "stream";
import playlistRoute from "./routes/playlist";
import tvGuideRoute from "./routes/tvGuide";

const server = fastify<http.Server, http.IncomingMessage, http.ServerResponse>({});

server.register(fastifyCors, { methods: ["GET", "PUT", "POST", "FETCH"] });

interface BodyEntry {
  data: Buffer;
  filename: string;
  encoding: string;
  mimetype: string;
  limit: false;
  tempFileName?: string;
}

server.register(fastifyMultipart, {
  addToBody: true,
  sharedSchemaId: "MultipartFileType",
  onFile: (
    fieldName: string,
    stream: Readable,
    filename: string,
    encoding: string,
    mimetype: string,
    body: Record<string, BodyEntry>
  ) => {
    console.log(fieldName, filename, encoding, mimetype);
    body.file.tempFileName = "./node_data/uploadFile";
    const ws = fs.createWriteStream(body.file.tempFileName);
    //    stream.resume();
    stream.pipe(ws);
  }
  /*
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 1000000, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 100, // For multipart forms, the max file size
      files: 1, // Max number of file fields
      headerPairs: 2000 // Max number of header key=>value pairs
    }
  */
});
server.register(playlistRoute);
server.register(tvGuideRoute);
server.register(tvGuideRoute);

const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

/*
process.on("uncaughtException", error => {
  console.error(error);
});
process.on("unhandledRejection", error => {
  console.error(error);
});

*/
start();
