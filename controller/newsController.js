const News = require("../model/newsModel");

exports.findAllNews = async (req, res, next) => {
  try {
    const allNewsData = await News.find();
    console.log("find all news");
    const allNews = {
        news:allNewsData, 
        success:true, 
        message:"data fetched"
    }
    res.json(allNews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findOneNews = async (Req, res, next) => {
  var id = req.params.id;
  console.log(id);
  const news = await News.findById(id);
  console.log(news);

  return res.status(200).json({
    news,
  });
};

exports.createNews = async (req, res, next) => {
  console.log("creating new news");
  const news = new News({
    date: new Date(),
    topic: req.body.topic,
    image: req.body.image,
  });

  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updatedNews = async (req, res, next) => {
  console.log("Update news called ");
  var id = req.params.id;
  const newsUpdate = {
    date: new Date(),
    topic: req.body.topic,
    image: req.body.image,
  };

  const newsUpdated = await News.findByIdAndUpdate(id, newsUpdate);
  console.log(newsUpdated);

  return res.status(200).json({
    newsUpdate,
  });
};

exports.deleteNews = async (req, res, next) => {
  console.log("delete news called ");
  var id = req.params.id;
  const news = await News.findByIdAndDelete(id);
  console.log(id);

  return res.status(200).json({
    message: "service deleted sucessfully",
    success: true,
  });
};
