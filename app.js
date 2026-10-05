const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = value => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value || 0);
const shortDate = value => new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
const nowIso = () => new Date().toISOString();
const today = () => new Date().toISOString().slice(0, 10);
const uid = prefix => `${prefix}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

export const seedState = () => ({
  version: 1,
  students: [
    { id: "S-24001", nis: "24001", name: "Alya Putri Ramadhani", className: "5A", parent: "Dewi Ramadhani", parentPhone: "0812 7183 4421", avatar: "AP", va: "8808124001" },
    { id: "S-24002", nis: "24002", name: "Bima Ardiansyah", className: "5A", parent: "Andi Ardiansyah", parentPhone: "0813 9921 5304", avatar: "BA", va: "8808124002" },
    { id: "S-24003", nis: "24003", name: "Citra Maharani", className: "5A", parent: "Rina Maharani", parentPhone: "0857 3304 8821", avatar: "CM", va: "8808124003" },
    { id: "S-24004", nis: "24004", name: "Dafa Pratama", className: "5A", parent: "Hendra Pratama", parentPhone: "0819 6271 3305", avatar: "DP", va: "8808124004" },
    { id: "S-24005", nis: "24005", name: "Nadia Safitri", className: "5A", parent: "Lina Safitri", parentPhone: "0822 4590 1176", avatar: "NS", va: "8808124005" },
    { id: "S-24006", nis: "24006", name: "Rafi Akbar", className: "5A", parent: "Yusuf Akbar", parentPhone: "0812 8865 0401", avatar: "RA", va: "8808124006" }
  ],
  ledger: [
    { id: "TRX-001", studentId: "S-24001", type: "deposit", method: "cash", amount: 150000, date: "2026-09-01", reference: "BTH-0901", status: "posted", bookSynced: true, note: "Setoran awal semester" },
    { id: "TRX-002", studentId: "S-24001", type: "deposit", method: "transfer", amount: 100000, date: "2026-09-08", reference: "BNI-819204", status: "posted", bookSynced: true, note: "Transfer wali murid" },
    { id: "TRX-003", studentId: "S-24002", type: "deposit", method: "cash", amount: 200000, date: "2026-09-02", reference: "BTH-0902", status: "posted", bookSynced: true, note: "Setoran tunai" },
    { id: "TRX-004", studentId: "S-24003", type: "deposit", method: "transfer", amount: 275000, date: "2026-09-10", reference: "BNI-731008", status: "posted", bookSynced: false, note: "Transfer wali murid" },
    { id: "TRX-005", studentId: "S-24004", type: "deposit", method: "cash", amount: 125000, date: "2026-09-12", reference: "BTH-0912", status: "posted", bookSynced: false, note: "Setoran tunai" },
    { id: "TRX-006", studentId: "S-24005", type: "deposit", method: "transfer", amount: 350000, date: "2026-09-15", reference: "BNI-221570", status: "posted", bookSynced: true, note: "Transfer wali murid" },
    { id: "TRX-007", studentId: "S-24006", type: "deposit", method: "cash", amount: 180000, date: "2026-09-18", reference: "BTH-0918", status: "posted", bookSynced: true, note: "Setoran tunai" },
    { id: "TRX-008", studentId: "S-24001", type: "withdrawal", method: "cash", amount: -50000, date: "2026-09-22", reference: "WD-1001", status: "posted", bookSynced: false, note: "Pembelian buku latihan" }
  ],
  drafts: [
    { id: "DR-001", studentId: "S-24002", amount: 50000, date: "2026-10-05", note: "Setoran Senin" },
    { id: "DR-002", studentId: "S-24003", amount: 75000, date: "2026-10-05", note: "Setoran Senin" }
  ],
  batches: [
    { id: "BTH-1003", className: "5A", teacher: "Rina Wulandari", createdAt: "2026-10-03T08:25:00Z", status: "pending", entries: [
      { id: "BE-01", studentId: "S-24004", amount: 50000, date: "2026-10-03", note: "Setoran Jumat" },
      { id: "BE-02", studentId: "S-24005", amount: 100000, date: "2026-10-03", note: "Setoran Jumat" }
    ]}
  ],
  withdrawals: [
    { id: "WD-1002", studentId: "S-24002", amount: 75000, purpose: "Kebutuhan kegiatan pramuka", requestedAt: "2026-10-04T10:20:00Z", requestedBy: "Andi Ardiansyah", parentApproved: true, status: "waiting_admin" }
  ],
  audits: [
    { id: "AUD-1", at: "2026-10-05T07:42:00Z", actor: "Admin TU", action: "Mencocokkan transfer", detail: "TRX-004 · Citra Maharani · Rp275.000" },
    { id: "AUD-2", at: "2026-10-04T10:20:00Z", actor: "Andi Ardiansyah", action: "Mengajukan penarikan", detail: "WD-1002 · Bima Ardiansyah · Rp75.000" },
    { id: "AUD-3", at: "2026-10-03T08:25:00Z", actor: "Rina Wulandari", action: "Membuat batch setoran", detail: "BTH-1003 · 2 siswa · Rp150.000" }
  ]
});

export const balanceOf = (state, studentId) => state.ledger.filter(x => x.studentId === studentId && x.status === "posted").reduce((sum, x) => sum + x.amount, 0);
export const totalBalance = state => state.students.reduce((sum, x) => sum + balanceOf(state, x.id), 0);

let state;
let session = null;
let route = "dashboard";
let switchOpen = false;
const storageKey = "sakusekolah-mvp-v1";

function loadState() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || seedState(); } catch { return seedState(); }
}
function saveState() { localStorage.setItem(storageKey, JSON.stringify(state)); }
function student(id) { return state.students.find(x => x.id === id); }
function audit(actor, action, detail) { state.audits.unshift({ id: uid("AUD"), at: nowIso(), actor, action, detail }); }
function toast(message) { const el = $("#toast"); el.textContent = message; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 2600); }
function roleName(role) { return ({ teacher: "Wali Kelas", admin: "Admin Tata Usaha", parent: "Wali Murid" })[role]; }
function statusBadge(status) {
  const labels = { posted: "Tercatat", pending: "Menunggu verifikasi", draft: "Draf", approved: "Disetujui", waiting_admin: "Menunggu Admin TU", processing: "Diproses", completed: "Selesai", rejected: "Ditolak", synced: "Tersinkron" };
  const cls = status === "completed" ? "posted" : status === "waiting_admin" ? "pending" : status;
  return `<span class="badge badge-${cls}">${labels[status] || status}</span>`;
}
function methodLabel(method) { return method === "cash" ? "Tunai" : method === "transfer" ? "Transfer bank" : "Penarikan"; }
function dateTime(value) { return new Intl.DateTimeFormat("id-ID", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" }).format(new Date(value)); }

const nav = {
  teacher: [
    ["dashboard","⌂","Ringkasan"], ["cash","＋","Setoran tunai"], ["batches","▣","Batch setoran"], ["ledger","≡","Ledger & saldo"], ["books","✓","Buku tabungan"], ["reports","↗","Laporan"]
  ],
  admin: [
    ["dashboard","⌂","Ringkasan"], ["verify","✓","Verifikasi batch"], ["transfers","⇄","Transfer bank"], ["withdrawals","↙","Penarikan"], ["ledger","≡","Ledger & saldo"], ["books","▤","Buku tabungan"], ["reports","↗","Laporan"], ["audit","◷","Audit trail"]
  ],
  parent: [
    ["dashboard","⌂","Beranda"], ["history","≡","Riwayat transaksi"], ["transferinfo","⇄","Info transfer"], ["request","↙","Ajukan penarikan"]
  ]
};

function loginPage() {
  return `<div class="login-shell">
    <section class="login-visual">
      <div class="brand"><span class="brand-mark">S</span> SakuSekolah</div>
      <div class="hero-copy"><span class="eyebrow">Tabungan siswa, lebih tertib</span><h1>Menabung hari ini,<br>tumbuh esok hari.</h1><p>Satu tempat aman untuk mencatat setoran, mengelola penarikan, dan memantau perkembangan tabungan siswa.</p></div>
      <div class="trust-row"><span>Ledger terpusat</span><span>Transparan untuk orang tua</span><span>Audit setiap aktivitas</span></div>
    </section>
    <main class="login-panel"><div class="login-card">
      <h2>Selamat datang</h2><p>Masuk untuk melanjutkan ke ruang kerja Anda.</p>
      <form id="login-form">
        <div class="field"><label for="email">Email</label><input id="email" type="email" value="bu.rina@sekolah.id" required></div>
        <div class="field"><label for="password">Kata sandi</label><input id="password" type="password" value="demo123" minlength="4" required></div>
        <button class="btn btn-primary btn-block" type="submit">Masuk ke SakuSekolah →</button>
      </form>
      <div class="demo-label">Atau pilih akun demo</div>
      <div class="demo-accounts">
        <button class="demo-account" data-login="teacher"><strong>Wali Kelas</strong><span>Input setoran</span></button>
        <button class="demo-account" data-login="admin"><strong>Admin TU</strong><span>Verifikasi</span></button>
        <button class="demo-account" data-login="parent"><strong>Wali Murid</strong><span>Pantau saldo</span></button>
      </div>
    </div></main>
  </div>`;
}

function shell(content) {
  const items = nav[session.role].map(([id, icon, label]) => `<button class="nav-button ${route === id ? "active" : ""}" data-route="${id}"><span class="nav-icon">${icon}</span>${label}</button>`).join("");
  return `<div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="brand"><span class="brand-mark">S</span> SakuSekolah</div>
      <div class="workspace-label">Ruang kerja</div><nav class="nav">${items}</nav>
      <div class="sidebar-footer"><div class="user-mini"><div class="avatar">${session.initials}</div><div><strong>${session.name}</strong><span>${roleName(session.role)}</span></div></div></div>
    </aside>
    <main class="main">
      <header class="topbar"><div style="display:flex;align-items:center;gap:12px"><button class="mobile-menu" id="mobile-menu">☰</button><div class="breadcrumb">SakuSekolah / <strong>${nav[session.role].find(x => x[0] === route)?.[2] || "Ringkasan"}</strong></div></div>
        <div class="top-actions"><span class="role-pill">${roleName(session.role)}</span><div class="switcher"><button class="btn btn-secondary btn-sm" id="profile-toggle">${session.initials}⌄</button>${switchOpen ? switchMenu() : ""}</div></div>
      </header><div class="content">${content}</div>
    </main>
  </div>`;
}
function switchMenu() { return `<div class="switch-menu"><button data-switch="teacher">Masuk sebagai Wali Kelas</button><button data-switch="admin">Masuk sebagai Admin TU</button><button data-switch="parent">Masuk sebagai Wali Murid</button><button id="reset-demo">Reset data demo</button><button id="logout">Keluar</button></div>`; }
function pageHead(title, desc, action = "") { return `<div class="page-head"><div><h1>${title}</h1><p>${desc}</p></div>${action || `<span class="date-chip">Minggu, 5 Oktober 2026</span>`}</div>`; }
function metric(label, value, note, icon) { return `<div class="metric"><div class="metric-top"><span>${label}</span><span class="metric-icon">${icon}</span></div><div class="metric-value">${value}</div><div class="metric-note">${note}</div></div>`; }
function recentTable(rows, limit = 6) {
  const body = rows.slice(0, limit).map(x => { const s = student(x.studentId); return `<tr><td><strong>${s.name}</strong><small>${x.reference}</small></td><td>${shortDate(x.date)}</td><td>${methodLabel(x.method)}</td><td class="amount ${x.amount >= 0 ? "positive" : "negative"}">${x.amount >= 0 ? "+" : "−"}${money(Math.abs(x.amount))}</td><td>${statusBadge(x.status)}</td></tr>`; }).join("");
  return `<div class="table-wrap"><table><thead><tr><th>Siswa / Referensi</th><th>Tanggal</th><th>Metode</th><th>Nominal</th><th>Status</th></tr></thead><tbody>${body || `<tr><td colspan="5"><div class="empty">Belum ada transaksi.</div></td></tr>`}</tbody></table></div>`;
}

function teacherDashboard() {
  const pendingTotal = state.drafts.reduce((s,x)=>s+x.amount,0);
  const monthIn = state.ledger.filter(x=>x.type==="deposit" && x.date.startsWith("2026-10")).reduce((s,x)=>s+x.amount,0);
  return `${pageHead("Selamat pagi, Bu Rina","Pantau aktivitas tabungan kelas 5A hari ini.")}
    <div class="metric-grid">${metric("Total saldo kelas",money(totalBalance(state)),`${state.students.length} siswa aktif`,"◈")}${metric("Setoran bulan ini",money(monthIn),"Transaksi terverifikasi","↗")}${metric("Draf hari ini",money(pendingTotal),`${state.drafts.length} setoran belum dibatch`,`◷`)}${metric("Buku belum sinkron",state.ledger.filter(x=>!x.bookSynced).length,"Perlu dicatat ke buku fisik","▤")}</div>
    <div class="grid-2"><div class="card"><div class="card-head"><div><h2>Transaksi terbaru kelas 5A</h2><p>Data dari ledger resmi sekolah</p></div><button class="btn btn-secondary btn-sm" data-route="ledger">Lihat semua</button></div>${recentTable([...state.ledger].reverse())}</div>
      <div><div class="card"><div class="card-head"><div><h2>Aksi cepat</h2><p>Pekerjaan yang paling sering dilakukan</p></div></div><div class="card-body quick-list"><button class="quick-action" data-route="cash"><span class="quick-icon">＋</span><span><strong>Catat setoran tunai</strong><small>Tambah setoran siswa ke draf</small></span></button><button class="quick-action" data-route="batches"><span class="quick-icon">▣</span><span><strong>Buat batch setoran</strong><small>Kirim setoran ke Admin TU</small></span></button><button class="quick-action" data-route="books"><span class="quick-icon">✓</span><span><strong>Sinkronkan buku</strong><small>${state.ledger.filter(x=>!x.bookSynced).length} transaksi belum dicatat</small></span></button></div></div></div></div>`;
}
function adminDashboard() {
  const pendingBatches = state.batches.filter(x=>x.status==="pending");
  const pendingWd = state.withdrawals.filter(x=>["waiting_admin","processing"].includes(x.status));
  return `${pageHead("Ringkasan operasional","Semua yang perlu ditinjau oleh Tata Usaha hari ini.")}
    <div class="metric-grid">${metric("Dana kelolaan",money(totalBalance(state)),"Saldo ledger seluruh siswa","◈")}${metric("Batch menunggu",pendingBatches.length,`${pendingBatches.reduce((s,b)=>s+b.entries.length,0)} setoran untuk diverifikasi`,`✓`)}${metric("Penarikan aktif",pendingWd.length,`${money(pendingWd.reduce((s,x)=>s+x.amount,0))} diajukan`,`↙`)}${metric("Belum sinkron",state.ledger.filter(x=>!x.bookSynced).length,"Catatan buku tabungan","▤")}</div>
    <div class="grid-2"><div><div class="card"><div class="card-head"><div><h2>Prioritas hari ini</h2><p>Antrean yang membutuhkan tindakan</p></div></div><div class="card-body">${pendingBatches.map(batchSummary).join("") || `<div class="empty">Semua batch sudah ditinjau.</div>`}</div></div><div class="card"><div class="card-head"><div><h2>Ledger terbaru</h2><p>Sumber saldo resmi dan terverifikasi</p></div><button class="btn btn-secondary btn-sm" data-route="ledger">Buka ledger</button></div>${recentTable([...state.ledger].reverse(),5)}</div></div>
      <div class="card"><div class="card-head"><div><h2>Kesehatan operasional</h2><p>Ringkasan kontrol hari ini</p></div></div><div class="card-body stat-list"><div><div class="stat-row-top"><span>Batch selesai diverifikasi</span><strong>${state.batches.filter(x=>x.status==="approved").length}/${state.batches.length}</strong></div><div class="progress"><div style="width:${state.batches.length ? state.batches.filter(x=>x.status==="approved").length/state.batches.length*100 : 100}%"></div></div></div><div><div class="stat-row-top"><span>Buku sudah sinkron</span><strong>${state.ledger.filter(x=>x.bookSynced).length}/${state.ledger.length}</strong></div><div class="progress"><div style="width:${state.ledger.filter(x=>x.bookSynced).length/state.ledger.length*100}%"></div></div></div><div class="notice">Ledger hanya berubah setelah setoran diverifikasi atau penarikan diselesaikan. Ini menjaga saldo tetap konsisten.</div><button class="btn btn-primary btn-block" data-route="transfers">+ Catat transfer masuk</button></div></div></div>`;
}
function parentDashboard() {
  const s = state.students[0], balance = balanceOf(state,s.id), history = state.ledger.filter(x=>x.studentId===s.id).reverse();
  const pending = state.withdrawals.find(x=>x.studentId===s.id && !["completed","rejected"].includes(x.status));
  return `${pageHead("Halo, Ibu Dewi","Berikut perkembangan tabungan Alya hari ini.")}
    <div class="card" style="margin-bottom:18px"><div class="student-hero"><div class="student-avatar">${s.avatar}</div><div><strong style="font-size:16px">${s.name}</strong><div style="color:var(--muted);font-size:12px">NIS ${s.nis} · Kelas ${s.className}</div></div><div class="balance-big"><span>Saldo tersedia</span><strong>${money(balance)}</strong></div></div></div>
    <div class="metric-grid">${metric("Total setoran",money(history.filter(x=>x.amount>0).reduce((a,b)=>a+b.amount,0)),`${history.filter(x=>x.amount>0).length} transaksi masuk`,`↗`)}${metric("Total penarikan",money(Math.abs(history.filter(x=>x.amount<0).reduce((a,b)=>a+b.amount,0))),`${history.filter(x=>x.amount<0).length} transaksi keluar`,`↙`)}${metric("Buku tabungan",history.every(x=>x.bookSynced)?"Sinkron":`${history.filter(x=>!x.bookSynced).length} tertunda`,"Terakhir dicek hari ini","✓")}${metric("Pengajuan aktif",pending?"1":"0",pending?statusBadge(pending.status):"Tidak ada antrean","◷")}</div>
    <div class="grid-2"><div class="card"><div class="card-head"><div><h2>Riwayat Alya</h2><p>Transaksi terbaru yang sudah masuk ledger</p></div><button class="btn btn-secondary btn-sm" data-route="history">Lihat semua</button></div>${recentTable(history,5)}</div><div class="card"><div class="card-head"><div><h2>Aksi cepat</h2><p>Kelola tabungan Alya</p></div></div><div class="card-body quick-list"><button class="quick-action" data-route="transferinfo"><span class="quick-icon">⇄</span><span><strong>Setor lewat transfer</strong><small>Lihat rekening dan petunjuk</small></span></button><button class="quick-action" data-route="request"><span class="quick-icon">↙</span><span><strong>Ajukan penarikan</strong><small>Perlu persetujuan Admin TU</small></span></button></div></div></div>`;
}
function dashboard() { return session.role === "teacher" ? teacherDashboard() : session.role === "admin" ? adminDashboard() : parentDashboard(); }

function cashPage() {
  const opts = state.students.map(s=>`<option value="${s.id}">${s.name} · NIS ${s.nis}</option>`).join("");
  return `${pageHead("Setoran tunai","Catat uang yang diterima dari siswa sebelum dibuat menjadi batch.",`<button class="btn btn-secondary" data-route="batches">Lihat batch →</button>`)}
  <div class="grid-2 grid-even"><div class="card"><div class="card-head"><div><h2>Tambah setoran</h2><p>Pastikan nominal sesuai uang fisik yang diterima</p></div></div><div class="card-body"><form id="cash-form" class="form-grid"><div class="field span-2"><label>Siswa</label><select name="studentId">${opts}</select></div><div class="field"><label>Nominal</label><input name="amount" type="number" min="1000" step="1000" placeholder="contoh: 50000" required></div><div class="field"><label>Tanggal diterima</label><input name="date" type="date" value="${today()}" required></div><div class="field span-2"><label>Catatan (opsional)</label><input name="note" placeholder="contoh: Setoran rutin Senin"></div><button class="btn btn-primary span-2" type="submit">+ Tambahkan ke draf</button></form></div></div>
  <div class="card"><div class="card-head"><div><h2>Draf hari ini</h2><p>${state.drafts.length} setoran belum dikirim</p></div></div><div class="card-body">${draftList()}</div></div></div>`;
}
function draftList() { const total=state.drafts.reduce((s,x)=>s+x.amount,0); return `${state.drafts.length ? state.drafts.map(x=>`<div class="activity"><div class="activity-dot">Rp</div><div><p><strong>${student(x.studentId).name}</strong></p><small>${shortDate(x.date)} · ${x.note||"Tanpa catatan"}</small></div><div style="text-align:right"><strong>${money(x.amount)}</strong><button class="btn btn-danger btn-sm" data-remove-draft="${x.id}" style="margin-top:5px">Hapus</button></div></div>`).join("") : `<div class="empty"><div class="empty-icon">＋</div>Belum ada setoran di draf.</div>`}<div class="summary-strip"><div><small>Total draf</small><strong>${state.drafts.length} siswa</strong></div><div style="text-align:right"><small>Jumlah uang fisik</small><strong>${money(total)}</strong></div></div><button class="btn btn-primary btn-block" id="create-batch" ${!state.drafts.length?"disabled":""}>Buat & kirim batch ke Admin TU</button>`; }
function batchSummary(b) { const sum=b.entries.reduce((s,x)=>s+x.amount,0); return `<div class="batch-card"><div class="batch-top"><div><strong>${b.id}</strong><div style="color:var(--muted);font-size:11px">${b.className} · ${b.teacher}</div></div>${statusBadge(b.status)}</div><div class="batch-meta"><span>◷ ${dateTime(b.createdAt)}</span><span>♟ ${b.entries.length} siswa</span><span>◈ ${money(sum)}</span></div>${b.status==="pending"&&session.role==="admin"?`<div class="batch-actions"><button class="btn btn-primary btn-sm" data-approve-batch="${b.id}">Verifikasi & posting</button><button class="btn btn-danger btn-sm" data-reject-batch="${b.id}">Tolak</button></div>`:""}</div>`; }
function batchesPage(verify=false) { const list=state.batches.filter(x=>verify?x.status==="pending":true); return `${pageHead(verify?"Verifikasi batch":"Batch setoran",verify?"Tinjau dan posting setoran tunai ke ledger resmi.":"Pantau status pengiriman setoran kelas 5A.")}<div class="notice">${verify?"Periksa jumlah siswa dan total uang fisik sebelum memposting. Setelah diverifikasi, saldo siswa langsung diperbarui.":"Batch yang sudah dikirim tidak dapat diedit. Admin TU akan melakukan verifikasi sebelum saldo siswa bertambah."}</div><div class="card"><div class="card-head"><div><h2>${verify?"Antrean verifikasi":"Semua batch"}</h2><p>${list.length} batch ditampilkan</p></div></div><div class="card-body">${list.map(batchSummary).join("")||`<div class="empty"><div class="empty-icon">✓</div>Tidak ada batch yang menunggu.</div>`}</div></div>`; }

function transferPage() {
  return `${pageHead("Transfer bank","Catat transfer masuk dan cocokkan dengan siswa secara manual.")}<div class="grid-2 grid-even"><div class="card"><div class="card-head"><div><h2>Matching transfer baru</h2><p>Gunakan referensi mutasi bank sebagai bukti</p></div></div><div class="card-body"><form id="transfer-form" class="form-grid"><div class="field span-2"><label>Siswa</label><select name="studentId">${state.students.map(s=>`<option value="${s.id}">${s.name} · ${s.va}</option>`).join("")}</select></div><div class="field"><label>Nominal diterima</label><input name="amount" type="number" min="1000" step="1000" required></div><div class="field"><label>Tanggal transfer</label><input name="date" type="date" value="${today()}" required></div><div class="field span-2"><label>Referensi bank</label><input name="reference" placeholder="contoh: BNI-928471" required></div><div class="field span-2"><label>Catatan</label><input name="note" placeholder="Nama pengirim / keterangan mutasi"></div><button class="btn btn-primary span-2">Cocokkan & posting ke ledger</button></form></div></div><div class="card"><div class="card-head"><div><h2>Transfer terbaru</h2><p>Sudah dicocokkan dengan siswa</p></div></div>${recentTable(state.ledger.filter(x=>x.method==="transfer").reverse(),8)}</div></div>`;
}
function withdrawalPage() {
  return `${pageHead("Approval & proses penarikan","Validasi persetujuan wali dan selesaikan pencairan dana.")}<div class="card"><div class="card-head"><div><h2>Antrean penarikan</h2><p>${state.withdrawals.filter(x=>!["completed","rejected"].includes(x.status)).length} pengajuan aktif</p></div></div><div class="card-body">${state.withdrawals.map(w=>{const s=student(w.studentId);return `<div class="batch-card"><div class="batch-top"><div><strong>${s.name}</strong><div style="color:var(--muted);font-size:11px">${w.id} · Diajukan ${dateTime(w.requestedAt)}</div></div>${statusBadge(w.status)}</div><div class="batch-meta"><span>Nominal: <strong>${money(w.amount)}</strong></span><span>Saldo: <strong>${money(balanceOf(state,s.id))}</strong></span><span>Persetujuan wali: <strong>${w.parentApproved?"Ada":"Belum"}</strong></span></div><div style="font-size:12px;margin-bottom:12px">Keperluan: ${w.purpose}</div><div class="batch-actions">${w.status==="waiting_admin"?`<button class="btn btn-primary btn-sm" data-approve-wd="${w.id}">Setujui penarikan</button><button class="btn btn-danger btn-sm" data-reject-wd="${w.id}">Tolak</button>`:""}${w.status==="processing"?`<button class="btn btn-primary btn-sm" data-complete-wd="${w.id}">Konfirmasi dana diserahkan</button>`:""}</div></div>`}).join("")||`<div class="empty">Belum ada pengajuan.</div>`}</div></div>`;
}
function ledgerPage(parentOnly=false) {
  const rows = [...state.ledger].filter(x=>!parentOnly||x.studentId==="S-24001").reverse();
  const title = parentOnly?"Riwayat transaksi":"Ledger & saldo siswa";
  return `${pageHead(title,parentOnly?"Semua transaksi Alya yang sudah terverifikasi.":"Sumber data resmi untuk seluruh saldo tabungan.")}<div class="card" style="margin-bottom:18px"><div class="card-head"><div><h2>Saldo per siswa</h2><p>Dihitung otomatis dari transaksi yang berstatus tercatat</p></div></div><div class="table-wrap"><table><thead><tr><th>Siswa</th><th>NIS</th><th>Kelas</th><th>Saldo</th><th>Buku</th></tr></thead><tbody>${state.students.filter(s=>!parentOnly||s.id==="S-24001").map(s=>`<tr><td><strong>${s.name}</strong><small>${s.parent}</small></td><td>${s.nis}</td><td>${s.className}</td><td class="amount positive">${money(balanceOf(state,s.id))}</td><td>${state.ledger.filter(x=>x.studentId==s.id).every(x=>x.bookSynced)?statusBadge("synced"):statusBadge("pending")}</td></tr>`).join("")}</tbody></table></div></div><div class="card"><div class="card-head"><div><h2>Jurnal transaksi</h2><p>${rows.length} entri ledger</p></div></div>${recentTable(rows,50)}</div>`;
}
function booksPage() { const pending=state.ledger.filter(x=>!x.bookSynced); return `${pageHead("Sinkronisasi buku tabungan","Catat transaksi digital ke buku fisik siswa.",pending.length?`<button class="btn btn-primary" id="sync-all">Tandai semua tercatat</button>`:"")}<div class="notice">Saldo digital di ledger tetap menjadi sumber kebenaran. Buku fisik berfungsi sebagai catatan edukasi dan bukti untuk siswa.</div><div class="card"><div class="card-head"><div><h2>Belum dicatat di buku</h2><p>${pending.length} transaksi perlu disinkronkan</p></div></div><div class="table-wrap"><table><thead><tr><th>Siswa</th><th>Referensi</th><th>Tanggal</th><th>Nominal</th><th>Aksi</th></tr></thead><tbody>${pending.map(x=>`<tr><td><strong>${student(x.studentId).name}</strong><small>${methodLabel(x.method)}</small></td><td>${x.reference}</td><td>${shortDate(x.date)}</td><td class="amount ${x.amount>0?"positive":"negative"}">${money(x.amount)}</td><td><button class="btn btn-secondary btn-sm" data-sync="${x.id}">Sudah dicatat</button></td></tr>`).join("")||`<tr><td colspan="5"><div class="empty"><div class="empty-icon">✓</div>Semua buku sudah sinkron.</div></td></tr>`}</tbody></table></div></div>`; }
function reportsPage() { const deposits=state.ledger.filter(x=>x.amount>0), withdrawals=state.ledger.filter(x=>x.amount<0); return `${pageHead("Laporan dasar","Ringkasan dana dan aktivitas tabungan siswa.",`<button class="btn btn-secondary" id="print-report">Cetak laporan</button>`)}<div class="metric-grid">${metric("Total saldo",money(totalBalance(state)),"Saldo akhir seluruh siswa","◈")}${metric("Total setoran",money(deposits.reduce((s,x)=>s+x.amount,0)),`${deposits.length} transaksi masuk`,`↗`)}${metric("Total penarikan",money(Math.abs(withdrawals.reduce((s,x)=>s+x.amount,0))),`${withdrawals.length} transaksi keluar`,`↙`)}${metric("Rata-rata saldo",money(totalBalance(state)/state.students.length),"Per siswa aktif","≈")}</div><div class="grid-2 grid-even"><div class="card"><div class="card-head"><div><h2>Saldo tertinggi</h2><p>Peringkat berdasarkan ledger saat ini</p></div></div><div class="card-body">${[...state.students].sort((a,b)=>balanceOf(state,b.id)-balanceOf(state,a.id)).map((s,i)=>`<div class="activity"><div class="activity-dot">${i+1}</div><div><p><strong>${s.name}</strong></p><small>Kelas ${s.className} · ${s.nis}</small></div><strong>${money(balanceOf(state,s.id))}</strong></div>`).join("")}</div></div><div class="card"><div class="card-head"><div><h2>Komposisi setoran</h2><p>Berdasarkan kanal transaksi</p></div></div><div class="card-body stat-list">${["cash","transfer"].map(m=>{const v=deposits.filter(x=>x.method===m).reduce((s,x)=>s+x.amount,0),total=deposits.reduce((s,x)=>s+x.amount,0);return `<div><div class="stat-row-top"><span>${methodLabel(m)}</span><strong>${money(v)}</strong></div><div class="progress"><div style="width:${total?v/total*100:0}%"></div></div></div>`}).join("")}</div></div></div>`; }
function auditPage() { return `${pageHead("Audit trail","Jejak perubahan penting untuk kontrol dan pemeriksaan.")}<div class="card"><div class="card-head"><div><h2>Aktivitas sistem</h2><p>Dicatat otomatis dan tidak dapat diubah dari prototipe</p></div></div><div class="card-body activity-list">${state.audits.map(a=>`<div class="activity"><div class="activity-dot">◷</div><div><p><strong>${a.action}</strong> oleh ${a.actor}</p><small>${a.detail}</small></div><small>${dateTime(a.at)}</small></div>`).join("")}</div></div>`; }
function transferInfoPage() { const s=state.students[0]; return `${pageHead("Info transfer","Setor tabungan Alya dari rekening bank mana pun.")}<div class="grid-2 grid-even"><div><div class="bank-card"><div class="row"><strong>Bank Nusantara</strong><span>Virtual Account</span></div><small>Nomor tujuan transfer</small><div class="account">${s.va}</div><div class="row"><div><small>Atas nama</small><strong>${s.name}</strong></div><button class="btn btn-secondary btn-sm" id="copy-va">Salin nomor</button></div></div><div class="notice" style="margin-top:14px">Transfer akan diverifikasi secara manual oleh Admin TU. Simpan bukti transfer sampai transaksi muncul di riwayat.</div></div><div class="card"><div class="card-head"><div><h2>Cara melakukan setoran</h2><p>Biasanya terverifikasi pada hari sekolah</p></div></div><div class="card-body">${["Transfer tepat ke nomor Virtual Account Alya.","Gunakan nominal sesuai jumlah yang ingin ditabung.","Simpan nomor referensi atau bukti transfer.","Admin TU mencocokkan mutasi dan saldo otomatis bertambah."].map((t,i)=>`<div class="activity"><div class="activity-dot">${i+1}</div><div><p><strong>${t}</strong></p></div></div>`).join("")}</div></div></div>`; }
function requestPage() { const s=state.students[0], active=state.withdrawals.find(x=>x.studentId===s.id&&!["completed","rejected"].includes(x.status)); return `${pageHead("Ajukan penarikan","Penarikan membutuhkan konfirmasi wali murid dan persetujuan Admin TU.")}<div class="grid-2 grid-even"><div class="card"><div class="card-head"><div><h2>Form pengajuan</h2><p>Saldo tersedia ${money(balanceOf(state,s.id))}</p></div></div><div class="card-body">${active?`<div class="notice">Masih ada pengajuan aktif ${active.id} sebesar ${money(active.amount)} dengan status ${statusBadge(active.status)}.</div>`:""}<form id="withdraw-form"><div class="field"><label>Nominal penarikan</label><input name="amount" type="number" min="10000" step="5000" max="${balanceOf(state,s.id)}" required></div><div class="field"><label>Keperluan</label><textarea name="purpose" rows="3" placeholder="Jelaskan kebutuhan penarikan" required></textarea></div><label style="display:flex;gap:9px;align-items:flex-start;font-size:12px;margin:12px 0 18px"><input name="confirm" type="checkbox" required> Saya, Dewi Ramadhani, menyetujui pengajuan penarikan ini.</label><button class="btn btn-primary btn-block" ${active?"disabled":""}>Kirim pengajuan</button></form></div></div><div class="card"><div class="card-head"><div><h2>Status pengajuan</h2><p>Riwayat penarikan Alya</p></div></div><div class="card-body">${state.withdrawals.filter(x=>x.studentId===s.id).map(w=>`<div class="batch-card"><div class="batch-top"><strong>${w.id}</strong>${statusBadge(w.status)}</div><div class="batch-meta"><span>${dateTime(w.requestedAt)}</span><span>${money(w.amount)}</span></div><div style="font-size:12px">${w.purpose}</div></div>`).join("")||`<div class="empty">Belum ada pengajuan penarikan.</div>`}</div></div></div>`; }

function page() {
  const pages = { dashboard, cash:cashPage, batches:()=>batchesPage(false), verify:()=>batchesPage(true), transfers:transferPage, withdrawals:withdrawalPage, ledger:ledgerPage, history:()=>ledgerPage(true), books:booksPage, reports:reportsPage, audit:auditPage, transferinfo:transferInfoPage, request:requestPage };
  return (pages[route] || dashboard)();
}
function openModal(title, body) { document.body.insertAdjacentHTML("beforeend",`<div class="modal-backdrop" id="modal"><div class="modal"><div class="modal-head"><h2>${title}</h2><button class="modal-close" id="modal-close">×</button></div><div class="modal-body">${body}</div></div></div>`); }
function closeModal() { $("#modal")?.remove(); }
function rerender() { $("#app").innerHTML = session ? shell(page()) : loginPage(); window.scrollTo({ top: 0, left: 0, behavior: "instant" }); bind(); }
function setSession(role) { const profiles={teacher:{name:"Rina Wulandari",initials:"RW"},admin:{name:"Sari Puspita",initials:"SP"},parent:{name:"Dewi Ramadhani",initials:"DR"}}; session={role,...profiles[role]}; route="dashboard"; switchOpen=false; rerender(); }

function bind() {
  $("#login-form")?.addEventListener("submit", e=>{e.preventDefault(); const email=$("#email").value; setSession(email.includes("admin")?"admin":email.includes("orangtua")?"parent":"teacher");});
  $$('[data-login]').forEach(b=>b.onclick=()=>setSession(b.dataset.login));
  $$('[data-route]').forEach(b=>b.onclick=()=>{route=b.dataset.route; $("#sidebar")?.classList.remove("open"); rerender();});
  $("#mobile-menu")?.addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
  $("#profile-toggle")?.addEventListener("click",()=>{switchOpen=!switchOpen;rerender();});
  $$('[data-switch]').forEach(b=>b.onclick=()=>setSession(b.dataset.switch));
  $("#logout")?.addEventListener("click",()=>{session=null;route="dashboard";rerender();});
  $("#reset-demo")?.addEventListener("click",()=>{state=seedState();saveState();switchOpen=false;rerender();toast("Data demo berhasil direset.");});
  $("#cash-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);const amount=Number(f.get("amount"));state.drafts.push({id:uid("DR"),studentId:f.get("studentId"),amount,date:f.get("date"),note:f.get("note")});audit(session.name,"Menambah draf setoran",`${student(f.get("studentId")).name} · ${money(amount)}`);saveState();rerender();toast("Setoran ditambahkan ke draf.");});
  $$('[data-remove-draft]').forEach(b=>b.onclick=()=>{state.drafts=state.drafts.filter(x=>x.id!==b.dataset.removeDraft);saveState();rerender();toast("Draf dihapus.");});
  $("#create-batch")?.addEventListener("click",()=>{if(!state.drafts.length)return;const id=uid("BTH");const entries=state.drafts.map(x=>({...x,id:uid("BE")}));state.batches.unshift({id,className:"5A",teacher:session.name,createdAt:nowIso(),status:"pending",entries});state.drafts=[];audit(session.name,"Membuat batch setoran",`${id} · ${entries.length} siswa · ${money(entries.reduce((s,x)=>s+x.amount,0))}`);saveState();route="batches";rerender();toast("Batch dikirim ke Admin TU.");});
  $$('[data-approve-batch]').forEach(b=>b.onclick=()=>approveBatch(b.dataset.approveBatch));
  $$('[data-reject-batch]').forEach(b=>b.onclick=()=>rejectBatch(b.dataset.rejectBatch));
  $("#transfer-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target),sid=f.get("studentId"),amount=Number(f.get("amount")),ref=f.get("reference");state.ledger.push({id:uid("TRX"),studentId:sid,type:"deposit",method:"transfer",amount,date:f.get("date"),reference:ref,status:"posted",bookSynced:false,note:f.get("note")||"Transfer wali murid"});audit(session.name,"Mencocokkan transfer",`${ref} · ${student(sid).name} · ${money(amount)}`);saveState();rerender();toast("Transfer cocok dan sudah masuk ledger.");});
  $$('[data-approve-wd]').forEach(b=>b.onclick=()=>{const w=state.withdrawals.find(x=>x.id===b.dataset.approveWd);if(w.amount>balanceOf(state,w.studentId)){toast("Saldo siswa tidak mencukupi.");return;}w.status="processing";audit(session.name,"Menyetujui penarikan",`${w.id} · ${money(w.amount)}`);saveState();rerender();toast("Penarikan disetujui, lanjutkan pencairan.");});
  $$('[data-reject-wd]').forEach(b=>b.onclick=()=>{const w=state.withdrawals.find(x=>x.id===b.dataset.rejectWd);w.status="rejected";audit(session.name,"Menolak penarikan",`${w.id} · ${money(w.amount)}`);saveState();rerender();toast("Pengajuan ditolak.");});
  $$('[data-complete-wd]').forEach(b=>b.onclick=()=>completeWithdrawal(b.dataset.completeWd));
  $$('[data-sync]').forEach(b=>b.onclick=()=>syncEntries([b.dataset.sync]));
  $("#sync-all")?.addEventListener("click",()=>syncEntries(state.ledger.filter(x=>!x.bookSynced).map(x=>x.id)));
  $("#print-report")?.addEventListener("click",()=>window.print());
  $("#copy-va")?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(state.students[0].va);toast("Nomor Virtual Account disalin.");}catch{toast(`Nomor VA: ${state.students[0].va}`);}});
  $("#withdraw-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target),amount=Number(f.get("amount")),sid="S-24001";if(amount>balanceOf(state,sid)){toast("Nominal melebihi saldo tersedia.");return;}const id=uid("WD");state.withdrawals.unshift({id,studentId:sid,amount,purpose:f.get("purpose"),requestedAt:nowIso(),requestedBy:session.name,parentApproved:true,status:"waiting_admin"});audit(session.name,"Mengajukan penarikan",`${id} · ${student(sid).name} · ${money(amount)}`);saveState();rerender();toast("Pengajuan dikirim ke Admin TU.");});
  $("#modal-close")?.addEventListener("click",closeModal);
}
function approveBatch(id) { const batch=state.batches.find(x=>x.id===id);batch.status="approved";batch.entries.forEach(e=>state.ledger.push({id:uid("TRX"),studentId:e.studentId,type:"deposit",method:"cash",amount:e.amount,date:e.date,reference:batch.id,status:"posted",bookSynced:false,note:e.note||"Setoran tunai"}));audit(session.name,"Memverifikasi batch",`${batch.id} · ${batch.entries.length} siswa · ${money(batch.entries.reduce((s,x)=>s+x.amount,0))}`);saveState();rerender();toast("Batch terverifikasi dan saldo diperbarui."); }
function rejectBatch(id) { const batch=state.batches.find(x=>x.id===id);openModal("Tolak batch",`<p>Batch <strong>${id}</strong> akan ditolak dan tidak masuk ke ledger.</p><div class="field"><label>Alasan</label><textarea id="reject-reason" rows="3" placeholder="Tuliskan alasan penolakan"></textarea></div><div class="modal-actions"><button class="btn btn-secondary" id="cancel-reject">Batal</button><button class="btn btn-danger" id="confirm-reject">Tolak batch</button></div>`);$("#cancel-reject").onclick=closeModal;$("#confirm-reject").onclick=()=>{batch.status="rejected";audit(session.name,"Menolak batch",`${id} · ${$("#reject-reason").value||"Tidak ada alasan"}`);saveState();closeModal();rerender();toast("Batch ditolak.");}; }
function completeWithdrawal(id) { const w=state.withdrawals.find(x=>x.id===id); if(balanceOf(state,w.studentId)<w.amount){toast("Saldo siswa tidak mencukupi.");return;}w.status="completed";state.ledger.push({id:uid("TRX"),studentId:w.studentId,type:"withdrawal",method:"cash",amount:-w.amount,date:today(),reference:w.id,status:"posted",bookSynced:false,note:w.purpose});audit(session.name,"Menyelesaikan penarikan",`${w.id} · ${student(w.studentId).name} · ${money(w.amount)}`);saveState();rerender();toast("Dana diserahkan dan ledger diperbarui."); }
function syncEntries(ids) { state.ledger.forEach(x=>{if(ids.includes(x.id))x.bookSynced=true;});audit(session.name,"Sinkronisasi buku tabungan",`${ids.length} transaksi ditandai tercatat`);saveState();rerender();toast(`${ids.length} transaksi berhasil disinkronkan.`); }

if (typeof document !== "undefined") { state=loadState(); rerender(); }
