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
    
    const thoiHanChuyenTien = 1733305570000n;   // 03/12/24 
    const soMilliGiayTrongMotThang = 30n * 24n * 60n * 60n * 1000n;

    const soThangTraLai = 4;

    function chuyenTien (nguoiGui : Party, nguoiNhan : Party, soTien : Value, thoiHan: ETimeout, buocTiepTheo: Contract) : Contract {
        return When([
            Case(Deposit(nguoiNhan, nguoiGui, lovelace, soTien), Pay(nguoiNhan, Party(nguoiNhan), lovelace, soTien, buocTiepTheo))
        ], thoiHan, Close);
    }

    function taoHopDong(thangHienTai: bigint) : Contract {
        if (thangHienTai === 0n) {
            return chuyenTien (
                nguoiChoVay, 
                nguoiVayTien, 
                soTienGoc, 
                thoiHanChuyenTien, 
                taoHopDong(thangHienTai + 1n)
                )
        } else if (thangHienTai < soThangTraLai) {
            const thoiHanTraLai = thoiHanChuyenTien + soMilliGiayTrongMotThang * thangHienTai;
            return chuyenTien(
                nguoiVayTien,
                nguoiChoVay,
                tienLai,
                thoiHanTraLai,
                taoHopDong(thangHienTai + 1n)
            )
        } else {
            const thoiHanTraLai = thoiHanChuyenTien + soMilliGiayTrongMotThang * thangHienTai;
            return chuyenTien(
                nguoiVayTien,
                nguoiChoVay,
                tienGocCongLai,
                thoiHanTraLai,
                Close
            )
        }
    }

    const hopDong = taoHopDong(0n);

    return hopDong;
})
