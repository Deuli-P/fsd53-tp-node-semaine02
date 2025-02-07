export function getHome(req, res) {
  
  res.render("home", );
}

// Function pour se déconnecter
export function getLogout(req, res) {
  console.log('Logout start')
  req.session.destroy();
  console.log('session apres destroy', req.session)
  res.redirect("/");
}


