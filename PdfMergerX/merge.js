const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();

let mergePdfs = async (p1,p2) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2);
  await merger.save('public/merged.pdf'); 
};

module.exports =  {mergePdfs}