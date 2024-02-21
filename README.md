# link-shortner
node express plus mongoDB based link shortner website.
There are two version
main branch - version one
v2.0 branch - version two

#backend
express - for http
mongodb - for database
ejs - for server side rendering
shortid - for generating url short id
uuid - for generating session unique ids
cookie-parser - for parsing the cookies

#in version two
jsonwebtoken - for stateless authentication


#noticable methods
res.redirect('https://original link') - for redirecting to link
res.render("ejs page name") - for rendering EJS pages

#noticable class/methods
Map() - for mapping session id with user tying to login
path.resolve() - for resolving ejs pages path