function guidd() {
    return parseInt(Date.now() + Math.random());
}

function saveMoneyInfo() {
    var keys = ['reason', 'inout', 'ammount'];
    var obj = {};

    keys.forEach(function(ite, ind) {
        var result = document.getElementById(ite).value;
        if (result) {
            obj[ite] = result;
        }
    })

    var moneys = getMoneys();

    if (!moneys.length) {
        $('.show-money-info').addClass('hide');
    }

    if (Object.keys(obj).length) {
        var moneys = getMoneys();
        obj.id = guidd();
        moneys.push(obj);
        var data = JSON.stringify(moneys);
        localStorage.setItem("moneys", data);
        clearFields();
        obj.d_o_b = calculateAge(obj.d_o_b);
        insertIntoTView(obj, getTotalRowOfT());
    }
}

/**
 * Clear Create New Money Form Data0
 */
function clearFields() {
    $('#input_money')[0].reset();
}

/** 
 * Get All Moneys already stored into the local storage
 */
function getMoneys() {
    var moneyRecord = localStorage.getItem("moneys");
    var moneys = [];
    if (!moneyRecord) {
        return moneys;
    } else {
        moneys = JSON.parse(moneyRecord);
        return moneys;
    }
}

/**
 * Format Age of All Moneys
 */
function getFormattedMoneys() {
    var moneys = getMoneys();

    moneys.forEach(function(ite, ind) {
        ite.d_o_b = calculateAge(ite.d_o_b);
    });
    return moneys;

}
/**
 * Calculate Age in current date from birthdate 
 * 
 * @param {string} date 
 */
function calculateAge(date) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
/**
 * Populating Table with stored data
 */
function getTData() {
    $("#money_table").find("tr:not(:first)").remove();

    var sKd = $('#money_search').val();
    var moneys = getFormattedMoneys();

    var filteredMoneys = moneys.filter(function(ite, ind) {
        return ite.reason.toLowerCase().includes(sKd.toLowerCase()) ||
            ite.inout.toLowerCase().includes(sKd.toLowerCase()) ||
            ite.ammount.toLowerCase().includes(sKd.toLowerCase())
    });
    if (!filteredMoneys.length) {
        $('.show-money-info').removeClass('hide');
    } else {
        $('.show-money-info').addClass('hide');
    }
    filteredMoneys.forEach(function(ite, ind) {
        insertIntoTView(ite, ind + 1);
    })
}
/**
 * Inserting data into the table of the view
 * 
 * @param {object} ite
 * @param {int} tind 
 */
function insertIntoTView(ite, tind) {
    var t = document.getElementById('money_table');
    var row = t.insertRow();
    var idCell = row.insertCell(0);
    var reaSonCell = row.insertCell(1);
    var inoutCell = row.insertCell(2);
    var ammountCell = row.insertCell(3);
    idCell.innerHTML = tind;
    reaSonCell.innerHTML = ite.reason;
    inoutCell.innerHTML = ite.inout;
    ammountCell.innerHTML = ite.ammount;
    var guidd = ite.id;


}

function getTotalRowOfT() {
    var t = document.getElementById('money_table');
    return t.rows.length;
}

/**
 
 * @param {string} id 
 */
function showMoneyData(id) {
    var allMoneys = getMoneys();
    var money = allMoneys.find(function(ite) {
        return ite.id == id;
    })
    $('#show_reason').val(money.reason);
    $('#show_inout').val(money.inout);
    $('#show_ammount').val(money.ammount);

}

/**
 * Sorting table data through tipe, e.g: reason, email, inout etc.
 * 
 * @param {string} tipe 
 */

function sortBy(tipe) {
    $("#money_table").find("tr:not(:first)").remove();

    var tCT = parseInt(localStorage.getItem(tipe));
    if (!tCT) {
        tCT = 1;
        localStorage.setItem(tipe, tCT);
    } else {
        if (tCT == 1) {
            tCT = 2;
        } else {
            tCT = 1;
        }
        localStorage.setItem(tipe, tCT);
    }

    var searchKeyword = $('#money_search').val();
    var moneys = getFormattedMoneys();

    var sortedMoneys = moneys.sort(function(e, f) {
        return (tCT == 2) ? e[tipe] > f[tipe] : e[tipe] < f[tipe];
    });

    sortedMoneys.forEach(function(ite, ind) {
        insertIntoTView(ite, ind + 1);
    })
}