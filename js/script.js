/* ===== Helper ===== */
const $=(s,e=document)=>e.querySelector(s);
const rp=n=>"Rp "+Number(n).toLocaleString("id-ID");
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const simpan=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const ambil=(k,d)=>JSON.parse(localStorage.getItem(k))||d;
const getUsers=()=>[...dataPengguna,...ambil("users",[])];
const getStok=()=>ambil("stok",structuredClone(dataKatalogBuku));
const getOrders=()=>ambil("orders",[]);

/* ===== Modal / pop-up ===== */
function modal(judul,isi,aksi){
  const o=document.createElement("div");o.className="overlay";
  o.innerHTML=`<div class="modal" role="dialog" aria-modal="true"><h3>${judul}</h3><div class="mb"></div><button class="btn tutup">Tutup</button></div>`;
  $(".mb",o).innerHTML=isi;
  $(".tutup",o).onclick=()=>o.remove();
  o.onclick=e=>{if(e.target===o)o.remove()};
  document.body.append(o);if(aksi)aksi(o);return o;
}
const info=(pesan,judul="Informasi")=>modal(judul,`<div>${pesan}</div>`);
const daftarError=a=>"<ul>"+a.map(x=>`<li>${x}</li>`).join("")+"</ul>";

/* ===== Login ===== */
function initLogin(){
  $("#formLogin").onsubmit=e=>{
    e.preventDefault();
    const em=$("#email").value.trim().toLowerCase(),pw=$("#password").value;
    if(!em||!pw)return info("Email dan password wajib diisi.","Peringatan");
    const u=getUsers().find(x=>x.email===em&&x.password===pw);
    if(!u)return alert("Email/password yang anda masukkan salah");
    sessionStorage.setItem("user",u.nama);location.href="dashboard.html";
  };
  $("#btnLupa").onclick=()=>modal("Lupa Password",
    `<form id="fLupa" novalidate><label>Email terdaftar<input id="lupaEmail" type="email"></label><button class="btn utama">Kirim tautan reset</button></form>`,
    o=>{$("#fLupa",o).onsubmit=ev=>{ev.preventDefault();
      const em=$("#lupaEmail",o).value.trim().toLowerCase();
      if(!/^\S+@\S+\.\S+$/.test(em))return alert("Format email tidak valid.");
      const ada=getUsers().some(x=>x.email===em);o.remove();
      info(ada?"Tautan reset password dikirim ke email Anda (simulasi).":"Email belum terdaftar. Gunakan tombol Daftar.",ada?"Berhasil":"Gagal");}});
  $("#btnDaftar").onclick=()=>modal("Daftar Akun",
    `<form id="fDaftar" novalidate><label>Nama<input id="dNama"></label><label>Email<input id="dEmail" type="email"></label><label>Password<input id="dPw" type="password"></label><label>Ulangi password<input id="dPw2" type="password"></label><button class="btn utama">Buat akun</button></form>`,
    o=>{$("#fDaftar",o).onsubmit=ev=>{ev.preventDefault();
      const n=$("#dNama",o).value.trim(),em=$("#dEmail",o).value.trim().toLowerCase(),pw=$("#dPw",o).value,er=[];
      if(n.length<3)er.push("Nama minimal 3 karakter.");
      if(!/^\S+@\S+\.\S+$/.test(em))er.push("Format email tidak valid.");
      else if(getUsers().some(x=>x.email===em))er.push("Email sudah terdaftar.");
      if(pw.length<6)er.push("Password minimal 6 karakter.");
      if(pw!==$("#dPw2",o).value)er.push("Ulangi password tidak sama.");
      if(er.length)return alert(er.join("\n"));
      simpan("users",[...ambil("users",[]),{nama:n,email:em,password:pw}]);o.remove();
      info("Akun dibuat. Silakan login.","Berhasil");}});
}

/* ===== Dashboard ===== */
function initDashboard(){
  const j=new Date().getHours(),s=j<11?"pagi":j<15?"siang":j<18?"sore":"malam";
  $("#greeting").textContent=`Selamat ${s}, ${sessionStorage.getItem("user")}!`;
  $("#btnLaporan").onclick=()=>{
    const o=getOrders(),tot=o.reduce((t,x)=>t+x.total,0);
    info(`<p>Total pesanan: <b>${o.length}</b></p><p>Total nilai pesanan: <b>${rp(tot)}</b></p>`,"Laporan Pemesanan");};
  $("#btnHistory").onclick=()=>{
    const o=getOrders();
    info(o.length?`<table><tr><th>No. DO</th><th>Tanggal</th><th>Total</th></tr>${o.map(x=>`<tr><td>${x.noDO}</td><td>${x.tanggal}</td><td>${rp(x.total)}</td></tr>`).join("")}</table>`
      :"Belum ada transaksi. Buat pesanan di halaman Pemesanan.","History Transaksi");};
}

