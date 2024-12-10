{-# LANGUAGE OverloadedStrings #-}
module Example where

import Language.Marlowe.Extended.V1

main :: IO ()
main = printJSON example


{- Define a contract, Close is the simplest contract which just ends the contract straight away
-}

manager = (Role "Manager")
nhanVien1 = (Role "NhanVien1")
nhanVien2 = (Role "NhanVien2")
nhanVien3 = (Role "NhanVien3")
nhanVien4 = (Role "NhanVien4")
nhanVien5 = (Role "NhanVien5")
nhanVien6 = (Role "NhanVien6")
nhanVien7 = (Role "NhanVien7")
nhanVien8 = (Role "NhanVien8")
nhanVien9 = (Role "NhanVien9")
nhanVien10 = (Role "NhanVien10")

totalTienluong = (ConstantParam "TongTienLuong")
thoiHanchuyenluong = (TimeParam "ThoiHanChuyenLuong")
luongMotNguoi = (DivValue
                    (MulValue
                        (ConstantParam "TongTienLuong")
                        (Constant 10)
                    )
                    (Constant 100)
                )

chuyenLuongNhanVien nguoiNhan = Pay
            manager
            (Party nguoiNhan)
            ada
            luongMotNguoi








example :: Contract
example = When
    [Case
        (Deposit
            manager
            manager
            ada
            totalTienluong
        )
        (chuyenLuongNhanVien nhanVien1
            (chuyenLuongNhanVien nhanVien2
                (chuyenLuongNhanVien nhanVien3
                    (chuyenLuongNhanVien nhanVien4
                        (chuyenLuongNhanVien nhanVien5
                            (chuyenLuongNhanVien nhanVien6
                                (chuyenLuongNhanVien nhanVien7
                                    (chuyenLuongNhanVien nhanVien8
                                        (chuyenLuongNhanVien nhanVien9
                                            (chuyenLuongNhanVien nhanVien10
                                                Close 
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )]
    thoiHanchuyenluong
    Close 
