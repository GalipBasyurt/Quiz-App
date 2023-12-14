class Soru {
  constructor(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
  }

  cevabiKontrolEt(cevap) {
    return cevap === this.dogruCevap;
  }
}

let sorular = [
  new Soru(
    "1- Hangisi javascript paket yönetim uygulamasıdır?",
    { a: "node.js", b: "typescript", c: "npm" },
    "c"
  ),
  new Soru(
    "2- Hangisi .net paket yönetim uygulamasıdır?",
    { a: "node.js", b: "nuget", c: "vue.js" },
    "b"
  ),

  new Soru(
    "3- Hangisi javascript programlama dilini kullanmaz?",
    { a: "angular", b: "react", c: "asp.net" },
    "c"
  ),

  new Soru(
    "4- Hangisi backend kapsamında değerlendirilir?",
    { a: "node.js", b: "react", c: "typescript" },
    "a"
  ),

  new Soru(
    "5- Hangisi frontend kapsamında değerlendirilmez?",
    { a: "javascript", b: "sql", c: "html" },
    "b"
  ),
];
