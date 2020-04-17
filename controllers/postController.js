const db = require('../models');

const index = (req, res) => {
    db.Post.find({}, (err, allPosts) => {
        if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    
        res.json(allPosts);
      });
    };
    

const show = (req, res) => {
    db.Post.findById(req.params.id)
        .populate('user', 'firstName _id')
        .exec((err, foundPost) => {
            if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

            res.json(foundPost);
        });
};

const create = (req, res) => {
    // req.body.user = ('user _id')
    db.Post.create(req.body, (err, newPost) => {
        if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    
        db.Meditation.findById(req.params.meditationId, (err, foundMeditation) => {
            if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
            
            foundMeditation.posts.push(newPost);

            foundMeditation.save((err, savedMeditation) => {
                if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
            
            res.json(newPost);
        });
    });
});
};

const update = (req, res) => {
    db.Post.findByIdAndUpdate(req.params.postId, req.body, { new: true }, (err, updatedPost) => {
        if (err) return res.status(400).json({ status: 400, error: 'Something went wrong, please try again.' });

        res.json(updatedPost);
    })
};

const destroy = (req, res) => {
    db.Meditation.findById(req.params.meditationId, (err, foundMeditation) => {
        if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
        
        const postToDelete = foundMeditation.posts.id(req.params.postId);
    
        if (!postToDelete) {
            return res.status(400).json({status: 400, error: 'Could not find post'});
        }
        
        postToDelete.remove();
        
        foundMeditation.save((err, savedMeditation) => {
            if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    
            db.Post.findByIdAndDelete(req.params.postId, (err, deletedPost) => {
                if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
                res.json(deletedPost);
            });
        });
    })
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}