const shortid = require("shortid");
const UrlDBRef = require("../models/urlModel");

const handleGetAllUrls = async (req, res) => {
  try {
    const allUrls = await UrlDBRef.find({});

    res.status(200).json({
      status: true,
      message: "check all the urls",
      data: allUrls
    })

  } catch (err) {
    console.error(err);
  }

}

const handleAddNewUrl = async (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body || !body.redirectUrl) {
    return res.status(400).json({
      status: false,
      message: "fill all the necessary field - url"
    })
  }

  const shortId = shortid();
  console.log(`new shortId: ${shortId} created`);

  try {
    await UrlDBRef.create({
      shortId: shortId,
      redirectUrl: body.redirectUrl,
      visitHistory: [],
      createdBy: req.user._id
    })
    /*
        //if json is supposed to sent back
        return res.status(200).json({
          status: true,
          message: `new url id created`,
          data: {
            shortId: shortId
          }
        });
    */

    return res.render('home', {
      shortId: shortId,
      redirectUrl: body.redirectUrl
    });



  } catch (err) {
    console.error(err);
    return res.status(101).json({
      status: true,
      message: `some server error took place`,
    });
  }

}

const handleGetUrlById = async (req, res) => {
  const shortId = req.params.shortId;

  const response = await UrlDBRef.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistory: { timeStamp: Date.now() }
      }
    })

  res.redirect(response.redirectUrl);

  /*
  const response = await UrlDBRef.findOne({ shortId: shortId })


  return res.status(200).json(
    {
      status: true,
      message: `read redirect url of id: ${shortId} successfully`,
      data: response
    })

    */
}



const handleUpdateUrlById = async (req, res) => {
  const shortId = req.params.shortId;
  return res.status(201).json({ status: true, message: `updated url of id: ${id}` })
}

const handleDeleteUrlById = async (req, res) => {
  const shortId = req.params.shortId;
  return res.status(201).json({ status: true, message: `deleted url of id: ${id}` })
}

module.exports = {
  handleGetAllUrls,
  handleAddNewUrl,
  handleGetUrlById,
  handleUpdateUrlById,
  handleDeleteUrlById
}