var gulp = require('gulp');
var pandoc = require('gulp-pandoc');
var pdf = require('gulp-html-pdf');
//resume input (md)
var raw_resume = 'resume.md';

//generate resume in html
gulp.task('html', function() {
  gulp.src(raw_resume)
    .pipe(pandoc({ //convert to html
      from: 'markdown',
      to: 'html',
      ext: '.html',
      args: [
	      '--standalone', '-H', 'templates/style_chmduquesne.css'	      
      ]
    }))
    .pipe(gulp.dest('./'))
	.pipe(pdf())  //convert to pdf (fallback when ConText is not available)
	.pipe(gulp.dest('./'));
});

//generate resume in word doc (.docx)
gulp.task('docx', function() {
  gulp.src(raw_resume)
    .pipe(pandoc({
      from: 'markdown',
      to: 'docx',
      ext: '.docx',
      args: [
      	'-o','resume.docx',
	      '--standalone', '-H', 'templates/style_chmduquesne.css'	
      ]
    }));
});

//generate resume in tex (to be converted to pdf using ConText command)
gulp.task('tex', function() {	
  gulp.src(raw_resume)
    .pipe(pandoc({
      from: 'markdown',
      to: 'context',
      ext: '.tex',
      args: [
	      '--standalone',
	      '--template','templates/style_chmduquesne.tex',
	      '-V','papersize=A4'
      ]
    }))
    .pipe(gulp.dest('./'));
});

// The default task (called when you run `gulp` from cli)
// docx not included by choice
// just include tex if you have ConText installed
gulp.task('default', [
	'html'
]);