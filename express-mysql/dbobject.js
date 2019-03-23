module.exports = class DbObject {

    constructor(width) {
          //this.width = width;
    }
    
    test () {
        return "Test OK";
    }
    getList (data, connection) {

        connection.query('SELECT * FROM members', function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            console.log("GetList - return");
            //res.send(JSON.stringify(results));
            return results;
        });
        console.log("Get - List end");
    }
};

