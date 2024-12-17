{-# LANGUAGE OverloadedStrings #-}
module Example where

import Language.Marlowe.Extended.V1

main :: IO ()
main = printJSON example


{- Define a contract, Close is the simplest contract which just ends the contract straight away
-}

-- Các bên tham gia vào hợp đồng
chuDoanhNghiep = Role "ChuDoanhNghiep"
nhanVien1 = Role "NhanVien1"
nhanVien2 = Role "NhanVien2"
nhanVien3 = Role "NhanVien3"
nhanVien4 = Role "NhanVien4"
nhanVien5 = Role "NhanVien5"
nhanVien6 = Role "NhanVien6"
nhanVien7 = Role "NhanVien7"
nhanVien8 = Role "NhanVien8"
nhanVien9 = Role "NhanVien9"
nhanVien10 = Role "NhanVien10"

--Các tham số dùng trong hợp đồng
thoiHanChuyenLuong = TimeParam "ThoiHanChuyenLuong"
luong10NhanVien = ConstantParam "Luong10NhanVien"
luong1NhanVien = DivValue luong10NhanVien (Constant 10)

-- hàm này sẽ thực hiện lệnh Pay để trả lương cho 1 nhân viên từ tài khoản của chủ doanh nghiệp
traLuong nhanVien buocTiepTheo = 
    Pay
        chuDoanhNghiep
        (Party nhanVien)
        ada
        luong1NhanVien
        buocTiepTheo 

chuyenTienLuongVaoHopDong buocTiepTheo = 
    When
        [Case
            (Deposit
                chuDoanhNghiep
                chuDoanhNghiep
                ada
                luong10NhanVien
            )
            buocTiepTheo]
        (TimeParam "ThoiHanChuyenLuong")
        Close 

example :: Contract
example = chuyenTienLuongVaoHopDong (
            traLuong nhanVien1 (
                traLuong nhanVien2 (
                    traLuong nhanVien3 (
                        traLuong nhanVien4 (
                            traLuong nhanVien5 (
                                traLuong nhanVien6 (
                                    traLuong nhanVien7 (
                                        traLuong nhanVien8 (
                                            traLuong nhanVien9 (
                                                traLuong nhanVien10 Close
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
