export default (model, populate) => async (req, res, next) => {
  let query;
  let queryStr = { ...req.query };
  const removeQuery = ["select", "limit", "sort", "page"];
  removeQuery.forEach((param) => delete queryStr[param]);
  queryStr = JSON.stringify(queryStr);
  queryStr = queryStr.replace(
    /\b(gt|gte|lte|lt|in)\b/g,
    (match) => `$${match}`
  );
  query = model.find(JSON.parse(queryStr));
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  if (req.query.sort) {
    const sort = req.query.sort.split(",").join(" ");
    query = query.sort(sort);
  } else {
    query.sort("-createdAt");
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  query = query.skip(startIndex).limit(limit);

  const pagination = {};
  if (endIndex < total) {
    pagination["next"] = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination["prev"] = {
      page: page - 1,
      limit,
    };
  }
  if (populate) {
    query = query.populate(populate);
  }
  const result = await query;

  res.advanceResult = {
    success: true,
    count: result.length,
    pagination,
    data: result,
  };
  next();
};
