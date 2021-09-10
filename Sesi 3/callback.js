//data orang
let orang = [
  { name: "Yusuf" },
  { name: "Wahyu" },
  { name: "Hafid" },
  { name: "Raka" },
  { name: "Rizky" },
  { name: "Yolan" },
];

//Easy - Map
orang.map((el, i) => (el.noAbsen = i + 1));
console.log(orang);

//Normal - Filter
//buat array absen ganjil dan array absen genap
const absenGanjil = [];
const absenGenap = [];

orang.filter((el) => {
  if (el.noAbsen % 2 == 1) {
    absenGanjil.push(el);
  } else {
    absenGenap.push(el);
  }
});

console.log(absenGanjil, absenGenap);

//Hard - sort
//Array hasil nomor 1 di sort descending berdasarkan noAbsen
const orangSorted = [...orang];
orangSorted.sort((a, b) => {
  return b.noAbsen - a.noAbsen;
});
console.log(orangSorted);

//Hard - Reduced
// dari hasil no 1, buat sebuah string => 'Yusuf, Wahyu, Hafid, Raka, Rizky, Yolan'
const strHasil = orang.reduce((result, curr, i) => {
  return result + curr.name + (i < orang.length - 1 ? ", " : "");
}, "");

console.log(strHasil);
