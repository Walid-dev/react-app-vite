import { Configuration, OpenAIApi } from "openai";
import { v4 as uuidV4 } from "uuid";
import { readFile } from "fs/promises";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const port = 3000;

// JSON data

const planets = JSON.parse(await readFile(new URL("./planets.json", import.meta.url)));
const persons = JSON.parse(await readFile(new URL("./persons.json", import.meta.url)));
const sandwiches = JSON.parse(await readFile(new URL("./sandwiches.json", import.meta.url)));
const items = JSON.parse(await readFile(new URL("./items.json", import.meta.url)));

//

const configuration = new Configuration({
  // organization: "org-xf0ej1hFnrahS3bZUE2kyGv5",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

/////////////////////////////////////////////////////////////////////////

app.post("/", async (req, res) => {
  const { message } = req.body; // destructure message from req.body
  console.log(message);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Roleplay: you are Ice Cube: ${message}`,
    max_tokens: 30,
    temperature: 0,
  });

  console.log(response.data.choices[0].text);

  if (response.data.choices) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

////////////////////////////////////////////////////////////////////////

app.post("/array", async (req, res) => {
  const data = persons;
  res.json({
    data: data,
    status: "success",
    message: "Data persons retrieved successfully",
  });
});

/////////////////////////////////////////////////////////////////////////

app.get("/planets", async (req, res) => {
  const data = planets;

  res.json({
    data: data,
    status: "success",
    message: "Data planets retrieved successfully",
  });
});

//////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log("Example app listening");
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/sandwiches", async (req, res) => {
  const data = sandwiches;

  res.json({
    data: data,
    status: "success",
    message: "Data sandwiches received",
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/items", async (req, res) => {
  const data = items;

  res.json({
    data: data,
    status: "success",
    message: "Data items received",
  });
});
