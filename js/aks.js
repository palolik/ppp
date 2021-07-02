/**
 * Initiate the app at the beginning

 /**
 * Generating unique ID for new Input
 */
function guid() {
    return parseInt(Date.now() + Math.random());
}

/**
 * Create and Store New Member
 */
function saveMemberInfo() {
    var keys = ['first_name', 'last_name', 'designation'];
    var obj = {};

    keys.forEach(function (item, index) {
        var result = document.getElementById(item).value;
        if (result) {
            obj[item] = result;
        }
    })

    var members = getMembers();

    if (!members.length) {
        $('.show-table-info').addClass('hide');
    }

    if (Object.keys(obj).length) {
        var members = getMembers();
        obj.id = guid();
        members.push(obj);
        var data = JSON.stringify(members);
        localStorage.setItem("members", data);
        clearFields();
        obj.d_o_b = calculateAge(obj.d_o_b);
        insertIntoTableView(obj, getTotalRowOfTable());

    }
}

/**
 * Clear Create New Member Form Data0
 */
function clearFields() {
    $('#input_form')[0].reset();
}

/**
 * Get All Members already stored into the local storage
 */
function getMembers() {
    var memberRecord = localStorage.getItem("members");
    var members = [];
    if (!memberRecord) {
        return members;
    } else {
        members = JSON.parse(memberRecord);
        return members;
    }
}

/**
 * Format Age of All Members
 */
function getFormattedMembers() {
    var members = getMembers();

    members.forEach(function (item, index) {
        item.d_o_b = calculateAge(item.d_o_b);
    });

    return members;

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
function getTableData() {
    console.log("Code came here")
    $("#member_table").find("tr:not(:first)").remove();

    var searchKeyword = $('#member_search').val();
    var members = getFormattedMembers();

    var filteredMembers = members.filter(function (item, index) {
        return item.first_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.last_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.designation.toLowerCase().includes(searchKeyword.toLowerCase())
    });

    if (!filteredMembers.length) {
        $('.show-table-info').removeClass('hide');
    } else {
        $('.show-table-info').addClass('hide');
    }

    filteredMembers.forEach(function (item, index) {
        insertIntoTableView(item, index + 1);
    })
}

/**
 * Inserting data into the table of the view
 *
 * @param {object} item
 * @param {int} tableIndex
 */
function insertIntoTableView(item, tableIndex) {
    console.log("Code came here")
    var table = document.getElementById('member_table');
    var row = table.insertRow();
    var idCell = row.insertCell(0);
    var firstNameCell = row.insertCell(1);
    var lastNameCell = row.insertCell(2);
    var designationCell = row.insertCell(3);
    var actionCell = row.insertCell(4);
    idCell.innerHTML = tableIndex;
    firstNameCell.innerHTML = item.first_name;
    lastNameCell.innerHTML = item.last_name;

    designationCell.innerHTML = item.designation;
    var guid = item.id;

    actionCell.innerHTML = "<button id='plusOne' style='background-color: red;' onclick='doPlusOne()'> Done </button>";

}


/**
 * Get Total Row of Table
 */
function getTotalRowOfTable() {
    var table = document.getElementById('member_table');
    return table.rows.length;
}

/**
 * Show Single Member Data into the modal
 *

 /**
 * Show Edit Modal of a single member

 /**

 /**
 * Show Delete Confirmation Dialog Modal
 *
 * @param {int} id
 */
function showDeleteModal(id) {
    $('#deleted-member-id').val(id);
    $('#deleteDialog').modal();
}

/**
 * Delete single member
 */
function deleteMemberData() {
    var id = $('#deleted-member-id').val();
    var allMembers = getMembers();

    var storageUsers = JSON.parse(localStorage.getItem('members'));

    var newData = [];

    newData = storageUsers.filter(function (item, index) {
        return item.id != id;
    });

    var data = JSON.stringify(newData);

    localStorage.setItem('members', data);
    $("#member_table").find("tr:not(:first)").remove();
    $('#deleteDialog').modal('hide');
    getTableData();

}

/**
 * Sorting table data through type, e.g: first_name, email, last_name etc.
 *
 * @param {string} type
 */


//test purpose


function sortByImportance(type) {
    $("#member_table").find("tr:not(:first)").remove();

    var totalClickOfType = parseInt(localStorage.getItem(type));
    if (!totalClickOfType) {
        totalClickOfType = 1;
        localStorage.setItem(type, totalClickOfType);
    } else {

        localStorage.setItem(type, totalClickOfType);
    }

    var searchKeyword = $('#member_search').val();
    var members = getFormattedMembers();

    var sortedMembers = members.sort(function (a, b) {
        return (totalClickOfType == 2) ? a[type] > b[type] : a[type] < b[type];
    });

    sortedMembers.forEach(function (item, index) {
        insertIntoTableView(item, index + 1);
    })
}


let count = parseInt(localStorage.getItem('count')) || 0;

const countEL = document.getElementById('dd');
// localStorage.setItem('count', count);
// countEL.value = count;

// const pobtn = document.querySelector('.plusOne');
// const pobtn = document.getElementById("plusOne")
const setCount = (count) => {
    countEL.textContent = count;
    localStorage.setItem('count', count);
}

const doPlusOne = () => {
    console.log("func ran")
    count += 1;
    setCount(count);
};

const mbtn = document.querySelector('.minusOne');

mbtn.addEventListener('click', () => {
    count -= 1;
    setCount(count);
})