/**
 * Return string date
 * Example 2019_08_12-12_10_45
 * YYYY_MM_DD-HH_MM_SS
 */
function getStringDate(){
    var today = new Date();
    var stringDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+"_"+today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds();
    return stringDate;
}

module.exports.getStringDate = getStringDate;