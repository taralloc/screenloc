let y_bar = 55 / 3;

function fn(r_y, y) {
	var n = 0;
	if(y > r_y) n = 1;
	else if(y < y_bar) n = r_y / y_bar;
	else n = r_y / y;
	return parseInt(n.toFixed(0));
}

function fy_given_x_delta(x,delta,r_y) {
	var y = x*delta;
	if(y < y_bar) y = y_bar;
	else if(y > r_y) r_y;
	return y;
}

function fy_given_k(k) {
	return k * y_bar;
}

function fk(y,r_y) {
	var k = y / y_bar;
	if(y < y_bar) k = 1;
	else if(y > r_y) k = r_y / y_bar;
	return k;
}

function fx(A,L) {
	return L * Math.tan(A / 60 * Math.PI/180);
}

function fdelta(r_x,r_y,d) {
	return Math.sqrt(Math.pow(r_x, 2) + Math.pow(r_y, 2)) / d;
}

function compute_given_x(d,r_x,r_y,x) {
	let delta = fdelta(r_x,r_y,d);
	let y = fy_given_x_delta(x,delta,r_y);
	let n = fn(r_y,y);
	let k = fk(y,r_y) * 1;
	let ar = far(r_x / r_y);
	return {n, k, delta, ar};
}

function compute_given_a_l(d,r_x,r_y,A,L) {
	return compute_given_x(d,r_x,r_y,fx(A,L));
}

function compute_given_k(d,r_x,r_y,k) {
	let delta = fdelta(r_x,r_y,d);
	let y = fy_given_k(k);
	let n = fn(r_y,y);
	let ar = far(r_x / r_y);
	return {n, k, delta, ar};
}

function far(ar) {
	if(ar == 16/9) return "16:9";
	else if(ar == 9/16) return "9:16";
	else if(ar == 16/10) return "16:10";
	else if(ar == 10/16) return "10:16";
	else if(ar == 3/2) return "3:2";
	else if(ar == 2/3) return "2:3";
	else if(ar == 4/3) return "4:3";
	else if(ar == 3/4) return "3:4";
	else if(ar == 5/4) return "5:4";
	else if(ar == 21/9) return "21:9";
	else return ar.toFixed(2).toString();
}

document.getElementById('btnCompute').onclick = function(){
	let d = parseFloat(document.getElementById("d").value);
	let r_x = parseInt(document.getElementById("rx").value);
	let r_y = parseInt(document.getElementById("ry").value);
	
	var res;
	if(document.getElementById("btnProvideAL").checked) {
		let A = parseFloat(document.getElementById("A").value);
		let L = parseFloat(document.getElementById("L").value);
		res = compute_given_a_l(d,r_x,r_y,A,L);
	}
	else if(document.getElementById("btnProvideX").checked) {
		let x = parseFloat(document.getElementById("x").value);
		res = compute_given_x(d,r_x,r_y,x);
	}
	else if(document.getElementById("btnProvideK").checked) {
		let k = parseFloat(document.getElementById("k").value);
		res = compute_given_k(d,r_x,r_y,k);
	}
	
	document.getElementById("outN").innerText = res.n;
	document.getElementById("outK").innerText = res.k.toFixed(2);
	document.getElementById("outDelta").innerText = res.delta.toFixed(2);
	document.getElementById("outAR").innerText = res.ar;	
};
