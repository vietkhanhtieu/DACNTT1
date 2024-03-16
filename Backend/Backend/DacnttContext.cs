//using System;
//using System.Collections.Generic;
//using Backend.Models;
//using Microsoft.EntityFrameworkCore;

//namespace Backend;

//public partial class DacnttContext : DbContext
//{
//    public DacnttContext()
//    {
//    }

//    public DacnttContext(DbContextOptions<DacnttContext> options)
//        : base(options)
//    {
//    }

//    public virtual DbSet<Binhluan> Binhluans { get; set; }

//    public virtual DbSet<Congviec> Congviecs { get; set; }

//    public virtual DbSet<Dangkiot> Dangkiots { get; set; }

//    public virtual DbSet<Duan> Duans { get; set; }

//    public virtual DbSet<Dulieudiemdanh> Dulieudiemdanhs { get; set; }

//    public virtual DbSet<Luong> Luongs { get; set; }

//    public virtual DbSet<Nghiphep> Nghipheps { get; set; }

//    public virtual DbSet<Nguoidung> Nguoidungs { get; set; }

//    public virtual DbSet<NguoidungCongviec> NguoidungCongviecs { get; set; }

//    public virtual DbSet<NguoidungDuan> NguoidungDuans { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseNpgsql("Host=localhost;Database=DACNTT;Username=postgres;Password=0866449437khanh");

//    protected override void OnModelCreating(ModelBuilder modelBuilder)
//    {
//        modelBuilder.Entity<Binhluan>(entity =>
//        {
//            entity.HasKey(e => e.Mabinhluan).HasName("binhluan_pkey");

//            entity.ToTable("binhluan");

//            entity.Property(e => e.Mabinhluan).HasColumnName("mabinhluan");
//            entity.Property(e => e.Macongviec).HasColumnName("macongviec");
//            entity.Property(e => e.Manguoidung).HasColumnName("manguoidung");
//            entity.Property(e => e.Noidung).HasColumnName("noidung");
//            entity.Property(e => e.Thoigian)
//                .HasColumnType("timestamp without time zone")
//                .HasColumnName("thoigian");

//            entity.HasOne(d => d.MacongviecNavigation).WithMany(p => p.Binhluans)
//                .HasForeignKey(d => d.Macongviec)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("binhluan_macongviec_fkey");

//            entity.HasOne(d => d.ManguoidungNavigation).WithMany(p => p.Binhluans)
//                .HasForeignKey(d => d.Manguoidung)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("binhluan_manguoidung_fkey");
//        });

//        modelBuilder.Entity<Congviec>(entity =>
//        {
//            entity.HasKey(e => e.Macongviec).HasName("congviec_pkey");

//            entity.ToTable("congviec");

//            entity.Property(e => e.Macongviec).HasColumnName("macongviec");
//            entity.Property(e => e.Douutien)
//                .HasMaxLength(50)
//                .HasColumnName("douutien");
//            entity.Property(e => e.Filename).HasColumnName("filename");
//            entity.Property(e => e.Maduan).HasColumnName("maduan");
//            entity.Property(e => e.MotaCv).HasColumnName("mota_cv");
//            entity.Property(e => e.NgaybatdauCv).HasColumnName("ngaybatdau_cv");
//            entity.Property(e => e.NgayketthucCv).HasColumnName("ngayketthuc_cv");
//            entity.Property(e => e.SonguoithamgiaCv).HasColumnName("songuoithamgia_cv");
//            entity.Property(e => e.TenCv)
//                .HasMaxLength(100)
//                .HasColumnName("ten_cv");
//            entity.Property(e => e.TinhtrangCv).HasColumnName("tinhtrang_cv");

//            entity.HasOne(d => d.MaduanNavigation).WithMany(p => p.Congviecs)
//                .HasForeignKey(d => d.Maduan)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("congviec_maduan_fkey");
//        });

//        modelBuilder.Entity<Dangkiot>(entity =>
//        {
//            entity.HasKey(e => e.Maot).HasName("dangkiot_pkey");

//            entity.ToTable("dangkiot");

//            entity.Property(e => e.Maot).HasColumnName("maot");
//            entity.Property(e => e.Giobatdau)
//                .HasColumnType("timestamp without time zone")
//                .HasColumnName("giobatdau");
//            entity.Property(e => e.Gioketthuc)
//                .HasColumnType("timestamp without time zone")
//                .HasColumnName("gioketthuc");
//            entity.Property(e => e.Lydo).HasColumnName("lydo");
//            entity.Property(e => e.Lydotuchoi).HasColumnName("lydotuchoi");
//            entity.Property(e => e.Manguoidung).HasColumnName("manguoidung");
//            entity.Property(e => e.Ngaydangki).HasColumnName("ngaydangki");
//            entity.Property(e => e.Trangthai)
//                .HasMaxLength(50)
//                .HasColumnName("trangthai");

