const validSearch = (req, res, next) => {
    const { skill, level } = req.query;

    if (!skill) {
        return res.status(400).send("Skill is required to search!");
    }

    if (!level) {
        return res.status(400).send("Level is required to search!");
    }

    next();
};

const globalLogger = (req, res, next) => {
    const { method, url } = req;
    const time = new Date().toLocaleTimeString();

    console.log(`[${method}] ${url} - ${time}`);

    next();
};

module.exports = {
    validSearch,
    globalLogger
};