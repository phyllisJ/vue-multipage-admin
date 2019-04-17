import css from '../../css/index.css'
import less from '../../css/index.less'
import vue from '../common/vue.min.js'
import jquery from '../common/jquery-3.1.0.min'

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        console.log('(' + this.x + ', ' + this.y + ')');
        return '(' + this.x + ', ' + this.y + ')';
    }
}
let a = new Point(1,2);

a.toString();
console.log(4545454545);
jquery("#study").text('kkkkkttttt');
