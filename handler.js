"use strict";
const databaseManager = require("databaseManager");
const { v1: uuidv1 } = require("uuid");

function createResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

module.exports.saveItem = (event, context, callback) => {
  const item = JSON.parse(event.body);
  console.log(item);
  item.itemId = uuidv1();
  item.name = "ejemplo";
  item.address = "direccion ejemplo";
  item.phone = 800200171;

  databaseManager.saveItem(item).then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.getItem = (event, context, callback) => {
  const itemId = event.pathParameters.itemId;

  databaseManager.getItem(itemId).then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.getAllItem = (event, context, callback) => {
  databaseManager.getAllItem().then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.updateItem = (event, context, callback) => {
  const itemId = event.pathParameters.itemId;

  const body = JSON.parse(event.body);
  const paramName = body.paramName;
  const paramValues = body.paramValues;

  databaseManager.updateItem(itemId, paramName, paramValues).then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.deleteItem = (event, context, callback) => {
  const itemId = event.pathParameters.itemId;

  databaseManager.deleteItem(itemId).then(response => {
    console.log(response);
    callback(null, createResponse(200, "Item was delete"));
  });
};
