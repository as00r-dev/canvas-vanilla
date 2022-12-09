window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");

	//canvas settings
	canvas.width = window.innerWidth * 0.8;
	canvas.height = window.innerHeight * 0.8;
	context.strokeStyle = "green";
	context.lineWidth = 10;
	context.lineCap = "round";

	//canvas center
	const cx = canvas.width / 2;
	const cy = canvas.height / 2;

	//effect settings
	const effect = {
		size: 200,
		sides: 5,
		maxDepth: 50,
	};

	context.save();
	context.translate(cx, cy);
	context.rotate(0);

	function drawBranch(depth) {
		if (depth > effect.maxDepth) return;
		doTransformations(75, 0, 0.2, 0.9, 0.9);
		drawLine(0, 0);
		drawBranch(depth + 1);
	}
	drawBranch(0);

	// for (let i = 0; i < sides; i++) {
	// 	context.rotate((Math.PI * 2) / sides);
	// }

	function drawLine(x, y) {
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(effect.size, 0);
		context.stroke();
	}

	function doTransformations(tx, ty, angle, sx, sy) {
		context.translate(tx, ty);
		context.rotate(angle);
		context.scale(sx, sy);
	}

	context.restore();
});
