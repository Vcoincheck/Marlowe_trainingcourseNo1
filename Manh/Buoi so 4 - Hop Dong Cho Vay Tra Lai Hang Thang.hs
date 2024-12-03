{-# LANGUAGE OverloadedStrings #-}
module Example where

import Language.Marlowe.Extended.V1

main :: IO ()
main = printJSON example


-- Các bên tham gia vào hợp đồng
nguoiChoVay = Role "NguoiChoVay"
nguoiVayTien = Role "NguoiVayTien"

--Các tham số dùng trong hợp đồng
soTienGoc = ConstantParam "SoTienGoc"
phanTramLaiSuat = Constant 5
tienLai = DivValue (MulValue soTienGoc phanTramLaiSuat) (Constant 100)
tienGocVaLai = DivValue (MulValue soTienGoc (AddValue phanTramLaiSuat (Constant 100))) (Constant 100)

thoiHanChuyenTienGoc = (TimeParam "ThoiHanChuyenTienGoc")
thoiHanTraLaiLan1 = (TimeParam "ThoiHanTraLaiLan1")
thoiHanTraLaiLan2 = (TimeParam "ThoiHanTraLaiLan2")
thoiHanTraLaiLan3 = (TimeParam "ThoiHanTraLaiLan3")
thoiHanTraLaiLan4 = (TimeParam "ThoiHanTraLaiLan4")
thoiHanTraLaiLan5 = (TimeParam "ThoiHanTraLaiLan5")
thoiHanTraLaiLan6 = (TimeParam "ThoiHanTraLaiLan6")
thoiHanTraLaiLan7 = (TimeParam "ThoiHanTraLaiLan7")



-- function này dùng để chuyển tiền từ người gửi đến người nhận thông qua hợp đồng thông minh
-- người gửi sẽ deposit số tiền vào tài khoản nội bộ của người nhận
-- sau đó hợp đồng sẽ pay số tiền từ tài khoản nội bộ của người nhận sang địa chỉ ví bên ngoài của người nhận
-- sau khi pay xong thì hợp đồng sẽ thực hiện công việc ở bước tiếp theo
-- nếu đến thời hạn chuyển tiền mà người gửi vẫn chưa chuyển tiền vào hợp đồng thì hợp đồng sẽ Close
chuyenTien nguoiGui nguoiNhan soTien thoiHan buocTiepTheo = 
    When
        [Case
            (Deposit
                nguoiNhan
                nguoiGui
                ada
                soTien
            )
            (Pay
                nguoiNhan
                (Party nguoiNhan)
                ada
                (AvailableMoney
                    nguoiNhan
                    ada
                )
                buocTiepTheo
            )]
        thoiHan
        Close 

{- Define a contract, Close is the simplest contract which just ends the contract straight away
-}
example :: Contract
example = 
    chuyenTien nguoiChoVay nguoiVayTien soTienGoc thoiHanChuyenTienGoc (
        chuyenTien nguoiVayTien nguoiChoVay tienLai thoiHanTraLaiLan1 (
            chuyenTien nguoiVayTien nguoiChoVay tienLai thoiHanTraLaiLan2 (
                chuyenTien nguoiVayTien nguoiChoVay tienLai thoiHanTraLaiLan3 (
                    chuyenTien nguoiVayTien nguoiChoVay tienLai thoiHanTraLaiLan4 (
                        chuyenTien nguoiVayTien nguoiChoVay tienLai thoiHanTraLaiLan5 (
                            chuyenTien nguoiVayTien nguoiChoVay tienLai thoiHanTraLaiLan6 (
                                chuyenTien nguoiVayTien nguoiChoVay tienGocVaLai thoiHanTraLaiLan7 Close
                            )
                        )
                    )
                )
            )
        )
    )
