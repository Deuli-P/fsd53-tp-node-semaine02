export function getHome(req, res) {
  
  res.render("home", );
}

export function getLogout(req, res) {
  console.log('Logout start')
  req.session.destroy();
  console.log('session apres destroy', req.session)
  res.redirect("/");
}


