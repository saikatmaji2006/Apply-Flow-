const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => next(error)); // Changed 'Error' to 'error'
    };
};

export { asyncHandler };