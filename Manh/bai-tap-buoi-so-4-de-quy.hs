{-# LANGUAGE OverloadedStrings #-}
module Example where

import Language.Marlowe.Extended.V1
import Data.String

main :: IO ()
main = printJSON example


{- Define a contract, Close is the simplest contract which just ends the contract straight away
-}

-- Các bên tham gia vào hợp đồng
chuDoanhNghiep = Role "ChuDoanhNghiep"

--Các tham số dùng trong hợp đồng
thoiHanChuyenLuong = TimeParam "ThoiHanChuyenLuong"
soLuongNhanVien = 50

danhSachNhanVien :: [String]
danhSachNhanVien = ["NhanVien" ++ show i | i <- [1..soLuongNhanVien]]

luongToanBoNhanVien = ConstantParam "LuongToanBoNhanVien"
luong1NhanVien = DivValue luongToanBoNhanVien (Constant soLuongNhanVien)

-- hàm này sẽ thực hiện lệnh Pay một cách đệ quy để trả lương cho toàn bộ nhân viên từ tài khoản của chủ doanh nghiệp
traLuong :: [String] -> Contract
traLuong [] = Close
traLuong (nhanVien:cacNhanVienConLai) = Pay chuDoanhNghiep (Party (fromString nhanVien)) ada (UseValue "Luong1NhanVien") (traLuong cacNhanVienConLai)


chuyenTienLuongVaoHopDong :: Contract -> Contract
chuyenTienLuongVaoHopDong buocTiepTheo = 
    When
        [Case
            (Deposit chuDoanhNghiep chuDoanhNghiep ada luongToanBoNhanVien)
            (Let "Luong1NhanVien" luong1NhanVien buocTiepTheo)]
        (TimeParam "ThoiHanChuyenLuong")
        Close 


example :: Contract
example = chuyenTienLuongVaoHopDong (traLuong danhSachNhanVien)
