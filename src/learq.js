const xlslx = require('xlsx');

function learq(){
    const wd = xlslx.readFile(`${__dirname}/Lista.xlsx`);

    const ws = wd.Sheets['Sheet1'];
    const data = xlslx.utils.sheet_to_json(ws);

    const newData = data.map(function(record){
        return record.Site
    })

    return newData
};

module.exports=learq;
