export const redirectUrl = (req, res, next) => {
  if (req.path.startsWith('/public')) {
    return next();
  }

  if (!req.path.startsWith('/cashflow/api')) {
    return res.redirect('/cashflow/api');
  }
  
  next();
};