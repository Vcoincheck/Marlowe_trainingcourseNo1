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
    const nguoiChoVay = Role("NguoiChoVay");
    const nguoiVayTien = Role("NguoiVayTien");

    const soTienGoc = ConstantParam("SoTienGoc");
    const laiSuat = Constant(5n);
    const tienLai = DivValue(MulValue(soTienGoc, laiSuat), Constant(100n));
    const tienGocCongLai = AddValue(tienLai, soTienGoc);

    const thoiHanChuyenTien = TimeParam("ThoiHanChuyenTien");
    const thoiHanTraLaiLan1 = TimeParam("ThoiHanTraLaiLan1");
    const thoiHanTraLaiLan2 = TimeParam("ThoiHanTraLaiLan2");
    const thoiHanTraLaiLan3 = TimeParam("ThoiHanTraLaiLan3");

    function chuyenTien (nguoiGui : Party, nguoiNhan : Party, soTien : Value, thoiHan: Timeout, buocTiepTheo: Contract) : Contract {
        return When([
            Case(Deposit(nguoiNhan, nguoiGui, lovelace, soTien), Pay(nguoiNhan, Party(nguoiNhan), lovelace, soTien, buocTiepTheo))
        ], thoiHan, Close);
    }
    return chuyenTien(nguoiChoVay, nguoiVayTien, soTienGoc, thoiHanChuyenTien, 
            chuyenTien(nguoiVayTien, nguoiChoVay, tienLai, thoiHanTraLaiLan1, 
                chuyenTien(nguoiVayTien, nguoiChoVay, tienLai, thoiHanTraLaiLan2, 
                    chuyenTien(nguoiVayTien, nguoiChoVay, tienGocCongLai, thoiHanTraLaiLan3, Close)
                )
            )
        );
})
