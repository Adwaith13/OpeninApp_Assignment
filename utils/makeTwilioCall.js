const twilio = require("twilio");
const Task = require("../models/Task");
const User = require("../models/User");

const makeTwilioVoiceCall = async () => {
  try {
    const tasksToCall = await Task.findAll({
      where: {
        due_date: {
          [Op.lte]: new Date(),
        },
      },
      include: [
        {
          model: User,
          attributes: ["priority", "phone_number"],
        },
      ],
      order: [
        ["User", "priority", "ASC"], 
      ],
    });

    for (const task of tasksToCall) {
      const userPriority = task.User.priority;
      const recipientPhoneNumber = task.User.phone_number;

      const callSid = await makeCall(userPriority, recipientPhoneNumber);

      if (callSid) {
        console.log(`Voice call to ${recipientPhoneNumber} successful.`);
        break;
      }
    }
  } catch (error) {
    console.error("Error making Twilio voice call:", error);
  }
};

const makeCall = async (userPriority, recipientPhoneNumber) => {
  try {
    const accountSid = process.env.accountSid;
    const authToken = process.env.authToken;
    const client = new twilio(accountSid, authToken);

    // Customize the Twilio voice call parameters
    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: recipientPhoneNumber,
      from: "+18635887302", 
    });

    return call.sid;
  } catch (error) {
    console.error("Error making Twilio voice call:", error);
    return null;
  }
};

module.exports = { makeTwilioVoiceCall };
