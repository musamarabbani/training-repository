import TutorialController from './tutorials.controllers';
import express from 'express';

var router = express.Router();

router.get('/', TutorialController.findAll);
router.post('/', TutorialController.create);
router.put('/:id', TutorialController.updateById);
router.delete('/:id', TutorialController.deleteById);

export default router;
