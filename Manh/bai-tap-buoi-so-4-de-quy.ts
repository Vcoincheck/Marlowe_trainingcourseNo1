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

    // Các tham số dùng trong hợp đồng
    const soLuongNhanVien = 50;
    const thoiHanChuyenLuong : Timeout = TimeParam("ThoiHanChuyenLuong");
    const luongToanBoNhanVien : Value = ConstantParam("LuongToanBoNhanVien");
    const luong1NhanVien : Value = DivValue(luongToanBoNhanVien, Constant(soLuongNhanVien));

    function traLuong (sttNhanVien: number) : Contract {
        if (sttNhanVien === soLuongNhanVien) {
            // Nếu đã đến lượt nhân viên cuối cùng, thì sau khi trả lương xong hợp đồng sẽ Close
            return Pay(chuDoanhNghiep, Party(Role(`NhanVien${sttNhanVien}`)), lovelace, UseValue("Luong1NhanVien"), Close);    
        } else {
            return Pay(chuDoanhNghiep, Party(Role(`NhanVien${sttNhanVien}`)), lovelace, UseValue("Luong1NhanVien"), traLuong(sttNhanVien+1));
        }
    }

    function chuyenTienLuongVaoHopDong (buocTiepTheo: Contract) {
        return When([
            Case(Deposit(chuDoanhNghiep, chuDoanhNghiep, lovelace, luongToanBoNhanVien), 
                Let("Luong1NhanVien", luong1NhanVien, buocTiepTheo)
            )
        ], thoiHanChuyenLuong, Close);
    }

    return chuyenTienLuongVaoHopDong (traLuong (1));
})
