const Fontmin = require('fontmin');

const fontmin = new Fontmin()
  .src('cognizantFoundry/css/fonts/SVGsForFonts/*.svg')
  .use(Fontmin.svgs2ttf('icons-font.ttf', {fontName: 'iconfont'}))
  .use(Fontmin.css({glyph:true}))
  .use(Fontmin.ttf2woff())
  .use(Fontmin.ttf2eot())
  .use(Fontmin.ttf2svg())
  .dest('cognizantFoundry/css');

fontmin.run(function(err, files){
  if (err) {
    throw err;
  }
});
