const conn = require('../utils/database');

module.exports.home = function(req,res) {
    res.send('Hello, you can log in and choose your device :)')
}

module.exports.borrow = function(req,res) {
    let idDevice = req.params.deviceId;
    let idUser = req.session.userid;
    const sqlStatus = "SELECT Status FROM devices WHERE ID=?;"
    conn.query(sqlStatus, idDevice, function(err,data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        if (data[0].Status !== 'available') {
            return res.status(400).json({ error: 'Device is not available for borrowing' });
        }
        const sqlRental = "INSERT INTO rental (id_device, id_user) VALUES (?, ?)";
        conn.query(sqlRental, [idDevice, idUser], function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.status(200).json({ message: 'Device assigned successfully' });
        });
        const sqlNewStat = "UPDATE devices SET Status='taken' WHERE ID=?";
        conn.query(sqlNewStat, idDevice, function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
        });
    })
}

module.exports.return = function(req,res) {
    let userId = req.session.userid;
    let deviceId = req.params.deviceId;
    let sql = "DELETE FROM rental WHERE id_user=? AND id_device=?";
    conn.query(sql, [userId, deviceId], function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        const sqlNewStat = "UPDATE devices SET Status='available' WHERE ID=?";
        conn.query(sqlNewStat, deviceId, function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
        });
        res.status(200).json({message : "Device returned successfully"});
    });
    
}

module.exports.deviceList = function(req,res) {
    const sql = "SELECT * FROM devices;";
    conn.query(sql, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).json(data);
    });
}

module.exports.myborrowed = function(req,res) {
    let idUser = req.session.userid;
    const sql = "SELECT d.ID, d.DeviceName, d.Description, d.Manufacturer, d.PhotoPath\
    FROM devices d\
    JOIN rental r ON d.ID = r.id_device\
    WHERE r.id_user=?;";
    conn.query(sql, [idUser], function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).json(data);
    });
}

