const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kotharedu@gmail.com",
      pass: "lzrixrzucneghxdr",
    },
  });

  const mailOptions = {
    from: "kotharedu@gmail.com",
    to: "samkotaku@gmail.com",
    subject: `Contacted by ${req.body.name}`,
    html: `<p> Appointment Booking </p>
    "<div> booked by " ${req.body.name} , contact no : ${req.body.contactNo}  , email: ${req.body.email}  , enquiry: ${req.body.enquiry}`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  return res.json({
    message: "Your meaasge has been submitted to KOTHAR Education",
    success: true,
  });
};
