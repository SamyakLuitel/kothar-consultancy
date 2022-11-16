function getContactUsMailOption(fromMail,toMail, contactedBy){
 return {
    from: fromMail, 
    to: toMail, 
    subject: `Contact requested by ${contactedBy.name}`, 
    html:'<p>contact requested by </p>'
 }
}