import {
    Address, Role, Account, Party, ada, lovelace, AvailableMoney, Constant, ConstantParam,
    NegValue, AddValue, SubValue, MulValue, DivValue, ChoiceValue, TimeIntervalStart,
    TimeIntervalEnd, UseValue, Cond, AndObs, OrObs, NotObs, ChoseSomething,
    ValueGE, ValueGT, ValueLT, ValueLE, ValueEQ, TrueObs, FalseObs, Deposit,
    Choice, Notify, Close, Pay, If, When, Let, Assert, SomeNumber, AccountId,
    ChoiceId, Token, ValueId, Value, EValue, Observation, Bound, Action, Payee,
    Case, Timeout, ETimeout, TimeParam, Contract
} from 'marlowe-js';

(function (): Contract {

    // Các bên tham gia vào hợp đồng
    const chuDoanhNghiep : Party = Role("ChuDoanhNghiep");
    const nhanVien1 : Party = Role("NhanVien1");
    const nhanVien2 : Party = Role("NhanVien2");
    const nhanVien3 : Party = Role("NhanVien3");
    const nhanVien4 : Party = Role("NhanVien4");
    const nhanVien5 : Party = Role("NhanVien5");
    const nhanVien6 : Party = Role("NhanVien6");
    const nhanVien7 : Party = Role("NhanVien7");
    const nhanVien8 : Party = Role("NhanVien8");
    const nhanVien9 : Party = Role("NhanVien9");
    const nhanVien10 : Party = Role("NhanVien10");

    // Các tham số dùng trong hợp đồng
    const thoiHanChuyenLuong : Timeout = TimeParam("ThoiHanChuyenLuong");
    const luong10NhanVien : Value = ConstantParam("Luong10NhanVien");
    const luong1NhanVien : Value = DivValue(luong10NhanVien, Constant(10n));

    function traLuong (nhanVien: Party, buocTiepTheo: Contract) {
        return Pay(chuDoanhNghiep, Party(nhanVien), lovelace, luong1NhanVien, buocTiepTheo);
    }

    function chuyenTienLuongVaoHopDong (buocTiepTheo: Contract) {
        return When([
            Case(Deposit(chuDoanhNghiep, chuDoanhNghiep, lovelace, luong10NhanVien), buocTiepTheo)
        ], thoiHanChuyenLuong, Close);
    }

    return chuyenTienLuongVaoHopDong (
        traLuong (nhanVien1, 
            traLuong (nhanVien2, 
                traLuong (nhanVien3, 
                    traLuong (nhanVien4, 
                        traLuong (nhanVien5, 
                            traLuong (nhanVien6, 
                                traLuong (nhanVien7, 
                                    traLuong (nhanVien8, 
                                        traLuong (nhanVien9, 
                                            traLuong (nhanVien10, Close)
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    );
})
