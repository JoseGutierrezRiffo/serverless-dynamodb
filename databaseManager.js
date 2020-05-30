"use strict";

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE;

// Crear un registro
module.exports.saveItem = (item, name) => {
  const params = {
    TableName: USERS_TABLE,
    Item: item
  };
  return dynamo
    .put(params)
    .promise()
    .then(() => {
      return item.itemId;
    });
};

// Obtener registro por ID
module.exports.getItem = itemId => {
  const params = {
    Key: {
      itemId: itemId
    },
    TableName: USERS_TABLE
  };
  return dynamo
    .get(params)
    .promise()
    .then(result => {
      return result.Item;
    });
};

// Obtener Todos los registros
module.exports.getAllItem = () => {
  const params = {
    TableName: USERS_TABLE
  };
  return dynamo
    .scan(params)
    .promise()
    .then(result => {
      return result;
    });
};

// Modificar un registro por ID
module.exports.updateItem = (itemId, paramsName, paramsValue) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      itemId: itemId
    },
    conditionExpresion: "attribute_exists(itemId)",
    UpdateExpresion: "set" + paramsName + " = :v",
    ExpresionAttributeValues: {
      ":v": paramsValue
    },
    ReturnValues: "ALL_NEW"
  };
  return dynamo
    .update(params)
    .promise()
    .then(response => {
      return response.Attributes;
    });
};

// ELiminar registro por ID
module.exports.deleteItem = itemId => {
  const params = {
    Key: {
      itemId: itemId
    },
    TableName: USERS_TABLE
  };
  return dynamo
    .put(params)
    .promise()
    .then();
};
