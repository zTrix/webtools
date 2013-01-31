
var path = require('path'),
    fs   = require('fs');

function pad2(num) {
    return num > 9 ? num : '0' + num;
}

module.exports = {
    randomString: function (len) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        len = len || 10;
        var ret = '';
        for (var i = 0; i < len; i++) {
            var n = Math.floor(Math.random() * chars.length);
            ret += chars[n];
        }
        return ret;
    },

    checkToken: function (token) {
        return true;
    },

    getTime: function () {
        var t = new Date();
        return [t.getFullYear(), '-', pad2(t.getMonth() + 1) , '-', pad2(t.getDate()), '_', pad2(t.getHours()), ':', pad2(t.getMinutes()), ':', pad2(t.getSeconds())].join('');
    },

    mkdirpSync: function mkdirpSync(p, mode, made) {
        if (mode === undefined) {
            mode = 0777 & (~process.umask());
        }
        if (!made) made = null;

        if (typeof mode === 'string') mode = parseInt(mode, 8);
        p = path.resolve(p);

        try {
            fs.mkdirSync(p, mode);
            made = made || p;
        }
        catch (err0) {
            switch (err0.code) {
                case 'ENOENT' :
                    made = mkdirpSync(path.dirname(p), mode, made);
                    mkdirpSync(p, mode, made);
                    break;

                // In the case of any other error, just see if there's a dir
                // there already.  If so, then hooray!  If not, then something
                // is borked.
                default:
                    var stat;
                    try {
                        stat = fs.statSync(p);
                    }
                    catch (err1) {
                        throw err0;
                    }
                    if (!stat.isDirectory()) throw err0;
                    break;
            }
        }

        return made; 
    }
};