//            entity.HasOne(d => d.ManguoidungNavigation).WithMany(p => p.Dangkiots)
//                .HasForeignKey(d => d.Manguoidung)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("dangkiot_manguoidung_fkey");
//        });

//        modelBuilder.Entity<Duan>(entity =>
//        {
//            entity.HasKey(e => e.Maduan).HasName("duan_pkey");

//            entity.ToTable("duan");

//            entity.Property(e => e.Maduan).HasColumnName("maduan");
//            entity.Property(e => e.Mota).HasColumnName("mota");
//            entity.Property(e => e.NgaybatdauDa).HasColumnName("ngaybatdau_da");
//            entity.Property(e => e.Ngayketthuc).HasColumnName("ngayketthuc");
//            entity.Property(e => e.SonguoithamgiaDa).HasColumnName("songuoithamgia_da");
//            entity.Property(e => e.TenDa)
//                .HasMaxLength(50)
//                .HasColumnName("ten_da");
//            entity.Property(e => e.TrangthaiDa).HasColumnName("trangthai_da");
//        });

//        modelBuilder.Entity<Dulieudiemdanh>(entity =>
//        {
//            entity.HasKey(e => e.Madiemdanh).HasName("dulieudiemdanh_pkey");

//            entity.ToTable("dulieudiemdanh");

//            entity.Property(e => e.Madiemdanh).HasColumnName("madiemdanh");
//            entity.Property(e => e.Diachi).HasColumnName("diachi");
//            entity.Property(e => e.Giocheckin)
//                .HasColumnType("timestamp without time zone")
//                .HasColumnName("giocheckin");
//            entity.Property(e => e.Giocheckout)
//                .HasColumnType("timestamp without time zone")
//                .HasColumnName("giocheckout");
//            entity.Property(e => e.Manguoidung).HasColumnName("manguoidung");

//            entity.HasOne(d => d.ManguoidungNavigation).WithMany(p => p.Dulieudiemdanhs)
//                .HasForeignKey(d => d.Manguoidung)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("dulieudiemdanh_manguoidung_fkey");
//        });

//        modelBuilder.Entity<Luong>(entity =>
//        {
//            entity.HasKey(e => e.Maluong).HasName("luong_pkey");

//            entity.ToTable("luong");

//            entity.Property(e => e.Maluong).HasColumnName("maluong");
//            entity.Property(e => e.Bhxh).HasColumnName("bhxh");
//            entity.Property(e => e.Luongboiduong).HasColumnName("luongboiduong");
//            entity.Property(e => e.Luongchinh).HasColumnName("luongchinh");
//            entity.Property(e => e.Luonghieuqua).HasColumnName("luonghieuqua");
//            entity.Property(e => e.Luongngoaigio).HasColumnName("luongngoaigio");
//            entity.Property(e => e.Luongthuong).HasColumnName("luongthuong");
//            entity.Property(e => e.Manguoidung).HasColumnName("manguoidung");
//            entity.Property(e => e.Nam).HasColumnName("nam");
//            entity.Property(e => e.Ngaycong).HasColumnName("ngaycong");
//            entity.Property(e => e.Phiguixe).HasColumnName("phiguixe");
//            entity.Property(e => e.Phucapcom).HasColumnName("phucapcom");
//            entity.Property(e => e.Tamung).HasColumnName("tamung");
//            entity.Property(e => e.Thang).HasColumnName("thang");
//            entity.Property(e => e.Thuetncn).HasColumnName("thuetncn");
//            entity.Property(e => e.Thuongsinhnhat).HasColumnName("thuongsinhnhat");
//            entity.Property(e => e.Tongchi).HasColumnName("tongchi");
//            entity.Property(e => e.Tongthu).HasColumnName("tongthu");

//            entity.HasOne(d => d.ManguoidungNavigation).WithMany(p => p.Luongs)
//                .HasForeignKey(d => d.Manguoidung)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("luong_manguoidung_fkey");
//        });

//        modelBuilder.Entity<Nghiphep>(entity =>
//        {
//            entity.HasKey(e => e.Manghiphep).HasName("nghiphep_pkey");

//            entity.ToTable("nghiphep");

//            entity.Property(e => e.Manghiphep).HasColumnName("manghiphep");
//            entity.Property(e => e.Loainghiphep)
//                .HasMaxLength(50)
//                .HasColumnName("loainghiphep");
//            entity.Property(e => e.Lydo).HasColumnName("lydo");
//            entity.Property(e => e.Lydotuchoi).HasColumnName("lydotuchoi");
//            entity.Property(e => e.Manguoidung).HasColumnName("manguoidung");
//            entity.Property(e => e.Ngaybatdau).HasColumnName("ngaybatdau");
//            entity.Property(e => e.Ngaydangki).HasColumnName("ngaydangki");
//            entity.Property(e => e.Ngayketthuc).HasColumnName("ngayketthuc");
//            entity.Property(e => e.Trangthai)
//                .HasMaxLength(50)
//                .HasColumnName("trangthai");

