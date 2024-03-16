
CREATE TABLE NguoiDung(
	  MaNguoiDung serial NOT NULL PRIMARY KEY,
	  HoTen VARCHAR(50) NOT NULL,
	  NgaySinh DATE NOT NULL,
	  GioiTinh INT NOT NULL,
	  CangCuocCongDan VARCHAR(50) NOT NULL,
	  NgayCap DATE NOT NULL,
	  NoiCap VARCHAR(100) NOT NULL,
	  QuocTich VARCHAR(50) NOT NULL,
	  DanToc VARCHAR(50) NOT NULL,
	  TonGiao VARCHAR(50) NOT NULL,
	  Avatar VARCHAR(50) NOT NULL,
	  ChucVu VARCHAR(50) NOT NULL,
	  HocVan VARCHAR(50) NOT NULL,
	  EmailCongTy VARCHAR(50) NOT NULL,
	  MatKhau VARCHAR(50) NOT NULL,
	  EmailCaNhan VARCHAR(50) NOT NULL,
	  SoDienThoai CHAR(15) NOT NULL,
	  DiaChi VARCHAR(100) NOT NULL
);

CREATE TABLE DuAn(
	  MaDuAn serial NOT NULL PRIMARY KEY,
	  Ten_DA VARCHAR(50) NOT NULL,
	  SoNguoiThamGia_DA INT,
	  NgayBatDau_DA DATE,
	  NgayKetThuc DATE,
	  TrangThai_DA INT NOT NULL,
	  MoTa TEXT 
);

CREATE TABLE NguoiDung_DuAn(
	  id serial NOT NULL PRIMARY KEY,
	  MaNguoiDung INT NOT NULL,
	  MaDuAn INT NOT NULL,
	  FOREIGN KEY(MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
	  FOREIGN KEY(MaDuAn) REFERENCES DuAn(MaDuAn)
);

CREATE TABLE CongViec
(
	  MaCongViec serial NOT NULL PRIMARY KEY,
	  Ten_CV VARCHAR(100) NOT NULL,
	  SoNguoiThamGia_CV INT NOT NULL,
	  NgayBatDau_CV DATE NOT NULL,
	  NgayKetThuc_CV DATE NOT NULL,
	  TinhTrang_CV INT NOT NULL,
	  MoTa_CV TEXT NOT NULL,
	  MaDuAn INT NOT NULL,
	  Filename TEXT,
	  DoUuTien VARCHAR(50),
	  FOREIGN KEY(MaDuAn) REFERENCES DuAn(MaDuAn)
);

CREATE TABLE NguoiDung_CongViec(
	  id serial NOT NULL PRIMARY KEY,
	  MaNguoiDung INT NOT NULL,
	  MaCongViec INT NOT NULL,
	  TinhTrang_CV VARCHAR(50) NOT NULL,
	  FOREIGN KEY(MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
	  FOREIGN KEY(MaCongViec) REFERENCES CongViec(MaCongViec)
);

CREATE TABLE Luong
(
	  MaLuong serial NOT NULL PRIMARY KEY,
	  Thang int NOT NULL,
	  NgayCong int NOT NULL,
	  LuongChinh int NOT NULL,
	  LuongHieuQua int,
	  LuongNgoaiGio int,
	  LuongBoiDuong int,
	  PhiGuiXe int,
	  LuongThuong int,
	  PhuCapCom int,
	  ThuongSinhNhat int,
	  TongThu int NOT NULL,
	  BHXH int,
	  TamUng int,
	  ThueTNCN int,
	  TongChi int NOT NULL,
	  MaNguoiDung int NOT NULL,
	  FOREIGN KEY(MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);

CREATE TABLE NghiPhep(
	  MaNghiPhep serial NOT NULL PRIMARY KEY,
	  NgayBatDau DATE NOT NULL,
	  NgayKetThuc DATE NOT NULL,
	  LoaiNghiPhep VARCHAR(50) NOT NULL,
	  LyDo TEXT NOT NULL,
	  TrangThai VARCHAR(50) NOT NULL,
	  MaNguoiDung int NOT NULL,
	  LyDoTuChoi TEXT,
	  FOREIGN KEY(MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);

CREATE TABLE DangKiOT(
	MaOT serial NOT NULL PRIMARY KEY,
	GioBatDau timestamp NOT NULL,
	GioKetThuc timestamp NOT NULL,
	LyDo TEXT NOT NULL,
	TrangThai VARCHAR(50) NOT NULL,
	MaNguoiDung int NOT NULL,
	LyDoTuChoi TEXT,

	FOREIGN KEY(MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);

CREATE TABLE DuLieuDiemDanh(
	MaDiemDanh serial NOT NULL PRIMARY KEY,
	MaNguoiDung INT NOT NULL,
	GioCheckIn timestamp NOT NULL,
	GioCheckOut timestamp NOT NULL,
	DiaChi TEXT NOT NULL,
	FOREIGN KEY(MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);



ALTER TABLE DangKiOT ADD column NgayDangKi Date;

ALTER TABLE NghiPhep ADD column NgayDangKi Date;

ALTER TABLE Luong ADD column Nam INT;

-- Update db 2602
ALTER TABLE NguoiDung_CongViec Drop column TinhTrang_CV;


-- Update db 2902
CREATE TABLE BinhLuan(
	MaBinhLuan serial NOT NULL PRIMARY KEY,
	MaCongViec INT NOT NULL,
	MaNguoiDung INT NOT NULL,
	NoiDung TEXT NOT NULL,
	ThoiGian timestamp NOT NULL,
	FOREIGN KEY(MaCongViec) REFERENCES CongViec(MaCongViec),
	FOREIGN KEY(MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);
