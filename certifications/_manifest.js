/* ReviewApp content manifest — the ONLY file to update when adding content */
window.ReviewApp.content.setManifest({
  certs: [
    { id: "linux-plus", name: "CompTIA Linux+", color: "#ffb454" },
    //{ id: "network-plus", name: "CompTIA Network+", color: "#5ad1e6" }
  ],
  files: [
    // ====================  Linux+  ====================
    // ----------------- Questions -----------------
    "linux-plus/questions/ch01-exploring-linux-questions.js",
    "linux-plus/questions/ch02-servers-services-security-questions.js",

    // ----------------- Flashcards -----------------
    "linux-plus/flashcards/ch01-exploring-linux-flashcards.js",
    "linux-plus/flashcards/ch02-servers-services-security-flashcards.js",

    // ----------------- Labs -----------------
    "linux-plus/labs/ch01-exploring-linux-labs.js",
    "linux-plus/labs/ch02-servers-services-security-labs.js",

    // ----------------- Notes -----------------
    "linux-plus/notes/ch01-notes.js",
    "linux-plus/notes/ch02-notes.js",


    

    // ++++++++++++++++ TEMPLATE +++++++++++++++++++++++
    // ====================  Class  ====================
    // ----------------- Questions -----------------
    // ----------------- Flashcards -----------------
    // ----------------- Labs -----------------
    // ----------------- Notes -----------------

  ]
});
