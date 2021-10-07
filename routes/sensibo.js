const express = require("express");
const router = express.Router();
const axios = require("axios");
const baseUrl = "https://home.sensibo.com/api/v2";

async function processResponse(acId, response1, response2) {
  let result = {
    id: acId,
    status: response1.status,
    on: response1.acState.on,
    mode: response1.acState.mode,
    targetTemperature: response1.acState.targetTemperature,
    temperatureUnit: response1.acState.temperatureUnit,
    fanLevel: response1.acState.fanLevel,
    swing: response1.acState.swing,
    light: response1.acState.light,
    changedProperties: response1.changedProperties,
    reason: response1.reason,
    failureReason: response1.failureReason,
    currentTemperature: response2.temperature.pop().value,
    currentHumidity: response2.humidity.pop().value,
  };
  return result;
}

router.get("/me/pods/:apiKey", async (req, res) => {
  const { apiKey } = req.params;
  try {
    const response = await axios.get(
      baseUrl + "/users/me/pods?apiKey=" + apiKey
    );
    const result = response.data.result;
    return res.status(200).send({ success: true, sensibo: result });
  } catch (error) {
    return res.status(400).send({ sensibo: error.response.data });
  }
});

router.get("/ac/:acId/:apiKey", async (req, res) => {
  const { acId, apiKey } = req.params;
  try {
    const response1 = await axios.get(
      baseUrl + "/pods/" + acId + "/acStates?limit=1&apiKey=" + apiKey
    );
    const response2 = await axios.get(
      baseUrl + "/pods/" + acId + "/historicalMeasurements?apiKey=" + apiKey
    );
    const result = await processResponse(
      acId,
      response1.data.result[0],
      response2.data.result
    );
    return res.status(200).send({ success: true, sensibo: result });
  } catch (error) {
    return res.status(400).send({ sensibo: error.response.data });
  }
});

router.patch("/ac/:acId/:property/:apiKey", async (req, res) => {
  const { acId, property, apiKey } = req.params;
  const { newValue } = req.body;
  try {
    const response1 = await axios.patch(
      baseUrl + "/pods/" + acId + "/acStates/" + property + "?apiKey=" + apiKey,
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        newValue: newValue,
      }
    );
    const response2 = await axios.get(
      baseUrl + "/pods/" + acId + "/historicalMeasurements?apiKey=" + apiKey
    );
    const result = await processResponse(
      acId,
      response1.data.result,
      response2.data.result
    );
    return res.status(200).send({ success: true, sensibo: result });
  } catch (error) {
    return res.status(400).send({ sensibo: error.response.data });
  }
});

module.exports = router;