//            entity.HasOne(d => d.ManguoidungNavigation).WithMany(p => p.Nghipheps)
//                .HasForeignKey(d => d.Manguoidung)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("nghiphep_manguoidung_fkey");
//        });

//        modelBuilder.Entity<Nguoidung>(entity =>
//        {
//            entity.HasKey(e => e.Manguoidung).HasName("nguoidung_pkey");

//            entity.ToTable("nguoidung");

//            entity.Property(e => e.Manguoidung).HasColumnName("manguoidung");
//            entity.Property(e => e.Avatar)
//                .HasMaxLength(50)
//                .HasColumnName("avatar");
//            entity.Property(e => e.Cangcuoccongdan)
//                .HasMaxLength(50)
//                .HasColumnName("cangcuoccongdan");
//            entity.Property(e => e.Chucvu)
//                .HasMaxLength(50)
//                .HasColumnName("chucvu");
//            entity.Property(e => e.Dantoc)
//                .HasMaxLength(50)
//                .HasColumnName("dantoc");
//            entity.Property(e => e.Diachi)
//                .HasMaxLength(100)
//                .HasColumnName("diachi");
//            entity.Property(e => e.Emailcanhan)
//                .HasMaxLength(50)
//                .HasColumnName("emailcanhan");
//            entity.Property(e => e.Emailcongty)
//                .HasMaxLength(50)
//                .HasColumnName("emailcongty");
//            entity.Property(e => e.Gioitinh).HasColumnName("gioitinh");
//            entity.Property(e => e.Hocvan)
//                .HasMaxLength(50)
//                .HasColumnName("hocvan");
//            entity.Property(e => e.Hoten)
//                .HasMaxLength(50)
//                .HasColumnName("hoten");
//            entity.Property(e => e.Matkhau)
//                .HasMaxLength(50)
//                .HasColumnName("matkhau");
//            entity.Property(e => e.Ngaycap).HasColumnName("ngaycap");
//            entity.Property(e => e.Ngaysinh).HasColumnName("ngaysinh");
//            entity.Property(e => e.Noicap)
//                .HasMaxLength(100)
//                .HasColumnName("noicap");
//            entity.Property(e => e.Quoctich)
//                .HasMaxLength(50)
//                .HasColumnName("quoctich");
//            entity.Property(e => e.Sodienthoai)
//                .HasMaxLength(15)
//                .IsFixedLength()
//                .HasColumnName("sodienthoai");
//            entity.Property(e => e.Tongiao)
//                .HasMaxLength(50)
//                .HasColumnName("tongiao");
//        });

//        modelBuilder.Entity<NguoidungCongviec>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("nguoidung_congviec_pkey");

//            entity.ToTable("nguoidung_congviec");

//            entity.Property(e => e.Id).HasColumnName("id");
//            entity.Property(e => e.Macongviec).HasColumnName("macongviec");
//            entity.Property(e => e.Manguoidung).HasColumnName("manguoidung");

//            entity.HasOne(d => d.MacongviecNavigation).WithMany(p => p.NguoidungCongviecs)
//                .HasForeignKey(d => d.Macongviec)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("nguoidung_congviec_macongviec_fkey");

//            entity.HasOne(d => d.ManguoidungNavigation).WithMany(p => p.NguoidungCongviecs)
//                .HasForeignKey(d => d.Manguoidung)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("nguoidung_congviec_manguoidung_fkey");
//        });

//        modelBuilder.Entity<NguoidungDuan>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("nguoidung_duan_pkey");

//            entity.ToTable("nguoidung_duan");

//            entity.Property(e => e.Id).HasColumnName("id");
//            entity.Property(e => e.Maduan).HasColumnName("maduan");
//            entity.Property(e => e.Manguoidung).HasColumnName("manguoidung");

//            entity.HasOne(d => d.MaduanNavigation).WithMany(p => p.NguoidungDuans)
//                .HasForeignKey(d => d.Maduan)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("nguoidung_duan_maduan_fkey");

//            entity.HasOne(d => d.ManguoidungNavigation).WithMany(p => p.NguoidungDuans)
//                .HasForeignKey(d => d.Manguoidung)
//                .OnDelete(DeleteBehavior.ClientSetNull)
//                .HasConstraintName("nguoidung_duan_manguoidung_fkey");
//        });

//        OnModelCreatingPartial(modelBuilder);
//    }

//    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
//}