/* ===== Stok / Katalog ===== */
function initStok(){
  const tb=$("#tbStok tbody");
  const baris=b=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td><img class="cover" src="${b.cover||""}" alt="Cover ${esc(b.nama)}" onerror="this.replaceWith('📘')"></td><td>${esc(b.kode)}</td><td>${esc(b.nama)}</td><td>${esc(b.jenis)}</td><td>${b.edisi}</td><td class="${b.stok<20?"rendah":""}">${b.stok}</td><td>${rp(b.harga)}</td><td><button class="btn kecil">Hapus</button></td>`;
    $("button",tr).onclick=()=>{if(confirm(`Hapus ${b.nama}?`)){simpan("stok",getStok().filter(x=>x.kode!==b.kode));tr.remove();}};
    tb.append(tr);
  };
  getStok().forEach(baris);
  $("#formStok").onsubmit=e=>{
    e.preventDefault();const f=e.target,er=[];
    const b={kode:f.kode.value.trim().toUpperCase(),nama:f.nama.value.trim(),jenis:f.jenis.value,edisi:+f.edisi.value,stok:+f.stok.value,harga:+f.harga.value,cover:""};
    if(!b.kode)er.push("Kode wajib diisi.");else if(getStok().some(x=>x.kode===b.kode))er.push("Kode sudah dipakai.");
    if(b.nama.length<3)er.push("Judul minimal 3 karakter.");
    if(!(b.edisi>=1))er.push("Edisi minimal 1.");
    if(!(b.stok>=0)||f.stok.value==="")er.push("Stok tidak boleh kosong atau negatif.");
    if(!(b.harga>0))er.push("Harga harus lebih dari 0.");
    if(er.length)return info(daftarError(er),"Data belum valid");
    simpan("stok",[...getStok(),b]);baris(b);f.reset();info("Buku baru masuk ke daftar stok.","Berhasil");
  };
}

/* ===== Checkout ===== */
function initCheckout(){
  let stok=getStok(),cart=ambil("cart",[]).filter(c=>stok.some(b=>b.kode===c.kode));
  const isi=()=>{$("#pilihBuku").innerHTML=stok.map(b=>`<option value="${b.kode}">${esc(b.nama)} - ${rp(b.harga)} (stok ${b.stok})</option>`).join("");};
  isi();
  $("#ekspedisi").innerHTML=dataEkspedisi.map(x=>`<option value="${x.kode}">${x.nama} - ${rp(x.biaya)}</option>`).join("");
  const hitung=()=>{
    const sub=cart.reduce((t,c)=>t+c.qty*stok.find(b=>b.kode===c.kode).harga,0);
    const ongkir=cart.length?dataEkspedisi.find(x=>x.kode===$("#ekspedisi").value).biaya:0;
    return{sub,ongkir,total:sub+ongkir};
  };
  const render=()=>{
    simpan("cart",cart);const tb=$("#tbCart tbody");tb.innerHTML="";
    cart.forEach((c,i)=>{
      const b=stok.find(x=>x.kode===c.kode),tr=document.createElement("tr");
      tr.innerHTML=`<td>${esc(b.nama)}</td><td>${rp(b.harga)}</td><td><input class="qty" type="number" min="1" max="${b.stok}" value="${c.qty}" aria-label="Jumlah"></td><td>${rp(b.harga*c.qty)}</td><td><button class="btn kecil">Hapus</button></td>`;
      $(".qty",tr).onchange=e=>{const q=+e.target.value;
        if(!(q>=1)||q>b.stok){e.target.value=c.qty;return info(`Jumlah harus 1 sampai ${b.stok}.`,"Peringatan");}
        c.qty=q;render();};
      $("button",tr).onclick=()=>{cart.splice(i,1);render();};
      tb.append(tr);
    });
    if(!cart.length)tb.innerHTML='<tr><td colspan="5">Keranjang kosong. Pilih buku di atas.</td></tr>';
    const h=hitung();$("#sub").textContent=rp(h.sub);$("#ongkir").textContent=rp(h.ongkir);$("#total").textContent=rp(h.total);
  };
  $("#btnTambah").onclick=()=>{
    const kode=$("#pilihBuku").value,q=+$("#jumlah").value,b=stok.find(x=>x.kode===kode),ada=cart.find(c=>c.kode===kode);
    const tot=(ada?ada.qty:0)+q;
    if(!b||!(q>=1)||tot>b.stok)return info(`Jumlah tidak valid atau melebihi stok (${b?b.stok:0}).`,"Peringatan");
    ada?ada.qty=tot:cart.push({kode,qty:q});render();
  };
  $("#ekspedisi").onchange=render;
  $("#formPesan").onsubmit=e=>{
    e.preventDefault();const f=e.target,er=[];
    const nama=f.nama.value.trim(),hp=f.hp.value.trim(),alamat=f.alamat.value.trim();
    if(!cart.length)er.push("Keranjang masih kosong.");
    if(nama.length<3)er.push("Nama pemesan minimal 3 karakter.");
    if(!/^\S+@\S+\.\S+$/.test(f.email.value.trim()))er.push("Format email tidak valid.");
    if(!/^08\d{8,11}$/.test(hp))er.push("No. HP diawali 08 dan 10-13 digit.");
    if(alamat.length<10)er.push("Alamat minimal 10 karakter.");
    if(!f.bayar.value)er.push("Pilih metode pembayaran.");
    if(er.length)return info(daftarError(er),"Data belum valid");
    const h=hitung(),eks=dataEkspedisi.find(x=>x.kode===f.ekspedisi.value);
    const noDO="DO"+new Date().getFullYear()+Math.floor(1000+Math.random()*9000);
    const items=cart.map(c=>{const b=stok.find(x=>x.kode===c.kode);return{nama:b.nama,qty:c.qty,harga:b.harga};});
    stok.forEach(b=>{const c=cart.find(x=>x.kode===b.kode);if(c)b.stok-=c.qty;});simpan("stok",stok);
    simpan("orders",[...getOrders(),{noDO,tanggal:new Date().toISOString().slice(0,10),nama,items,ekspedisi:eks.nama,bayar:f.bayar.value,total:h.total}]);
    cart=[];render();isi();f.reset();
    modal("Pesanan Berhasil",`<p>Nomor Delivery Order Anda:</p><p class="total">${noDO}</p><a class="btn utama" href="tracking.html">Lacak pengiriman</a>`);
  };
  render();
}

/* ===== Tracking ===== */
function initTracking(){
  $("#formCari").onsubmit=e=>{
    e.preventDefault();
    const no=$("#noDO").value.trim().toUpperCase(),hasil=$("#hasil");
    if(!no)return info("Nomor Delivery Order wajib diisi.","Peringatan");
    let d=dataTracking.find(x=>x.noDO===no);
    if(!d){const o=getOrders().find(x=>x.noDO===no);
      if(o)d={noDO:o.noDO,nama:o.nama,status:1,ekspedisi:o.ekspedisi,tanggalKirim:o.tanggal,paket:o.items.length+" judul buku",total:o.total,riwayat:[o.tanggal+" - Pesanan dikemas"]};}
    if(!d){hasil.innerHTML="";return info(`Nomor DO <b>${esc(no)}</b> tidak ditemukan. Periksa kembali nomornya.`,"Tidak ditemukan");}
    hasil.innerHTML=`<section class="kartu"><h2>${esc(d.nama)}</h2><p>Status: <b>${tahapPengiriman[d.status-1]}</b></p>
      <div class="progress" role="progressbar" aria-valuenow="${d.status*20}" aria-valuemin="0" aria-valuemax="100"><div style="width:${d.status*20}%"></div></div>
      <ol class="tahap">${tahapPengiriman.map((t,i)=>`<li class="${i<d.status?"aktif":""}">${t}</li>`).join("")}</ol>
      <table><tr><th>Ekspedisi</th><td>${esc(d.ekspedisi)}</td></tr><tr><th>Tanggal kirim</th><td>${d.tanggalKirim}</td></tr><tr><th>Jenis paket</th><td>${esc(d.paket)}</td></tr><tr><th>Total pembayaran</th><td>${rp(d.total)}</td></tr></table>
      <h3>Riwayat perjalanan</h3><ul>${d.riwayat.map(r=>`<li>${esc(r)}</li>`).join("")}</ul></section>`;
  };
}

/* ===== Router halaman ===== */
document.addEventListener("DOMContentLoaded",()=>{
  const p=document.body.dataset.page;
  if(p!=="login"&&!sessionStorage.getItem("user"))return location.replace("index.html");
  const lo=$("#logout");if(lo)lo.onclick=()=>{sessionStorage.removeItem("user");location.href="index.html";};
  ({login:initLogin,dashboard:initDashboard,stok:initStok,checkout:initCheckout,tracking:initTracking})[p]();
});
