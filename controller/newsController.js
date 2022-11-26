const News = require("../model/newsModel");
const { uploader } = require("../utils/imageUploadUtils");

exports.findAllNews = async (req, res, next) => {
  try {
    const allNewsData = await News.find();
    console.log("find all news");
    const allNews = {
      news: allNewsData,
      success: true,
      message: "data fetched",
    };
    res.json(allNews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findOneNews = async (Req, res, next) => {
  try {
    var id = req.params.id;
    console.log(id);
    const news = await News.findById(id);
    console.log(news);

    return res.status(200).json({
      news,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.createNews = async (req, res, next) => {
  console.log("creating new news");

  try {
    const img = req.body.image;
    const uploadRes = uploader(img);

    const news = new News({
      date: new Date(),
      topic: req.body.topic,
      image: (await uploadRes).file,
    });

    const newNews = await news.save();
    const createResponse = {
      data: newNews,
      message: "News added Successfully",
      success: true,
    };
    res.status(201).json(createResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updatedNews = async (req, res, next) => {
  console.log("Update news called ");
  var img = req.body.image

  try {
    var id = req.params.id;
    var  newsUpdate = {
      date: new Date(),
      topic: req.body.topic,
    };


    
  if (!(typeof img === 'undefined')) {
    if (img != null) {
      const uploadRes = uploader(img);
      let updatedImage = (await uploadRes).file

      newsUpdate = {
        date: new Date(),
        topic: req.body.topic,
        image: updatedImage,
      }
    }
  }
    const newsUpdated = await News.findByIdAndUpdate(id, newsUpdate);
    console.log(newsUpdated);

    return res.status(200).json({
      message: "News updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }
};

exports.deleteNews = async (req, res, next) => {
  console.log("delete news called ");
  try {
    var id = req.params.id;
    const news = await News.findByIdAndDelete(id);
    console.log(id);

    return res.status(200).json({
      message: "News deleted successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
