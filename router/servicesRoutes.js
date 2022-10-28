const express = requires('express')
var router = express.Router();

// get services api 
router.get('/services', (req, res) => {
    res.send("")
})


router.post('/admin/service', (REq, res) => {
    res.send("");
})


module.exports = router; 