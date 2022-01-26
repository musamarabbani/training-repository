const models = require('../models');
const path = require('path');
const ytdl = require('ytdl-core');
const { createVideoQueue } = require('../queue/video');

const createJob = async (req, res) => {
  const { url } = req.body;
  try {
    const isValidUrl = ytdl.validateURL(url);
    if (!isValidUrl) {
      res.status(400);
      return res.send({ error: 'invalid URL' });
    }
    const job = await models.Job.create({
      url,
      status: 'started',
    });
    await createVideoQueue().add({ url, id: job.id });
    return res.status(200).json({ data: job });
  } catch (err) {
    console.log('err ==>', err);
    return res.status(400).json({ error: err });
  }
};

const getFiles = async (req, res) => {
  const { fileName } = req.params;
  const file = path.resolve(__dirname, `../files/${fileName}`);
  res.download(file);
};

const JobRoutes = {
  createJob,
  getFiles,
};

module.exports = JobRoutes;
