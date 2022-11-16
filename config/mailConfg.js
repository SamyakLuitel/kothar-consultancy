const nodemailer = require("nodemailer");

main = async () => {
  //

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kotharedu@gmail.com",
      pass: "lzrixrzucneghxdr",
    },
  });


  const mailOptions = {
    from: 'kotharedu@gmail.com', 
    to:'samkotaku@gmail.com',
    subject:'Contacted by Tester',
    html:  '<p> Test mail</p>'
  }

  transporter.sendMail(mailOptions, function(err, info){
    if(err){
        console.log(err)
    }else{
        console.log(info)
    }
  });
}


main()