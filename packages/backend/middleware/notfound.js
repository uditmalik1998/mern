const notFound = (req, res) => {
    res.status(404).json({msg:"This Routes are not availabel"});
}

module.exports = notFound;