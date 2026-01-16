const kafka = require("../config/kafka");

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected (Captain Service)");
};

module.exports = {
  producer,
  connectProducer,
};
