// [GET] /

module.exports.index = (req, res) => {           // index là trang chính của controller home
  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ"                      // data động
  })
}