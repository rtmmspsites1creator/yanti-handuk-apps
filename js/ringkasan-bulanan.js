function ringkasPemasukanBulanan(transaksi, kolomNominal = 'total') {
  const kelompok = new Map();

  (transaksi || []).forEach(item => {
    const tanggal = new Date(item && item.tanggal);
    const nominal = Number(item && item[kolomNominal]);
    if (Number.isNaN(tanggal.getTime()) || !Number.isFinite(nominal)) return;

    const tahun = tanggal.getFullYear();
    const bulan = tanggal.getMonth() + 1;
    const kunci = `${tahun}-${String(bulan).padStart(2, '0')}`;

    const entri = kelompok.get(kunci) || {
      kunci,
      tahun,
      bulan,
      label: tanggal.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
      total: 0,
      jumlahTransaksi: 0
    };

    entri.total += nominal;
    entri.jumlahTransaksi += 1;
    kelompok.set(kunci, entri);
  });

  return Array.from(kelompok.values()).sort((a, b) => b.kunci.localeCompare(a.kunci));
}
