const cron = require("node-cron");
const { updatePriorities } = require("../utils/updatePriority");
const { makeTwilioVoiceCall } = require("../utils/makeTwilioCall");

cron.schedule("0 0 0 * * *", async () => {
  await updatePriorities();
  console.log("Task Priority updated");
});

cron.schedule("0 0 8 * * *", async () => {
  await makeTwilioVoiceCall();
  console.log("Successfully made Twilio Call");
});
