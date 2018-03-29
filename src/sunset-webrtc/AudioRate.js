function AudioRate() {
    this.el = document.createElement('div');
    this.el.className = 'audio-rate';
    this.lis = [];
    for (var i = 0; i < 5; i++) {
        var ul = document.createElement('ul');
        this.lis[i] = [];
        for (var j = 0; j < 5; j++) {
            var li = document.createElement('li');
            ul.appendChild(li);
            this.lis[i][5 - j] = li;
        }
        this.el.appendChild(ul);
    }
}
AudioRate.prototype.show = function (result) {
    var lis = this.lis;
    lis.forEach((items, index) => {
        var v = result[index];
        v = Math.floor(v / 20);
        for (var i = 0; i < v; i++) {
            items[i] && (items[i].className = 'active');
        }
        for (var i = v; i < items.length; i++) {
            items[i] && (items[i].className = '');
        }
    })
}


module.exports = AudioRate;