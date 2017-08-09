var Xray = require('x-ray');
var x = Xray();

x('https://en.wikipedia.org/wiki/Category:2016_video_games', '.mw-category li', [{
  title: 'a@html',
  link: 'a@href',
  next_page: x('a@href', {
    title: 'title',
    heading: 'h1',
    image: '.infobox img@src',
    info: ['.infobox tr'],
  })
}])
  // .paginate('.nav-previous a@href')
  .limit(3)
  .write('results.json')
