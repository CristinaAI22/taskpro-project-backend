require('dotenv').config();
const domain = 'sandbox76f0c2c52eec440ab2e33b26b4ca832a.mailgun.org';
const API_KEY = process.env.API_KEY;
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: domain });

const destinationEmail = 'taskpro.project@gmail.com';

const needHelp = async (req, res) => {
  const { email, text } = req.body;
  if (!email || !text) {
    throw new BadRequestError('Please provide email and text');
  }

  const data = {
    from: email,
    to: destinationEmail,
    subject: 'Need Help',
    text: text,
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if (error) {
      console.log(error);
    }
  });

  res.status(StatusCodes.NO_CONTENT).send();
};

module.exports = needHelp;
