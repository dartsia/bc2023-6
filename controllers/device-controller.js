const conn = require('../utils/database');

module.exports.addDevice = function(req,res) {
    let device = {
        name: req.body.deviceName,
        description: req.body.description,
        serialNumber: req.body.serialNumber,
        manufacturer: req.body.manufacturer
    }
    let sql = "INSERT INTO devices (DeviceName, Description, SerialNumber, Manufacturer) VALUES (?, ?, ?, ?)";
    conn.query(sql, [device.name, device.description, device.serialNumber, device.manufacturer], (err, result) => {
        if (err) throw err;
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).json({message: 'Successfully added device.'});
    });
}

module.exports.addPhoto = function(req,res) {
    let deviceID = req.params.id;
    let imageURL = req.body.image;
    console.log(req.body);
    let sql = "UPDATE devices SET PhotoPath=? WHERE ID=?";
    conn.query(sql, [imageURL, deviceID], (err, result) => {
        if (err) throw err;
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).json({message: 'Device parameters updated successfully'});
    });
}

module.exports.getOne = function(req,res) {
    let id = req.params.id;
    const sql = "SELECT * FROM devices WHERE ID = ?;";
    conn.query(sql, id, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        if(data.length == 0) {
            res.status(404).send('Device not found');
        } else {
            return res.status(200).json(data[0]);
        }
    });
}

module.exports.updateDevice = function (req,res) {
    let deviceID = req.params.id;
    let device = {
        name: req.body.deviceName,
        description: req.body.description,
        serialNumber: req.body.serialNumber,
        manufacturer: req.body.manufacturer
    }
    let sql = "UPDATE devices SET DeviceName=?, Description=?, SerialNumber=?, Manufacturer=? WHERE ID=?";
    conn.query(sql, [device.name, device.description, device.serialNumber, device.manufacturer, deviceID], (err, result) => {
        if (err) throw err;
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).json({message: 'Device parameters updated successfully'});
    });
}

module.exports.deleteDevice = function(req,res) {
    let deviceID = req.params.id;
    let sql = "DELETE FROM devices WHERE ID=?";
    conn.query(sql, deviceID, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).json({ message: 'Device deleted successfully' });
    });
}



